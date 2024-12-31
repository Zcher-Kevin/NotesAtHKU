import re
import os
import pathlib

# Constants for environments
ENV_OLIST = "enumerate"
ENV_LIST = "itemize"
ENV_ITEM = r"\item"
BEGIN_TAG = r"\begin"
END_TAG = r"\end"
COURSE = "IIMT2601"

# List of environments that should be converted to blocks
BLOCK_ENVIRONMENTS = ["definition", "theorem", "knBox", "example", "minipage"]


def convert_tabular_to_md(content, alignment):
    # Clean alignment string of vertical bars
    alignment = alignment.replace("|", "").strip()

    # Convert LaTeX alignment to Markdown
    md_align = []
    for a in alignment:
        if a == "l":
            md_align.append(":---")
        elif a == "r":
            md_align.append("---:")
        elif a == "c":
            md_align.append(":---:")

    # Split content into rows
    rows = [row.strip() for row in content.split("\\\\")]
    rows = [row for row in rows if row]  # Remove empty rows

    # Convert each row to Markdown
    md_rows = []
    for row in rows:
        # Split by & and clean cells
        cells = [cell.strip() for cell in row.split("&")]
        md_rows.append("| " + " | ".join(cells) + " |")

    # Make sure we have enough alignment markers for all columns
    num_columns = len(rows[0].split("&"))
    while len(md_align) < num_columns:
        md_align.append(":---")  # Default to left alignment if not specified

    # Create the alignment row
    align_row = "| " + " | ".join(md_align) + " |"

    # Combine all rows with the alignment row after the header
    return "\n".join([md_rows[0], align_row] + md_rows[1:])


def parse_tree_markup(input_text):
    lines = input_text.splitlines()
    stack = []
    result = []
    current_block = None
    list_level = 0
    previous_line = ""
    table_content = []
    in_table = False
    table_alignment = ""

    def is_previous_line_list_item():
        return bool(re.match(r"^\s*[-\d]", previous_line))

    def get_current_indent():
        return list_level * 4

    def process_line(line):
        nonlocal list_level, current_block, previous_line, in_table, table_content, table_alignment
        stripped = line.strip()

        if not stripped:
            if not in_table:
                result.append("")
            return

        if stripped.startswith(BEGIN_TAG):
            # Handle opening tags (\begin{NAME})
            tag = stripped[len(BEGIN_TAG) :].strip("{}")
            if tag.startswith("tabular"):
                in_table = True
                # Extract alignment from {lcccc} or {|l|c|c|c|c|}
                table_alignment = re.search(r"{([^}]*)}", stripped).group(1)
                return
            if tag.startswith(ENV_OLIST):
                list_level += 1
                start = 1
                if "[" in tag:
                    parts = tag.split("}[")
                    if len(parts) == 2 and "start=" in parts[1]:
                        try:
                            start = int(parts[1].split("start=")[1].split("]")[0])
                        except (IndexError, ValueError):
                            start = 1
                stack.append({"type": ENV_OLIST, "start": start, "counter": start})
            elif tag == ENV_LIST:
                list_level += 1
                stack.append({"type": ENV_LIST})
            elif tag in BLOCK_ENVIRONMENTS:
                current_block = {"type": tag, "title": "", "content": []}
        elif stripped.startswith(END_TAG):
            # Handle closing tags (\end{NAME})
            tag = stripped[len(END_TAG) :].strip("{}")
            if tag == "tabular" and in_table:
                table_text = "\n".join(table_content)
                md_table = convert_tabular_to_md(table_text, table_alignment)
                result.append("\n" + md_table + "\n")
                in_table = False
                table_content = []
                table_alignment = ""
                return
            if stack and stack[-1]["type"] == tag:
                if tag in [ENV_OLIST, ENV_LIST]:
                    list_level -= 1
                stack.pop()
            elif current_block and tag == current_block["type"]:
                result.append(
                    f'\n<Block variant="{current_block["type"]}" title="{current_block["title"]}">'
                )
                result.extend(current_block["content"])
                result.append("</Block>\n")
                current_block = None
        elif stripped.startswith("{") and current_block is not None:
            current_block["title"] = stripped.strip("{}").strip()
        elif current_block is not None:
            if stripped.startswith(ENV_ITEM):
                item_text = stripped[len(ENV_ITEM) :].strip()
                indent = get_current_indent()
                if not is_previous_line_list_item():
                    current_block["content"].append("")
                if stack and stack[-1]["type"] == ENV_OLIST:
                    current_block["content"].append(
                        " " * indent + f"{stack[-1]['counter']}. " + item_text
                    )
                    stack[-1]["counter"] += 1
                else:
                    current_block["content"].append(" " * indent + "- " + item_text)
            else:
                current_block["content"].append(stripped)
        elif stripped.startswith(ENV_ITEM):
            item_text = stripped[len(ENV_ITEM) :].strip()
            indent = get_current_indent()
            if not is_previous_line_list_item():
                result.append("")
            if stack and stack[-1]["type"] == ENV_OLIST:
                result.append(" " * indent + f"{stack[-1]['counter']}. " + item_text)
                stack[-1]["counter"] += 1
            else:
                result.append(" " * indent + "- " + item_text)
        elif in_table:
            table_content.append(stripped)
            return
        else:
            if stripped and not any(
                stripped.startswith(tag) for tag in [BEGIN_TAG, END_TAG, ENV_ITEM]
            ):
                result.append(stripped)  # Preserve other lines

        # Update previous_line based on what we just added
        if current_block is not None and current_block["content"]:
            previous_line = current_block["content"][-1]
        elif result:
            previous_line = result[-1]
        else:
            previous_line = ""

    for line in lines:
        process_line(line)

    return "\n".join(result)


