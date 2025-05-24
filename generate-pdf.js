const express = require("express");
const puppeteer = require("puppeteer");
const path = require("path");
var fs = require("fs");
var distDir = "./dist";

//------------------------------------------------------------------------------
async function startServer() {
  const app = express();

  app.use(express.static("build"));

  const server = await new Promise((resolve) => {
    const s = app.listen(9000, () => {
      console.log("Server listening on http://localhost:3000");
      resolve(s);
    });
  });

  return server;
}

//------------------------------------------------------------------------------
(async () => {
  const server = await startServer();
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  //----------------------------------------------------------------------------
  await page.goto(`http://localhost:9000/?lang=en`, {
    waitUntil: "networkidle0",
  });

  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
  }

  await page.pdf({
    path: "dist/Maxime-Dupuis-resume.pdf",
    format: "Letter",
  });

  console.log("PDF generated: Maxime-Dupuis-resume.pdf");
  //----------------------------------------------------------------------------

  await page.goto(`http://localhost:9000/?lang=fr`, {
    waitUntil: "networkidle0",
  });

  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
  }

  await page.pdf({
    path: "dist/Maxime-Dupuis-cv.pdf",
    format: "Letter",
  });

  console.log("PDF generated: Maxime-Dupuis-cv.pdf");
  //----------------------------------------------------------------------------

  await browser.close();
  server.close();
})();
