"use client";

import GiscusReact from "@giscus/react";
import { useEffect } from "react";

export default function Giscus() {
  function updateGiscusTheme() {
    console.log("Updating Giscus theme...");
    const theme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    console.log("Current theme is", theme);
    const widget = document.querySelector("giscus-widget") as HTMLElement;
    // set widget theme property to theme
    if (!widget) {
      console.warn("Giscus widget not found");
      return;
    }
    widget?.setAttribute("theme", theme);
    console.log("Giscus theme updated to", theme);
  }

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if ((node as HTMLElement).tagName === "GISCUS-WIDGET") {
              updateGiscusTheme();
            }
          });
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    const classListObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          updateGiscusTheme();
        }
      });
    });

    classListObserver.observe(document.documentElement, { attributes: true });

    return () => {
      observer.disconnect();
      classListObserver.disconnect();
    };
  }, []);

  return (
    <>
      <GiscusReact
        repo="EnhancedJax/notes.jaxtam.dev"
        repoId="R_kgDONjHylQ"
        category="General"
        categoryId="DIC_kwDONjHylc4ClkoB"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        lang="en"
        loading="lazy"
      />
    </>
  );
}
