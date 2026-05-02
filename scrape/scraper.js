// node scraper.js "https://www.linkedin.com/posts/someone_something-123456"

const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const OUTPUT_FILE = path.join(__dirname, "posts.json");

// Helper ===
function loadExistingPosts() {
  if (!fs.existsSync(OUTPUT_FILE)) {
    return [];
  }

  const raw = fs.readFileSync(OUTPUT_FILE, "utf-8");

  return JSON.parse(raw);
}

function savePosts(posts) {
  const json = JSON.stringify(posts, null, 2);
  fs.writeFileSync(OUTPUT_FILE, json, "utf-8");
}

// Core ===
async function scrapePost(url) {
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
    
    const authorEl = document.querySelector(".update-components-actor__name span[aria-hidden='true']");

    return {
      text:   textEl?.innerText?.trim()   ?? null,
      author: authorEl?.innerText?.trim() ?? null,
    };
  });

  await browser.close();

  if (!data.text) {
    throw new Error("Could not find post text. LinkedIn may have blocked the request or changed its HTML structure. Try opening the URL in a browser first.");
  }

  console.log(`Got post by: ${data.author ?? "Unknown"}`);

  return {
    url,
    author: data.author ?? "Unknown",
    text:   data.text,
    scrapedAt: new Date().toISOString(), // ISO 8601 timestamp so we know when it was scraped
  };
}

// Main ===
exports.scrape = (url) => {
  if (!url || !url.includes("linkedin.com")) {
    console.warn("Warning: URL doesn't look like a LinkedIn link or no link at all!");
    process.exit(1);
  }

  const existingPosts = loadExistingPosts();
  const alreadySaved = existingPosts.some((p) => p.url === url);
  if (alreadySaved) {
    console.log("⏭This URL is already in posts.json — skipping.");
    process.exit(0);
  }

  const post = await scrapePost(url);

  // Add the new post to the front of the array (newest first)
  const updatedPosts = [post, ...existingPosts];

  savePosts(updatedPosts);

  console.log(`\n💾 Saved! posts.json now has ${updatedPosts.length} post(s).`);
  console.log(`\nPost preview:\n"${post.text.slice(0, 120)}..."\n`);
}