const puppeteer = require("puppeteer");
const path = require("path");
var fs = require("fs");
var distDir = "./dist";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const filePath = path.resolve(__dirname, "build/index.html");
  await page.goto(`file://${filePath}`, { waitUntil: "networkidle0" });

  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
  }

  await page.pdf({
    path: "dist/site.pdf",
    format: "Letter",
  });

  await browser.close();
  console.log("PDF generated: site.pdf");
})();
