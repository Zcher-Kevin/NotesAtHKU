import re


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

        # rule convert \ref{xxx:link_foo}
        # if \label{xxx:link_foo} exists in the current file, convert to [Link Foo](#link-foo), else [Link Foo](FIXME-xxx:link_foo)
        for match in re.finditer(r"\\ref{([^}]*)}", line):
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

        # rule convert \href{url}{text} to [text](url)
        for match in re.finditer(r"\\href{([^}]*)}{([^}]*)}", line):
            url = match.group(1)
            text = match.group(2)
            line = line.replace(match.group(0), f"[{text}]({url})")

        result.append(line)

    return "\n".join(result)
