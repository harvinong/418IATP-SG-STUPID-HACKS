// node scraper.js "https://www.linkedin.com/posts/someone_something-123456"

const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

// Core ===
async function getPost(url) {
  console.log(`Scraping: ${url}`);

  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--no-sandbox",           // required in some Linux/CI environments
      "--disable-setuid-sandbox",
    ],
  });

  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
    "AppleWebKit/537.36 (KHTML, like Gecko) " +
    "Chrome/120.0.0.0 Safari/537.36"
  );

  await page.goto(url, { waitUntil: "networkidle2", timeout: 20000 });

  const data = await page.evaluate(() => {
    const textEl =
      document.querySelector(".feed-shared-update-v2__description span[dir='ltr']") ||
      document.querySelector(".attributed-text-segment-list__content") ||
      document.querySelector(".feed-shared-text");
    
    return {
      text:   textEl?.innerText?.trim()   ?? null,
    };
  });

  await browser.close();

  if (!data.text) {
    throw new Error("Could not find post text. LinkedIn may have blocked the request or changed its HTML structure. Try opening the URL in a browser first.");
  }

  console.log(`Got post by: ${data.author ?? "Unknown"}`);

  return {
    link: url,
    text: data.text,
  };
}

// Main ===
exports.scrapePost = async (url) => {
  if (!url || !url.includes("linkedin.com")) {
    console.warn("Warning: URL doesn't look like a LinkedIn link or no link at all!");
    process.exit(1);
  }

  const scrapePost = await getPost(url);
  console.log(scrapePost)
  const newPost = {
    text: scrapePost.text,
    link: scrapePost.link,
    isReal: true,
  }

  return newPost
}