import mermaid from 'mermaid';
import { JSDOM } from 'jsdom';

const dom = new JSDOM(`<!DOCTYPE html><html><body><div id="mermaid"></div></body></html>`);
global.window = dom.window;
global.document = dom.window.document;

mermaid.initialize({ startOnLoad: false });

async function run() {
  const chart = `
    journey
      title Test
      section A
        Task 1: 3: User
  `;
  try {
    const { svg } = await mermaid.render('test-id', chart);
    console.log(svg);
  } catch (e) {
    console.error(e);
  }
}
run();
