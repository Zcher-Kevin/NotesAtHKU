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
