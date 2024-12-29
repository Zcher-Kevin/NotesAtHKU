import re


def parse_environments(tex_content):
    # example:
    # \begin{example}
    #   {Example title}
    #   Line 1
    #   Line 2
    # \end{example}
    # becomes
    # <Block variant="example" title="Example title">
    #   Line 1
    #   Line 2
    # </Block>

    # process line by line
    lines = tex_content.split("\n")
    in_env = False
    env_name = ""
    env_title = ""
    env_content = []
    result = []

    for line in lines:
        if line.startswith("\\begin{"):
            in_env = True
            env_name = re.match(r"\\begin{([^}]*)}", line).group(1)
            env_title = ""
        elif in_env and re.match(r"^\{.*\}$", line):
            env_title = line[1:-1]
        elif line.startswith("\\end{") and in_env:
            env_end_name = re.match(r"\\end{([^}]*)}", line).group(1)
            if env_end_name == env_name:
                block = (
                    f'<Block variant="{env_name}" title="{env_title}">\n'
                    + "\n".join(env_content)
                    + "\n</Block>"
                )
                result.append(block)
                in_env = False
                env_name = ""
                env_title = ""
                env_content = []
        elif in_env:
            env_content.append(line)
        else:
            result.append(line)

    return "\n".join(result)


def convert_tex_to_mdx(tex_content):
    # rule remove all tabs and beginning spaces
    tex_content = re.sub(r"\n\s+", r"\n", tex_content)
    tex_content = re.sub(r"^\s+", r"", tex_content)
    # rule convert \textbf{...} to **...**
    tex_content = re.sub(r"\\textbf{([^}]*)}", r"**\1**", tex_content)
    # rule convert \textit{...} to *...*
    tex_content = re.sub(r"\\textit{([^}]*)}", r"*\1*", tex_content)
    # rule convert \tcblower to <BlockSep />
    tex_content = re.sub(r"\\tcblower", r"<BlockSep />", tex_content)
    # rule convert itemized list to markdown list
    tex_content = re.sub(r"\\begin{itemize}", r"", tex_content)
    tex_content = re.sub(r"\\end{itemize}", r"", tex_content)
    tex_content = re.sub(r"\\item", r"- ", tex_content)
    # rule convert enumerate list to markdown list
    tex_content = re.sub(r"\\begin{enumerate}", r"", tex_content)
    tex_content = re.sub(r"\\end{enumerate}", r"", tex_content)
    tex_content = re.sub(r"\\item", r"1. ", tex_content)
    # rule convert sections to yaml header
    tex_content = re.sub(r"\\section{([^}]*)}", r"---\ntitle: \1\n---", tex_content)
    # rule convert subsections to ##
    tex_content = re.sub(r"\\subsection{([^}]*)}", r"## \1", tex_content)
    # rule convert subsubsections to ###
    tex_content = re.sub(r"\\subsubsection{([^}]*)}", r"### \1", tex_content)
    # rule convert \begin{align*} and \end{align*} to ```math```
    tex_content = re.sub(r"\\begin{align\*}", r"```math", tex_content)
    tex_content = re.sub(r"\\end{align\*}", r"```", tex_content)
    # rule convert "\[" to ```math\n and "\]" to \n```
    tex_content = re.sub(r"\\\[", r"```math\n", tex_content)
    tex_content = re.sub(r"\\\]", r"\n```", tex_content)
    # rule convert custom JSX block environments
    tex_content = parse_environments(tex_content)

    return tex_content


def main():
    with open("test.tex", "r") as file:
        tex_content = file.read()

    mdx_content = convert_tex_to_mdx(tex_content)

    with open("test.mdx", "w") as file:
        file.write(mdx_content)


if __name__ == "__main__":
    main()
