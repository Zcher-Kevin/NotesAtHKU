# Notes At HKU

Open, hand-typed notes by HKU students, for HKU students.

## Contributing!

Hi! First of all, thanks for wanting to contribute to Notes@HKU!

You can contribute in a number of ways:

1. Adding new content
2. Fix inconsistencies in existing notes
3. Fix incorrect information
4. Fix typos

The following guide will help you get started. If you are unfamiliar with Github, you can also simply leave a comment on the website!

## File structure

If you are planning to edit a page, you can click on "Edit on Github" at the bottom of each page, or click the Pen icon then "Edit note on Github". This will take you to the file on Github.

All notes are stored in the [notes](/content/notes/) folder. Each note is stored in a folder with the same name as the note. The folder contains the following files:

1. `*.mdx` - A page of the note. The name of the file is the url / slug of the page.
1. `meta.json` - Contains metadata about the note. When adding new pages, you must update the `pages` array in this file.

## Notes styling & conciseness

1. Keep notes concise, clear and to the point. Keep only necessary context.
2. Use headings and subheadings to structure the notes.
3. Always use [admonitions](#advanced-mdx) to contain concepts, examples and useful information. Only write context, transitional sentences and less important information outside of admonitions.

## MDX format

The site is built upon [fumadocs](https://fumadocs.vercel.app/), and supports [Github flavored markdown](https://guides.github.com/features/mastering-markdown/).

## Advanced MDX

For advanced usage, we also support:

### JSX (html) components with Tailwind classes

```md
<!--  -->
<div className="bg-blue-100 p-4 rounded-lg">
  Hello
</div>
```

### Admonitions

Valid types are `note`, `info`, `tip`, `eg`, `example`.

| type    | description                           |
| ------- | ------------------------------------- |
| note    | Useful information                    |
| info    | Useful concepts                       |
| tip     | Theorems, definitions and key items   |
| eg      | Examples at the end of an admonitions |
| example | Examples outside of admonitions       |

```md
!!! info "Title of card"

    Content (remember to indent & keep empty line above!)

    !!! eg "Examples"

        You can put examples here.
```

### Custom components

You can add custom components and use them in notes. First create a `tsx` componnt in `components/mdx/` folder, then update `components/mdx/index.ts` to export the component.

## Editing

1. Fork this repository
2. Clone the repository to your local machine
3. Make changes
4. Push changes to your fork
5. Create a pull request

I'll review the changes and merge them if they look good!
