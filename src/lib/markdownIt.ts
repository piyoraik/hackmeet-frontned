import MarkdownIt from "markdown-it";

export const markdownIt = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});
