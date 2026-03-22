const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/project/monetix', { waitUntil: 'networkidle' });
  
  const d = await page.evaluate(() => {
    const svgs = document.querySelectorAll('.mermaid svg');
    let journeySvg = '';
    for(const s of svgs) { 
      if(s.innerHTML.includes('Antes (Legado)')) journeySvg = s.outerHTML; 
    }
    return journeySvg;
  });
  
  fs.writeFileSync('mermaid-out.txt', d);
  await browser.close();
  console.log('Done');
})();
