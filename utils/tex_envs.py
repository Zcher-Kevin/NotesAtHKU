# Constants for environments
import re

from tex_tables import convert_tabular_to_md


ENV_OLIST = "enumerate"
ENV_LIST = "itemize"
ENV_ITEM = r"\item"
BEGIN_TAG = r"\begin"
END_TAG = r"\end"

# List of environments that should be converted to blocks
BLOCK_ENVIRONMENTS = [
    "definition",
    "theorem",
    "knBox",
    "example",
    "minipage",
    "tcolorbox",
]
MAPPED_ENVIRONMENTS = [
    "primary",
    "secondary",
    "knowledge",
    "example",
    "minipage",
    "acct-example",
]

# Add a set of known environments for faster lookup
KNOWN_ENVIRONMENTS = set(BLOCK_ENVIRONMENTS + [ENV_OLIST, ENV_LIST, "tabular"])


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
    skip_content = False  # New flag for skipping content

    def is_previous_line_list_item():
        return bool(re.match(r"^\s*[-\d]", previous_line))

    def get_current_indent():
        return list_level * 4

    def process_line(line):
        nonlocal list_level, current_block, previous_line, in_table, table_content, table_alignment, skip_content
        stripped = line.strip()

        # Handle empty lines differently for blocks vs main content
        if not stripped:
            if current_block is not None and not skip_content:
                current_block["content"].append("")
            elif not in_table and not skip_content:
                result.append("")
            return

        # Handle table environment
        if stripped.startswith(BEGIN_TAG):
            tag = stripped[len(BEGIN_TAG) :].strip("{}")
            if tag.startswith("tabular"):
                in_table = True
                table_content = []  # Reset table content
                table_alignment = re.search(r"{([^}]*)}", stripped).group(1)
                return
        elif stripped.startswith(END_TAG):
            tag = stripped[len(END_TAG) :].strip("{}")
            if tag == "tabular" and in_table:
                table_text = "\n".join(table_content)
                md_table = convert_tabular_to_md(table_text, table_alignment)
                if current_block is not None:
                    current_block["content"].append("\n" + md_table + "\n")
                else:
                    result.append("\n" + md_table + "\n")
                in_table = False
                table_content = []
                table_alignment = ""
                return

        # Handle table content
        if in_table:
            table_content.append(stripped)
            return

        # Rest of the existing processing logic
        if stripped.startswith("\\\\"):
            content = stripped[2:].strip()
            if current_block is not None and current_block["content"]:
                # Add backslash to previous line in block
                current_block["content"][-1] += "\\"
                if content:
                    current_block["content"].append(content)
            elif result:
                # Add backslash to previous line in result
                result[-1] += "\\"
                if content:
                    result.append(content)
            return

        if stripped.startswith(BEGIN_TAG):
            # Handle opening tags (\begin{NAME})
            tag = stripped[len(BEGIN_TAG) :].strip("{}")
            if tag.startswith("tcolorbox"):
                # Extract title from tcolorbox options
                title_match = re.search(r"title=(.*?)(?:,|\]|$)", stripped)
                title = title_match.group(1) if title_match else ""
                # Remove any surrounding quotes from title
                title = title.strip('"').strip("'")
                current_block = {"type": "tcolorbox", "title": title, "content": []}
                skip_content = True
            elif tag.startswith("tabular"):
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

            # Only process known environments, pass through others
            if tag not in KNOWN_ENVIRONMENTS:
                if current_block is not None:
                    current_block["content"].append(stripped)
                else:
                    result.append(stripped)
                return

            if tag == "tabular" and in_table:
                table_text = "\n".join(table_content)
                md_table = convert_tabular_to_md(table_text, table_alignment)
                result.append("\n" + md_table + "\n")
                in_table = False
                table_content = []
                table_alignment = ""
                return
            if current_block and tag == current_block["type"]:
                if tag == "tcolorbox":
                    result.append(f'\n<ACCTExample title="{current_block["title"]}">')
                    result.append("</ACCTExample>\n")
                    skip_content = False
                else:
                    mapped_variant = MAPPED_ENVIRONMENTS[BLOCK_ENVIRONMENTS.index(tag)]
                    result.append(
                        f'\n<Block variant="{mapped_variant}" title="{current_block["title"]}">'
                    )
                    result.extend(current_block["content"])
                    result.append("</Block>\n")
                current_block = None
            if stack and stack[-1]["type"] == tag:
                if tag in [ENV_OLIST, ENV_LIST]:
                    list_level -= 1
                stack.pop()
        elif stripped.startswith("{") and current_block is not None:
            current_block["title"] = stripped.strip("{}").strip()
        elif current_block is not None:
            if not skip_content:  # Only process content if not skipping
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
