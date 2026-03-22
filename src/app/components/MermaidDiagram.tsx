import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  fontFamily: "Inter, sans-serif",
});

function normalizeSvgLayout(container: HTMLDivElement) {
  const svgElement = container.querySelector("svg");

  if (!svgElement) {
    return;
  }

  // Mermaid injects a fixed height alongside width: 100%.
  // On wide layouts, that creates an empty block under the chart.
  svgElement.removeAttribute("height");
  svgElement.style.height = "auto";
  svgElement.style.display = "block";
}

function colorJourneyFaces(container: HTMLDivElement, chart: string) {
  if (!chart.includes("journey")) {
    return;
  }

  const matches = [...chart.matchAll(/:\s*([1-5])\s*:/g)];
  const scores = matches.map((match) => parseInt(match[1], 10));
  const faceElements = container.querySelectorAll(".face, [class*='face']");

  Array.from(faceElements).forEach((face, index) => {
    const score = scores[index];

    if (!score) {
      return;
    }

    let color = "#22c55e";
    if (score <= 2) color = "#ef4444";
    else if (score === 3) color = "#eab308";

    const element = face as HTMLElement;
    element.style.setProperty("fill", color, "important");
    element.style.setProperty("color", color, "important");

    const childShapes = element.querySelectorAll("path, circle, rect");

    if (childShapes.length === 0) {
      element.style.setProperty("stroke", color, "important");
      return;
    }

    childShapes.forEach((child) => {
      const childElement = child as HTMLElement;
      const childClass = childElement.getAttribute("class") ?? "";

      if (!childElement.classList.contains("mouth") && !childClass.includes("mouth")) {
        childElement.style.setProperty("fill", color, "important");
        childElement.style.setProperty("stroke", color, "important");
      } else {
        childElement.style.setProperty("stroke", "#000000", "important");
      }
    });
  });
}

export function MermaidDiagram({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    ref.current.innerHTML = "";
    const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;

    mermaid
      .render(id, chart)
      .then(({ svg }: { svg: string }) => {
        if (!ref.current) {
          return;
        }

        ref.current.innerHTML = svg;
        normalizeSvgLayout(ref.current);
        colorJourneyFaces(ref.current, chart);
      })
      .catch((err: unknown) => {
        console.error("Mermaid parsing error:", err);
        if (ref.current) {
          ref.current.innerHTML =
            '<p class="text-red-500 text-sm">Failed to render diagram.</p>';
        }
      });
  }, [chart]);

  return <div ref={ref} className="mermaid mb-0 overflow-x-auto" />;
}
