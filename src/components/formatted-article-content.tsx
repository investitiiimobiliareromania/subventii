"use client";

import React from "react";

interface FormattedArticleContentProps {
  content: string;
  className?: string;
}

/**
 * Parses inline markdown: **bold**, *italic*, [text](url), `code`
 */
function parseInlineFormatting(text: string): React.ReactNode[] {
  // Regex to match: links [text](url), bold **text**, code `text`, italic *text*
  const regex = /(\[.*?\]\(https?:\/\/[^\s)]+\)|\*\*.*?\*\*|`.*?`|\*.*?\*)/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (!part) return null;

    // Link: [title](url)
    if (part.startsWith("[") && part.includes("](") && part.endsWith(")")) {
      const match = part.match(/^\[(.*?)\]\((https?:\/\/[^\s)]+)\)$/);
      if (match) {
        const [, linkText, linkUrl] = match;
        return (
          <a
            key={index}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-800 font-semibold underline hover:text-emerald-950 transition-colors"
          >
            {linkText}
          </a>
        );
      }
    }

    // Bold: **text**
    if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
      const inner = part.slice(2, -2);
      return (
        <strong key={index} className="font-bold text-slate-900">
          {inner}
        </strong>
      );
    }

    // Inline Code: `text`
    if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
      const inner = part.slice(1, -1);
      return (
        <code key={index} className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] text-slate-800 border border-slate-200">
          {inner}
        </code>
      );
    }

    // Italic: *text*
    if (part.startsWith("*") && part.endsWith("*") && part.length >= 2) {
      const inner = part.slice(1, -1);
      return (
        <em key={index} className="italic text-slate-800">
          {inner}
        </em>
      );
    }

    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

/**
 * Transforms raw markdown content into clean, semantic React elements
 * Eliminates all raw markdown symbols (##, **, -, etc.) from UI.
 */
export function FormattedArticleContent({ content, className = "" }: FormattedArticleContentProps) {
  if (!content) return null;

  // Split into raw blocks by double newlines or single newline blocks
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];

  let currentList: { type: "ul" | "ol"; items: string[] } | null = null;

  function flushList() {
    if (!currentList) return;
    if (currentList.type === "ul") {
      elements.push(
        <ul key={`list-${elements.length}`} className="my-3 space-y-2 pl-1">
          {currentList.items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-slate-800 leading-relaxed text-xs sm:text-sm">
              <span className="text-emerald-700 font-bold select-none leading-tight mt-0.5">•</span>
              <div className="flex-1">{parseInlineFormatting(item)}</div>
            </li>
          ))}
        </ul>
      );
    } else {
      elements.push(
        <ol key={`list-${elements.length}`} className="my-3 space-y-2 pl-4 list-decimal text-slate-800 text-xs sm:text-sm">
          {currentList.items.map((item, idx) => (
            <li key={idx} className="leading-relaxed pl-1">
              {parseInlineFormatting(item)}
            </li>
          ))}
        </ol>
      );
    }
    currentList = null;
  }

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i].trim();

    if (!rawLine) {
      flushList();
      continue;
    }

    // Headings: #, ##, ###, ####
    if (rawLine.startsWith("#")) {
      flushList();
      const level = rawLine.match(/^#+/)?.[0].length || 1;
      const headingText = rawLine.replace(/^#+\s*/, "").replace(/\*\*|__/g, "");

      if (level === 1) {
        elements.push(
          <h2 key={`h-${i}`} className="text-lg sm:text-xl font-black text-slate-900 mt-6 mb-3 border-b border-slate-100 pb-2">
            {headingText}
          </h2>
        );
      } else if (level === 2) {
        elements.push(
          <h3 key={`h-${i}`} className="text-base sm:text-lg font-bold text-slate-900 mt-5 mb-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600"></span>
            {headingText}
          </h3>
        );
      } else {
        elements.push(
          <h4 key={`h-${i}`} className="text-xs sm:text-sm font-bold text-slate-900 mt-4 mb-1.5 uppercase tracking-wide text-emerald-900">
            {headingText}
          </h4>
        );
      }
      continue;
    }

    // Unordered List item: - or *
    if (rawLine.startsWith("- ") || rawLine.startsWith("* ")) {
      const itemText = rawLine.slice(2).trim();
      if (!currentList || currentList.type !== "ul") {
        flushList();
        currentList = { type: "ul", items: [itemText] };
      } else {
        currentList.items.push(itemText);
      }
      continue;
    }

    // Ordered List item: 1. 2. etc.
    if (/^\d+\.\s+/.test(rawLine)) {
      const itemText = rawLine.replace(/^\d+\.\s+/, "").trim();
      if (!currentList || currentList.type !== "ol") {
        flushList();
        currentList = { type: "ol", items: [itemText] };
      } else {
        currentList.items.push(itemText);
      }
      continue;
    }

    // Normal Paragraph
    flushList();
    elements.push(
      <p key={`p-${i}`} className="my-2.5 leading-relaxed text-slate-800 text-xs sm:text-sm">
        {parseInlineFormatting(rawLine)}
      </p>
    );
  }

  flushList();

  return <div className={`article-body space-y-1 ${className}`}>{elements}</div>;
}
