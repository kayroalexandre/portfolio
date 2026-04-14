const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/project/monetix', { waitUntil: 'networkidle' });
  
  const journeySvgMarkup = await page.evaluate(() => {
    const svgElements = document.querySelectorAll('.mermaid svg');
    let journeySvg = '';
    for (const svgElement of svgElements) {
      if (svgElement.innerHTML.includes('Antes (Legado)')) journeySvg = svgElement.outerHTML;
    }
    return journeySvg;
  });
  
  fs.writeFileSync('mermaid-out.txt', journeySvgMarkup);
  await browser.close();
  console.log('Done');
})();
