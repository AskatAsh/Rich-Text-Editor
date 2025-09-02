import juice from "juice";

export function convertToEmailHtml(html: string) {
  // CSS for the editor content
  const css = `
    #post-wrapper{
      padding: 10px;
      border: 1px solid #e6e6e6;
    }
    h1 {
      font-size: 1.875rem;
      font-weight: 500;
      color: #1f2937;
      margin-top: 1.5rem;
      margin-bottom: 1.5rem;
    }
    h1:first-child { margin-top: 0; }
    h1:last-child { margin-bottom: 0; }

    h2 {
      font-size: 1.5rem;
      font-weight: 500;
      color: #1f2937;
      margin-top: 1.25rem;
      margin-bottom: 1.25rem;
    }
    h2:first-child { margin-top: 0; }
    h2:last-child { margin-bottom: 0; }

    h3 {
      font-size: 1.125rem;
      font-weight: 500;
      color: #1f2937;
      margin-top: 1.25rem;
      margin-bottom: 1.25rem;
    }
    h3:first-child { margin-top: 0; }
    h3:last-child { margin-bottom: 0; }

    h4 {
      font-size: 1rem;
      font-weight: 500;
      color: #1f2937;
      margin-top: 1.25rem;
      margin-bottom: 1.25rem;
    }
    h4:first-child { margin-top: 0; }
    h4:last-child { margin-bottom: 0; }

    p {
      font-size: 1rem;
      color: #4b5563;
      margin-top: 1rem;
      margin-bottom: 1rem;
      line-height: 1.625;
    }

    u { text-decoration-thickness: 2px; }

    blockquote {
      border-left: 4px solid #d1d5db;
      padding: 0.125rem 0.75rem;
      background-color: #f8fafc;
    }
    blockquote p { line-height: 1.25; }

    ul {
      list-style-type: disc;
      padding-left: 1.25rem;
      color: #374151;
    }
    ul li p { margin-top: 0.5rem; margin-bottom: 0.5rem; }

    ol {
      list-style-type: decimal;
      padding-left: 1.25rem;
    }
    ol li { padding-left: 0.375rem; }
    ol li p { margin-top: 0.5rem; margin-bottom: 0.5rem; }

    mark, .highlight {
      background-color: #fef08a;
      color: #1e293b;
    }
  `;

  // Use juice to inline the CSS into HTML
  return juice.inlineContent(html, css, { extraCss: `"font-family": "Arial"` });
}