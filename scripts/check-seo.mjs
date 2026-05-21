import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const DIST_DIR = new URL("../dist/", import.meta.url);
const SITE_ORIGIN = "https://junic.kim";
const EXPECTED_SITEMAP = `${SITE_ORIGIN}/sitemap-index.xml`;

const failures = [];

function fail(message) {
  failures.push(message);
}

function attr(html, name, value) {
  const pattern = new RegExp(
    `<${name}\\b[^>]*\\b${value.name}=["']${escapeRegExp(value.value)}["'][^>]*>`,
    "i",
  );
  return pattern.test(html);
}

function metaContent(html, name) {
  for (const tag of html.matchAll(/<meta\b[^>]*>/gi)) {
    const metaName = getAttribute(tag[0], "name") || getAttribute(tag[0], "property");
    if (metaName === name) return decodeHtml(getAttribute(tag[0], "content") || "");
  }

  return "";
}

function linkHref(html, rel) {
  for (const tag of html.matchAll(/<link\b[^>]*>/gi)) {
    if (getAttribute(tag[0], "rel") === rel) {
      return decodeHtml(getAttribute(tag[0], "href") || "");
    }
  }

  return "";
}

function allLinks(html) {
  return [...html.matchAll(/\bhref=["']([^"']+)["']/gi)].map((match) =>
    decodeHtml(match[1]),
  );
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getAttribute(tag, name) {
  const match = tag.match(
    new RegExp(`\\b${escapeRegExp(name)}=(["'])(.*?)\\1`, "i"),
  );
  return match ? match[2] : "";
}

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"');
}

function pathForUrl(url) {
  const parsed = new URL(url);
  const pathname = parsed.pathname.endsWith("/")
    ? `${parsed.pathname}index.html`
    : parsed.pathname;
  return pathname.replace(/^\//, "");
}

async function fileExists(relativePath) {
  try {
    await stat(new URL(relativePath, DIST_DIR));
    return true;
  } catch {
    return false;
  }
}

async function readDist(relativePath) {
  try {
    return await readFile(new URL(relativePath, DIST_DIR), "utf8");
  } catch (error) {
    if (error?.code === "ENOENT") {
      fail(`${relativePath} must exist in dist`);
      return "";
    }
    throw error;
  }
}

async function checkRobots() {
  const robots = await readDist("robots.txt");
  if (!robots.includes(`Sitemap: ${EXPECTED_SITEMAP}`)) {
    fail(`robots.txt must advertise ${EXPECTED_SITEMAP}`);
  }
}

async function sitemapUrls() {
  const index = await readDist("sitemap-index.xml");
  if (!index.includes(`${SITE_ORIGIN}/sitemap-0.xml`)) {
    fail("sitemap-index.xml must point to the canonical sitemap URL");
  }

  const sitemap = await readDist("sitemap-0.xml");
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (match) => match[1],
  );

  if (urls.length === 0) {
    fail("sitemap-0.xml must contain at least one URL");
  }

  for (const url of urls) {
    if (!url.startsWith(`${SITE_ORIGIN}/`)) {
      fail(`sitemap URL must use canonical origin: ${url}`);
    }
  }

  return urls;
}

