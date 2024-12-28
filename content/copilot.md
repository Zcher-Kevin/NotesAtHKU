# Maths

Use TeX syntax to write math inside codeblocks prepended with `math`:

```math
\frac{1}{2}
```

# Horizontal layouts (minipages)

Use the component <HLayout split={[w, w, ...]}>...</HLayout> when converting a number of minipages that take up a width. Put the contents of each minipage into a <div> element inside the HLayout component. Split defines the width style for each child div.

# Images

Images should use markdown format:
![ImageCaption](./images/name.png)

# Blocks

Conversion of \begin{definition}, \begin{theorem}, \begin{knBox} ... \end{} to the MDX component <Block title="" variant="primary|secondary|knowledge"> ... </Block> (variants in order). \tcblower should be converted to the component <BlockSep />.

# Heirachy

(##) is subsection, (###) is subsubsection.

Sections should be translated to the mdx meta at the start of the file (example in the contents of the following code block):

```mdx
---
title: the section name
---
```
