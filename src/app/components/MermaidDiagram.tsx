import mermaid from 'mermaid';
import React, { useEffect, useRef } from 'react';

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  fontFamily: 'Inter, sans-serif',
});

function normalizeSvgLayout(container: HTMLDivElement) {
  const svgElement = container.querySelector('svg');

  if (!svgElement) {
    return;
  }

  // Mermaid injects a fixed height alongside width: 100%.
  // On wide layouts, that creates an empty block under the chart.
  svgElement.removeAttribute('height');
  svgElement.style.height = 'auto';
  svgElement.style.display = 'block';
}

function colorJourneyFaces(container: HTMLDivElement, chart: string) {
  if (!chart.includes('journey')) {
    return;
  }

  const colorByScore: Record<number, string> = {
    1: '#ef4444',
    2: '#ef4444',
    3: '#eab308',
    4: '#22c55e',
    5: '#22c55e',
  };

  const scoreMatches = [...chart.matchAll(/:\s*([1-5])\s*:/g)];
  const scores = scoreMatches.map((scoreMatch) => parseInt(scoreMatch[1], 10));
  const faceElements = container.querySelectorAll(".face, [class*='face']");

  Array.from(faceElements).forEach((faceElement, faceIndex) => {
    const score = scores[faceIndex];

    if (!score) {
      return;
    }

    const color = colorByScore[score] ?? '#22c55e';

    const faceNode = faceElement as HTMLElement;
    faceNode.style.setProperty('fill', color, 'important');
    faceNode.style.setProperty('color', color, 'important');

    const childShapes = faceNode.querySelectorAll('path, circle, rect');

    if (childShapes.length === 0) {
      faceNode.style.setProperty('stroke', color, 'important');
      return;
    }

    childShapes.forEach((childShape) => {
      const childElement = childShape as HTMLElement;
      const childClass = childElement.getAttribute('class') ?? '';

      if (childElement.classList.contains('mouth') || childClass.includes('mouth')) {
        childElement.style.setProperty('stroke', '#000000', 'important');
        return;
      }

      childElement.style.setProperty('fill', color, 'important');
      childElement.style.setProperty('stroke', color, 'important');
    });
  });
}

export function MermaidDiagram({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    ref.current.innerHTML = '';
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
      .catch((renderError: unknown) => {
        console.error('Mermaid parsing error:', renderError);
        if (ref.current) {
          ref.current.innerHTML = '<p class="text-red-500 text-sm">Failed to render diagram.</p>';
        }
      });
  }, [chart]);

  return <div ref={ref} className="mermaid mb-0 overflow-x-auto" />;
}
