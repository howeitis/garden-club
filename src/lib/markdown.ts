// Renders Markdown written in YAML text fields (page intros, the About
// history) to HTML. Markdown *files* in src/content/ are rendered by Astro
// itself via render(); this is only for strings inside YAML.
//
// Inline-only fields (a single sentence) use `inline()` so no <p> wrapper is
// added; multi-paragraph fields use `block()`.
import { marked } from 'marked';

marked.use({ gfm: true, breaks: false });

export function block(text: string): string {
  return marked.parse(text.trim(), { async: false }) as string;
}

export function inline(text: string): string {
  return marked.parseInline(text.trim(), { async: false }) as string;
}
