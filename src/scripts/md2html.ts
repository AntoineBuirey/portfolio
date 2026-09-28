// create a function to convert a raw markdown string to a rendered HTML string


export function convertMarkdownToHTML(markdown: string): string {
    const html = markdown
        .replace(/^(#{1,6})\s+(.*)$/gm, (match, hashes, title) => {
            const level = hashes.length;
            return `<h${level}>${title}</h${level}>`;
        })
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")                       // Bold
        .replace(/\*(.*?)\*/g, "<em>$1</em>")                                   // Italic
        .replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2" />')           // Images
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')                  // Links
        .replace(/^\s*-\s+(.*)$/gm, "<li>$1</li>")                              // Unordered lists
        .replace(/^\s*\d+\.\s+(.*)$/gm, "<li>$1</li>")                          // Ordered lists
        .replace(/<li>(.*?)<\/li>/g, "<ul><li>$1</li></ul>")                    // Wrap list items in <ul> tags
        .replace(/<\/ul>\s*<ul>/g, "")                                          // Remove consecutive <ul> tags
        .replace(/\`\`\`(.*?)\n(.*?)\n\`\`\`/gs, "<pre class=\"language-$1\"><code class=\"language-$1\">$2</code></pre>")  // Code blocks
        .replace(/\`(.*?)\`/g, "<code>$1</code>")                               // Inline code
        .replace(/\s>\s*([^\n]*?)\n/g, "<blockquote>$1</blockquote>")                // Blockquotes
    return html;
}