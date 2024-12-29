# The current implementation does NOT handle nested environments. Update to do so. The following is an example of nested envs:
# ```tex
# \begin{theorem}
#     {Using the limit laws}
#     For functions $f,g$ and using $\mathop {\lim }\limits_{x \to a}=\bigcirc$ for simpler notation:
#     \begin{enumerate}
#         \item $lim_{x\to a}c=c$
#         \item $\bigcirc(f\pm g)=\bigcirc f\pm \bigcirc g$
#         \item $\bigcirc(k\cdot f)=\bigcirc k\cdot\bigcirc f$
#         \item $\bigcirc(f^n)=(\bigcirc f)^n$
#         \item $\bigcirc(fg)=\bigcirc f\bigcirc g$
#         \item $\bigcirc(\frac{f}{g})=\frac{\bigcirc f}{\bigcirc g},\quad\text{given that }\bigcirc g\ne 0$. \emph{This strict condition prevents indeterminate forms.}
#     \end{enumerate}
#     We can use these laws to break a limit into separate limits, and compute that way. Also note that:
#     \begin{enumerate}[start=7]
#         \item $\bigcirc f(g)=f(\bigcirc g),\quad$given that $f$ is \textbf{continuous} at $\bigcirc g$
#     \end{enumerate}
# \end{theorem}
# ```

# which should be converted to:

# ```
# <Block variant="theorem" title="Using the limit laws">
# For functions $f,g$ and using $\mathop {\lim }\limits_{x \to a}=\bigcirc$ for simpler notation:

# 1. $lim_{x\to a}c=c$
# 1. $\bigcirc(f\pm g)=\bigcirc f\pm \bigcirc g$
# 1. $\bigcirc(k\cdot f)=\bigcirc k\cdot\bigcirc f$
# 1. $\bigcirc(f^n)=(\bigcirc f)^n$
# 1. $\bigcirc(fg)=\bigcirc f\bigcirc g$
# 1. $\bigcirc(\frac{f}{g})=\frac{\bigcirc f}{\bigcirc g},\quad\text{given that }\bigcirc g\ne 0$. *This strict condition prevents indeterminate forms.*
# We can use these laws to break a limit into separate limits, and compute that way. Also note that:

# 7. $\bigcirc f(g)=f(\bigcirc g),\quad$given that $f$ is **continuous** at $\bigcirc g$

# </Block>
# ```

import re

def adapter(env_name, env_param, env_square_params, last_env_name):
    if env_name in ["example", "theorem", "definition", "knBox"]:
        return f"<Block variant=\"{env_name}\" title=\"{env_param}\">"
    elif env_name == "minipage":
        if last_env_name != "minipage":
            return "<HLayout><div>"
        else:
            return "<div>"
    elif env_name in ["itemize", "enumerate", "center"]:
        return ""

def middle_adapter(line, env_name, env_square_params):
    if env_name in ["itemize", "enumerate"]:
        match = re.match(r"\\item (.*)", line)
        if not match:
            return line, False
        content = match.group(1)
        if env_name == "itemize":
            return f"- {content}", True
        elif env_name == "enumerate":
            if env_square_params and re.match(r"start=[0-9]+", env_square_params):
                match_start_param = re.match(r"^start=([0-9]+)", env_square_params)
                return f"{match_start_param.group(1)}. {content}", True
            else:
                return f"1. {content}", True
    return line, False
            


def close_adapter(env_name, last_env_name):
    if env_name in ["example", "theorem", "definition", "knBox"]:
        return "</Block>"
    elif env_name == "minipage":
        if last_env_name == "minipage":
            return "</div></HLayout>"
        else:
            return "</div>"
    elif env_name in ["itemize", "enumerate", "center"]:
        return ""


def parse_environments(tex_content):
    # process line by line
    lines = tex_content.split("\n")
    env_name = None
    env_param = None  # expected
    env_square_params = None  # optional
    last_env_name = None
    processed_lines = []
    for line in lines:
        # get the env_name from the line.
        # e.g. \begin{example} -> example or \begin{example}{...} -> example
        if env_name is None:
            match = re.match(r"\\begin{([^}]*)}", line)
            if match:
                env_name = match.group(1)
                print(f"Found env_name: {env_name}")
                # check same line params
                match_params = re.match(r"\\begin{[^}]*}{([^}]*)}", line)
                match_square_params = re.match(r"\\begin{[^}]*}\[([^]]*)]", line)
                if match_params:
                    env_param = match_params.group(1)
                    print(f"Found env_param same line: {env_param}")
                    line = adapter(env_name, env_param, None, last_env_name)
                elif match_square_params:
                    env_square_params = match_square_params.group(1)
                    print(f"Found env_square_params same line: {env_square_params}")
                    line = adapter(env_name, None, env_square_params, last_env_name)
                else:
                    print("No params found on same line")
                    line = ""
        else:
            # check next line params
            match_params = re.match(r"{([^}]*)}", line)
            if match_params:
                env_param = match_params.group(1)
                print(f"Found env_param next line: {env_param}")
                line = adapter(env_name, env_param, None, last_env_name)
            else:
                line, changed = middle_adapter(line, env_name, env_square_params)
                if changed:
                    processed_lines.append(line)
                    continue
                # match the end of env with the env_name
                match = re.match(r"\\end{([^}]*)}", line)
                if match and match.group(1) == env_name:
                    print(f"Found end of env: {env_name}")
                    line = close_adapter(env_name, last_env_name)
                    last_env_name = env_name
                    env_name = None
                    env_param = None
                    env_square_params = None
        processed_lines.append(line)
    
    return "\n".join(processed_lines)


def convert_tex_to_mdx(tex_content):
    # -------------- Remove -------------- #
    # rule remove all tabs and beginning spaces
    tex_content = re.sub(r"\n\s+", r"\n", tex_content)
    tex_content = re.sub(r"^\s+", r"", tex_content)
    # remove all labels
    tex_content = re.sub(r"\\label{[^}]*}", r"", tex_content)
    # remove spacing
    tex_content = re.sub(r"\n\\hfill", r"", tex_content)
    tex_content = re.sub(r"\n\\vspace{[^}]*}", r"", tex_content)
    # --------- Basic conversion --------- #
    # rule convert \textbf{...} to **...**
    tex_content = re.sub(r"\\textbf{([^}]*)}", r"**\1**", tex_content)
    # rule convert \textit{...} and \emph{...} to *...*
    tex_content = re.sub(r"\\textit{([^}]*)}", r"*\1*", tex_content)
    tex_content = re.sub(r"\\emph{([^}]*)}", r"*\1*", tex_content)
    # rule convert \tcblower to <BlockSep />
    tex_content = re.sub(r"\\tcblower", r"<BlockSep />", tex_content)
    # rule convert \includegraphics[...]{path} to ![](./path)
    tex_content = re.sub(r"\\includegraphics\[.*\]{([^}]*)}", r"![](./\1)", tex_content)
    # ------------- Sections ------------- #
    # rule convert sections to yaml header
    tex_content = re.sub(r"\\section{([^}]*)}", r"---\ntitle: \1\n---", tex_content)
    # rule convert subsections to ##
    tex_content = re.sub(r"\\subsection{([^}]*)}", r"## \1", tex_content)
    # rule convert subsubsections to ###
    tex_content = re.sub(r"\\subsubsection{([^}]*)}", r"### \1", tex_content)
    # --------------- Maths -------------- #
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
