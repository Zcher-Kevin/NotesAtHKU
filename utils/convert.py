import re

# Constants for environments
ENV_OLIST = "enumerate"
ENV_LIST = "itemize"
ENV_ITEM = r"\item"
BEGIN_TAG = r"\begin"
END_TAG = r"\end"

# List of environments that should be converted to blocks
BLOCK_ENVIRONMENTS = ["definition", "theorem", "knBox", "example", "minipage"]


def parse_tree_markup(input_text):
    lines = input_text.splitlines()
    stack = []
    result = []
    current_block = None
    list_level = 0
    previous_line = ""

    def is_previous_line_list_item():
        return bool(re.match(r"^\s*[-\d]", previous_line))

    def get_current_indent():
        return list_level * 4

    def process_line(line):
        nonlocal list_level, current_block, previous_line
        stripped = line.strip()

        if not stripped:
            # Preserve empty lines
            result.append("")
            return

        if stripped.startswith(BEGIN_TAG):
            # Handle opening tags (\begin{NAME})
            tag = stripped[len(BEGIN_TAG) :].strip("{}")
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


def convert_tex_to_mdx(tex_content):
    # -------------- Remove -------------- #
    # rule remove all tabs and beginning spaces
    tex_content = re.sub(r"\n\s+", r"\n", tex_content)
    tex_content = re.sub(r"^\s+", r"", tex_content)
    # remove unwanted commands
    CMD_TO_REMOVE = ["label", "vspace", "hfill", "caption", "centering"]
    for cmd in CMD_TO_REMOVE:
        tex_content = re.sub(rf"\\{cmd}[^\n]*", "", tex_content)
    # remove comments
    tex_content = re.sub(r"(?<!\\)%.+", r"", tex_content)
    # remove escaped characters not required in md
    tex_content = re.sub(r"\\&", r"&", tex_content)
    # --------- Basic conversion --------- #
    # rule convert \textbf{...} to **...**
    tex_content = re.sub(r"\\textbf{([^}]*)}", r"**\1**", tex_content)
    # rule convert \textit{...} and \emph{...} to *...*
    tex_content = re.sub(r"\\textit{([^}]*)}", r"*\1*", tex_content)
    tex_content = re.sub(r"\\emph{([^}]*)}", r"*\1*", tex_content)
    # rule convert \underline{...} to __...__
    tex_content = re.sub(r"\\underline{([^}]*)}", r"__\1__", tex_content)
    # rule convert \tcblower to <BlockSep />
    tex_content = re.sub(r"\\tcblower", r"<BlockSep />", tex_content)
    # rule convert \includegraphics[...]{path} to ![](./path)
    tex_content = re.sub(r"\\includegraphics\[.*\]{([^}]*)}", r"![](./\1)", tex_content)
    # rule convert sizes to <P size="...">
    tex_content = re.sub(
        r"\\footnotesize{([^}]*)}", r"<P size='footnotesize'>\1</P>", tex_content
    )
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

    # rule convert custom JSX block environments
    tex_content = parse_tree_markup(tex_content)

    return tex_content


def main():
    with open("test.tex", "r") as file:
        tex_content = file.read()

    mdx_content = convert_tex_to_mdx(tex_content)

    with open("test.mdx", "w") as file:
        file.write(mdx_content)


if __name__ == "__main__":
    main()
