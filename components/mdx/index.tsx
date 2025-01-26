import A from "./A";
import ACCTExample from "./ACCTExample";
import Block from "./Block";
import BlockSep from "./BlockSep";
import ColorBox from "./ColorBox";
import HLayout from "./HLayout";
import Icon from "./Icon";
import Inline from "./Inline";
import JournalEntry from "./JournalEntry";
import Welcome from "./Welcome";
/* ---------------- - --------------- */
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { Steps } from "../Steps";
import { Card, Cards } from "./Cards";

const mdxComponents = {
  Block,
  BlockSep,
  HLayout,
  Welcome,
  ColorBox,
  ACCTExample,
  Inline,
  Icon,
  JournalEntry,
  Steps,
  a: A,
};

export const components = {
  ...defaultMdxComponents,
  ...mdxComponents,
  Cards,
  Card,
  img: (props: any) => <ImageZoom {...(props as any)} />,
};