async function checkHtmlPage(url, descriptions) {
  const relativePath = pathForUrl(url);
  const html = await readDist(relativePath);
  const pathname = new URL(url).pathname;
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1] ?? "";
  const description = metaContent(html, "description");
  const lang = html.match(/<html\b[^>]*lang=["']([^"']+)["']/i)?.[1] ?? "";

  if (!title) fail(`${relativePath} must have a title`);
  if (description) {
    if (description === "Juni's Personal Website") {
      fail(`${relativePath} must not use the generic English description`);
    }
    if (description === "김준희의 개인 홈페이지") {
      fail(`${relativePath} must not use the generic Korean description`);
    }
    if (description.length > 165) {
      fail(`${relativePath} description is too long (${description.length})`);
    }
    if (descriptions.has(description)) {
      fail(`${relativePath} description duplicates ${descriptions.get(description)}`);
    } else {
      descriptions.set(description, relativePath);
    }
  }

  if (!["en", "ko"].includes(lang)) {
    fail(`${relativePath} must declare lang as en or ko`);
  }

  const canonical = linkHref(html, "canonical");
  if (canonical !== url) {
    fail(`${relativePath} canonical must be ${url}`);
  }

  const requiredMeta = [
    "og:title",
    "og:url",
    "og:site_name",
    "og:type",
    "og:locale",
    "twitter:card",
    "twitter:title",
  ];
  for (const meta of requiredMeta) {
    if (!metaContent(html, meta)) {
      fail(`${relativePath} missing ${meta}`);
    }
  }

  if (metaContent(html, "og:url") !== url) {
    fail(`${relativePath} og:url must match canonical URL`);
  }

  if (!attr(html, "link", { name: "rel", value: "sitemap" })) {
    fail(`${relativePath} must link to the sitemap`);
  }

  if (pathname.startsWith("/en/")) {
    const koPath = pathname.replace(/^\/en\//, "/ko/");
    if (await fileExists(pathForUrl(`${SITE_ORIGIN}${koPath}`))) {
      if (!html.includes(`hreflang="ko"`)) {
        fail(`${relativePath} missing Korean alternate link`);
      }
    }
  }

  if (pathname.startsWith("/ko/")) {
    const enPath = pathname.replace(/^\/ko\//, "/en/");
    if (await fileExists(pathForUrl(`${SITE_ORIGIN}${enPath}`))) {
      if (!html.includes(`hreflang="en"`)) {
        fail(`${relativePath} missing English alternate link`);
      }
    }
  }

  return html;
}

async function checkInternalLinks(htmlByPath) {
  const checked = new Set();

  for (const [relativePath, html] of htmlByPath) {
    for (const href of allLinks(html)) {
      if (
        checked.has(href) ||
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("#") ||
        href.startsWith("/_astro/") ||
        href.startsWith("/~partytown/")
      ) {
        continue;
      }

      checked.add(href);
      const cleanHref = href.split("#")[0].split("?")[0];
      if (!cleanHref || cleanHref === "/") continue;

      const resolvedPath = cleanHref.endsWith("/")
        ? `${cleanHref}index.html`
        : path.extname(cleanHref)
          ? cleanHref
          : `${cleanHref}/index.html`;

      if (!(await fileExists(resolvedPath.replace(/^\//, "")))) {
        fail(`${relativePath} links to missing internal URL ${href}`);
      }
    }
  }
}

async function checkLlmsTxt() {
  const llms = await readDist("llms.txt");
  for (const required of [
    "# Juni Kim",
    "https://junic.kim",
    "/en/",
    "/ko/",
    "/en/dev/",
    "/en/research/exposome/",
  ]) {
    if (!llms.includes(required)) {
      fail(`llms.txt must mention ${required}`);
    }
  }
}

async function checkStandalonePages() {
  const html = await readDist("404.html");
  const canonical = linkHref(html, "canonical");
  const robots = metaContent(html, "robots");

  if (canonical !== `${SITE_ORIGIN}/404.html`) {
    fail("404.html canonical must point to https://junic.kim/404.html");
  }

  if (robots !== "noindex, nofollow") {
    fail("404.html must be marked noindex, nofollow");
  }
}

const descriptions = new Map();
const htmlByPath = new Map();

await checkRobots();
const urls = await sitemapUrls();

for (const url of urls) {
  const relativePath = pathForUrl(url);
  htmlByPath.set(relativePath, await checkHtmlPage(url, descriptions));
}

await checkInternalLinks(htmlByPath);
await checkLlmsTxt();
await checkStandalonePages();

if (failures.length > 0) {
  console.error("SEO check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`SEO check passed for ${urls.length} sitemap pages.`);
