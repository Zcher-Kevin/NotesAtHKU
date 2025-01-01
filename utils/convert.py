import json
import re
import os
import pathlib
import traceback
from tex_refs import parse_refs
from tex_envs import parse_tree_markup
from tex_code import parse_lstinputlisting
import sys


def convert_tex_to_mdx(t, course):
    # --------------- Clean -------------- #
    # rule remove beginning empty lines
    t = re.sub(r"\\newpage", r"", t)
    t = re.sub(r"^\s+", r"", t)
    # remove comments
    t = re.sub(r"(?<!\\)%.+", r"", t)
    # remove escaped characters not required in md
    t = re.sub(r"\\&", r"&", t)
    # remove unsupported item parameters
    t = re.sub(r"\\item\[[^]]*\]", r"\\item", t)

    # --------- Basic conversion --------- #
    # rule convert \textbf{...} to **...**
    t = re.sub(r"\\textbf{([^}]*)}", r"**\1**", t)
    # rule convert \textit{...} and \emph{...} to *...*
    t = re.sub(r"\\textit{([^}]*)}", r"*\1*", t)
    t = re.sub(r"\\emph{([^}]*)}", r"*\1*", t)
    # rule convert \underline{...} to __...__
    t = re.sub(r"\\underline{\\underline{([^}]*)}}", r"__\1__", t)
    t = re.sub(r"\\underline{([^}]*)}", r"__\1__", t)
    # rule convert \tcblower to <BlockSep />
    t = re.sub(r"\\tcblower", r"<BlockSep />", t)
    # rule convert \includegraphics[...]{path} to ![](./path)
    t = re.sub(r"\\includegraphics\[.*\]{([^}]*)}", r"![](./\1)", t)
    # --------------- Refs --------------- #
    # rule convert nameref and hyperrefs to custom markdown translation
    t = parse_refs(t)
    # ------------- Commands ------------- #
    # remove unwanted commands
    CMD_TO_REMOVE = [
        "label",
        "vspace",
        "hfill",
        "caption",
        "centering",
        "hline",
        "small",
        "tiny",
        "normalsize",
        "footnotesize",
    ]
    for cmd in CMD_TO_REMOVE:
        t = re.sub(rf"\\{cmd}[^\n]*", "", t)
    t = re.sub(r"\\quad", "    ", t)
    t = re.sub(r"\\rightarrowfill", "→", t)
    t = re.sub(r"\\arrayrulecolor{[^}]*}", "", t)
    # ------------- Sections ------------- #
    # rule convert sections to yaml header
    t = re.sub(r"\\section{([^}]*)}", r"---\ntitle: \1\n---", t)
    # rule convert subsections to ##
    t = re.sub(r"\\subsection{([^}]*)}", r"\n## \1\n", t)
    # rule convert subsubsections to ###
    t = re.sub(r"\\subsubsection{([^}]*)}", r"\n### \1\n", t)
    # rule remove notes
    t = re.sub(r"\\note{([^}]*)}", r"\1", t)
    # --------------- Maths -------------- #
    # rule convert \begin{align*} and \end{align*} to ```math```
    t = re.sub(r"\\begin{align\*}", r"```math", t)
    t = re.sub(r"\\end{align\*}", r"```", t)
    # rule convert "\[...\]" to "```math\n...\n```", assuming "\[" is the first non-space character in the line. If not, convert to "$...$"
    t = re.sub(r"^\s*\\\[(.*)\]", r"```math\n\1\n```", t)
    t = re.sub(r"\\\[", r"$", t)
    t = re.sub(r"\\\]", r"$", t)
    # rule fix parameter braces not escaped in math mode: ]{...} to ]\{...\}
    t = re.sub(r"\]{\\text{([^}]*)}}", r"]\{\\text{\1}\}", t)
    # rule escape all pipe characters inside a math environment
    t = re.sub(r"\$(.*?)\$", lambda m: re.sub(r"\|", r"\\|", m.group(0)), t)
    # ------------- Colorbox ------------- #
    t = re.sub(
        r"\\colorbox{([^}]*)}{([^}]*)}", r"<ColorBox color='\1'>\2</ColorBox>", t
    )
    t = re.sub(r"\\mathcolorbox{([^}]*)}{([^}]*)}", r"\2", t)
    # ------------ lstlisting ------------ #
    # rule convert \begin{lstlisting}[language=...] to ```...
    t = re.sub(r"\\begin{lstlisting}\[language=([^}]*)\]", r"```python\n", t)
    # rule convert \end{lstlisting} to ```
    t = re.sub(r"\\end{lstlisting}", r"```", t)

    # remove all \begin{table}... and \end{table}
    t = re.sub(r"\\begin{table}[^\n]*", "", t)
    t = re.sub(r"\\end{table}", "", t)
    # rule convert custom JSX block environments
    t = parse_tree_markup(t)
    # rule import code blocks from file paths in lstinputlisting
    t = parse_lstinputlisting(t, course)

    return t


def process_directory(input_dir, output_dir, course, replace_files):
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)

    filenames = []

    # Walk through all files in input directory
    for root, _, files in os.walk(input_dir):
        for file in files:
            if file.endswith(".tex"):
                # Get the relative path from input_dir
                rel_path = os.path.relpath(root, input_dir)

                # Construct input and output paths
                input_path = os.path.join(root, file)
                output_subdir = os.path.join(output_dir, rel_path)
                output_path = os.path.join(output_subdir, file.replace(".tex", ".mdx"))

                # Create subdirectories in output if needed
                os.makedirs(output_subdir, exist_ok=True)

                # Process the file
                try:
                    with open(input_path, "r", encoding="utf-8") as f:
                        tex_content = f.read()

                    mdx_content = convert_tex_to_mdx(tex_content, course)

                    with open(output_path, "w", encoding="utf-8") as f:
                        f.write(mdx_content)

                    print(f"Converted: {file}")
                    # Add the converted file to filenames list
                    filenames.append(file.replace(".tex", ""))
                except Exception as e:
                    print(f"Error processing {file}: {str(e)}")
                    # print stack trace
                    # traceback.print_exc()
                    # Collect filenames for meta.json

    if replace_files:
        # Create index.mdx in the output directory
        index_content = f"""---
title: {course} Notes for HKU
description: Description
icon: Album
---

<Welcome course="{course}" />
        """
        with open(os.path.join(output_dir, "index.mdx"), "w", encoding="utf-8") as f:
            f.write(index_content)
        print(f"Created index.mdx")
        # Create meta.json in the output directory
        meta_content = {
            "title": course,
            "description": "2024 Spring",
            "root": True,
            "icon": "DraftingCompass",
            "pages": filenames,
        }
        with open(os.path.join(output_dir, "meta.json"), "w", encoding="utf-8") as f:
            json.dump(meta_content, f, indent=4)
        print(f"Created meta.json")


def main():
    # Get course from command line arguments
    if len(sys.argv) < 2 or len(sys.argv) > 3:
        print("Usage: python convert.py <course_code> [-r]")
        sys.exit(1)

    course = sys.argv[1]
    replace_files = "-r" in sys.argv

    # Get script directory
    script_dir = pathlib.Path(__file__).parent.resolve()
    input_dir = os.path.join(script_dir, f"working/{course}")
    output_dir = os.path.join(script_dir, f"../content/notes/{course}")

    process_directory(input_dir, output_dir, course, replace_files)


if __name__ == "__main__":
    main()
