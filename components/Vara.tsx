"use client";

import { useEffect } from "react";
import Vara from "vara";

interface TextProperties {
  /**
   * Size of the text
   */
  fontSize?: number | undefined;
  /**
   * Width / Thickness of the stroke
   */
  strokeWidth?: number | undefined;
  /**
   * Color of the text
   */
  color?: string | undefined;
  /**
   * Duration of the animation in milliseconds
   */
  duration?: number | undefined;
  /**
   * Text align, accepted values are left,center,right
   */
  textAlign?: "left" | "center" | "right" | undefined;
  /**
   * Whether to animate the text automatically
   */
  autoAnimation?: boolean | undefined;
  /**
   * Whether the animation should be in a queue
   */
  queued?: boolean | undefined;
  /**
   * Space between each character
   */
  letterSpacing?: number | undefined;
}

export default function VaraText({
  text,
  config,
}: {
  text: string;
  config: TextProperties;
}) {
  useEffect(() => {
    var vara = new Vara(
      "#vara-container",
      "https://raw.githubusercontent.com/akzhy/Vara/master/fonts/Satisfy/SatisfySL.json",
      [
        {
          text: text,
        },
      ],
      config
    );
  }, []);

  return <div id="vara-container" className="w-full " />;
}
