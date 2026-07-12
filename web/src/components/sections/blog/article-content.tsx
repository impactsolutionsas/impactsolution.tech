"use client";

import { useMemo } from "react";

interface ArticleContentProps {
  content: string;
}

export function ArticleContent({ content }: ArticleContentProps) {
  const html = useMemo(() => parseMarkdown(content), [content]);

  return (
    <div
      className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-blockquote:not-italic prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-pre:bg-[#0f172a] prose-pre:text-slate-300 prose-pre:rounded-xl prose-pre:border prose-pre:border-border prose-table:border-collapse prose-th:bg-muted prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:text-sm prose-th:font-semibold prose-td:px-4 prose-td:py-2 prose-td:text-sm prose-td:border-t prose-td:border-border prose-li:text-muted-foreground prose-img:rounded-xl"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function parseMarkdown(md: string): string {
  let html = md.trim();

  html = html.replace(
    /```(\w+)?\n([\s\S]*?)```/g,
    (_, lang, code) =>
      `<pre><code class="language-${lang || ""}">${escapeHtml(code.trim())}</code></pre>`
  );

  html = html.replace(
    /`([^`]+)`/g,
    "<code>$1</code>"
  );

  html = html.replace(
    /^>\s*(.+)$/gm,
    '<blockquote><p>$1</p></blockquote>'
  );

  html = html.replace(
    /\|(.+)\|\n\|[-| ]+\|\n((?:\|.+\|\n?)*)/g,
    (_, header, body) => {
      const headers = header
        .split("|")
        .map((h: string) => h.trim())
        .filter(Boolean);
      const rows = body
        .trim()
        .split("\n")
        .map((r: string) =>
          r
            .split("|")
            .map((c: string) => c.trim())
            .filter(Boolean)
        );
      return `<table><thead><tr>${headers.map((h: string) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map((r: string[]) => `<tr>${r.map((c: string) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
    }
  );

  html = html.replace(/^#### (.+)$/gm, "<h4>$1</h4>");
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");

  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  html = html.replace(/^(\d+)\.\s+(.+)$/gm, "<li>$2</li>");
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, (match) => {
    if (match.includes("- **")) return match;
    return `<ol>${match}</ol>`;
  });

  html = html.replace(/^- (.+)$/gm, "<li>$1</li>");
  html = html.replace(
    /(<li>(?:(?!<\/?ol>).)*<\/li>\n?)+/g,
    (match) => {
      if (match.includes("<ol>")) return match;
      return `<ul>${match}</ul>`;
    }
  );

  html = html.replace(
    /^(?!<[houptlb])((?!\s*$).+)$/gm,
    "<p>$1</p>"
  );

  html = html.replace(/<p><\/p>/g, "");
  html = html.replace(/\n{2,}/g, "\n");

  return html;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
