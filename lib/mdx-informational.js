import fs from "fs";
import path from "path";
import matter from "gray-matter";

const INFORMATIONAL_MDX_DIR = path.join(
  process.cwd(),
  "content",
  "posts",
  "informational",
);

/**
 * Load MDX body for an informational article (Node/server only — do not import from middleware).
 * @param {string} mdxFile - Filename under content/posts/informational/
 * @returns {string|null} Markdown/MDX body without frontmatter
 */
export function loadMdxInformationalSource(mdxFile) {
  if (!mdxFile) return null;

  const filePath = path.join(INFORMATIONAL_MDX_DIR, mdxFile);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { content } = matter(raw);
  return content.trim();
}
