import React from "react";

/**
 * Disclaimers such as "(Subject to availability)" and "(T's & C's apply!)" are
 * authored inline inside plain strings in projects.json, which cannot carry
 * markup. This splits those parentheticals out of the string so they can be
 * rendered smaller than the copy they trail.
 */
const FINE_PRINT = /\(\s*[^()]*(?:subject to availability|c['’]?s? apply|apply)[^()]*\)/gi;

/**
 * Same detection as renderFinePrint, but returns the parts separately so a
 * caller can lay the disclaimer out on its own line rather than inline.
 */
export function splitFinePrint(text?: string): { main: string; note: string } {
  if (!text) return { main: "", note: "" };

  const matches = text.match(FINE_PRINT);
  if (!matches) return { main: text, note: "" };

  return {
    main: text.replace(FINE_PRINT, "").replace(/\s+/g, " ").trim(),
    note: matches.join(" "),
  };
}

/**
 * HTML-string variant, for the few call sites that render copy through
 * dangerouslySetInnerHTML and so cannot take a React node. Styled by the
 * `.fine-print` rule in globals.css.
 */
export function finePrintHtml(text?: string): string {
  if (!text) return "";
  return text.replace(
    FINE_PRINT,
    (match) => `<span class="fine-print">${match}</span>`
  );
}

export function renderFinePrint(text?: string): React.ReactNode {
  if (!text) return text ?? null;

  const parts: React.ReactNode[] = [];
  let cursor = 0;

  for (const match of text.matchAll(FINE_PRINT)) {
    const start = match.index ?? 0;

    if (start > cursor) parts.push(text.slice(cursor, start));

    parts.push(
      <span
        key={start}
        className="fine-print"
        style={{
          fontSize: "0.75em",
          fontWeight: 700,
          // Short notes like "(Subject to availability)" read better unbroken,
          // but a full sentence has to be allowed to wrap or it overflows.
          whiteSpace: match[0].length > 40 ? "normal" : "nowrap",
          opacity: 0.85,
        }}
      >
        {/* Keep the disclaimer from butting up against the preceding word. */}
        {text[start - 1] === " " ? "" : " "}
        {match[0]}
      </span>
    );

    cursor = start + match[0].length;
  }

  if (parts.length === 0) return text;
  if (cursor < text.length) parts.push(text.slice(cursor));

  return <>{parts}</>;
}
