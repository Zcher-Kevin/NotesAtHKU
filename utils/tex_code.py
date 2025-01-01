import re


def parse_lstinputlisting(tex_content, course):
    lines = tex_content.splitlines()
    result = []

    i = 0
    while i < len(lines):
        line = lines[i]
        match = re.search(r"\\lstinputlisting\[language=([^]]*)\]{([^}]*)}", line)
        if match:
            language = match.group(1)
            path = match.group(2)
            with open(f"working/{course}/{path}", "r", encoding="utf-8") as f:
                code = f.read()
            result.append(f"```{language}")
            result.append(code)
            result.append("```")
        else:
            result.append(line)
        i += 1

    return "\n".join(result)