def parse_refs(tex_content):
    lines = tex_content.splitlines()
    result = []

    # Find all labels first
    labels = re.findall(r"\\label{([^}]*)}", tex_content)

    for line in lines:
        # rule convert \nameref{xxx:link_foo}
        # if \label{xxx:link_foo} exists in the current file, convert to [Link Foo](#link-foo), else [Link Foo](FIXME-xxx:link_foo)
        for match in re.finditer(r"\\nameref{([^}]*)}", line):
            ref = match.group(1)
            text = ref.split(":")[-1].replace("_", " ").title()
            anchor = ref.replace(":", "-").lower()
            if ref in labels:
                line = line.replace(match.group(0), f"[{text}](#{anchor})")
            else:
                line = line.replace(match.group(0), f"[{text}](FIXME-{ref})")

        # rule convert \hyperref[xxx:link_foo]{text}
        # if \label{xxx:link_foo} exists in the current file, convert to [text](#link-foo) (hyphenated), else [text](FIXME-xxx:link_foo)
        for match in re.finditer(r"\\hyperref\[([^]]*)\]{([^}]*)}", line):
            ref = match.group(1)
            text = match.group(2)
            anchor = ref.replace(":", "-").lower()
            if ref in labels:
                line = line.replace(match.group(0), f"[{text}](#{anchor})")
            else:
                line = line.replace(match.group(0), f"[{text}](FIXME-{ref})")

        result.append(line)

    return "\n".join(result)


def convert_tex_to_mdx(tex_content):

    # --------------- Clean -------------- #
    # rule remove all tabs and beginning spaces
    tex_content = re.sub(r"\n\s+", r"\n", tex_content)
    tex_content = re.sub(r"^\s+", r"", tex_content)
    # remove comments
    tex_content = re.sub(r"(?<!\\)%.+", r"", tex_content)
    # remove escaped characters not required in md
    tex_content = re.sub(r"\\&", r"&", tex_content)
    tex_content = re.sub(r"\\\$", r"$", tex_content)

    # --------- Basic conversion --------- #
    # rule convert \textbf{...} to **...**
    tex_content = re.sub(r"\\textbf{([^}]*)}", r"**\1**", tex_content)
    # rule convert \textit{...} and \emph{...} to *...*
    tex_content = re.sub(r"\\textit{([^}]*)}", r"*\1*", tex_content)
    tex_content = re.sub(r"\\emph{([^}]*)}", r"*\1*", tex_content)
    # rule convert \underline{...} to __...__
    tex_content = re.sub(r"\\underline{\\underline{([^}]*)}}", r"__\1__", tex_content)
    tex_content = re.sub(r"\\underline{([^}]*)}", r"__\1__", tex_content)
    # rule convert \tcblower to <BlockSep />
    tex_content = re.sub(r"\\tcblower", r"<BlockSep />", tex_content)
    # rule convert \includegraphics[...]{path} to ![](./path)
    tex_content = re.sub(r"\\includegraphics\[.*\]{([^}]*)}", r"![](./\1)", tex_content)
    # rule convert sizes to <P size="...">
    tex_content = re.sub(
        r"\\footnotesize{([^}]*)}", r"<P size='footnotesize'>\1</P>", tex_content
    )
    # --------------- Refs --------------- #
    # rule convert nameref and hyperrefs to custom markdown translation
    tex_content = parse_refs(tex_content)
    # remove unwanted commands
    CMD_TO_REMOVE = ["label", "vspace", "hfill", "caption", "centering", "hline"]
    for cmd in CMD_TO_REMOVE:
        tex_content = re.sub(rf"\\{cmd}[^\n]*", "", tex_content)
    # ------------- Sections ------------- #
    # rule convert sections to yaml header
    tex_content = re.sub(r"\\section{([^}]*)}", r"---\ntitle: \1\n---", tex_content)
    # rule convert subsections to ##
    tex_content = re.sub(r"\\subsection{([^}]*)}", r"\n## \1\n", tex_content)
    # rule convert subsubsections to ###
    tex_content = re.sub(r"\\subsubsection{([^}]*)}", r"\n### \1\n", tex_content)
    # --------------- Maths -------------- #
    # rule convert \begin{align*} and \end{align*} to ```math```
    tex_content = re.sub(r"\\begin{align\*}", r"```math", tex_content)
    tex_content = re.sub(r"\\end{align\*}", r"```", tex_content)
    # rule convert "\[" to ```math\n and "\]" to \n```
    tex_content = re.sub(r"\\\[", r"```math\n", tex_content)
    tex_content = re.sub(r"\\\]", r"\n```", tex_content)

    # remove all \begin{table}... and \end{table}
    tex_content = re.sub(r"\\begin{table}[^\n]*", "", tex_content)
    tex_content = re.sub(r"\\end{table}", "", tex_content)
    # rule convert custom JSX block environments
    tex_content = parse_tree_markup(tex_content)

    return tex_content


def process_directory(input_dir, output_dir):
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)

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

                    mdx_content = convert_tex_to_mdx(tex_content)

                    with open(output_path, "w", encoding="utf-8") as f:
                        f.write(mdx_content)

                    print(f"Converted: {file}")
                except Exception as e:
                    print(f"Error processing {file}: {str(e)}")


def main():
    # Get script directory
    script_dir = pathlib.Path(__file__).parent.resolve()
    input_dir = os.path.join(script_dir, "working")
    output_dir = os.path.join(script_dir, f"../content/notes/{COURSE}")

    process_directory(input_dir, output_dir)


if __name__ == "__main__":
    main()
