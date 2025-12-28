/*
Copper Parser Module

Purpose:
- Read human-friendly Copper text files
- Extract sections, key-value pairs, and blocks
- Tolerate malformed or partial files
- Never modify input text
- Never enforce schemas

This parser is intentionally simple.
It is not a validator or compiler.
*/

export function parseCopper(text) {
  const lines = text.split(/\r?\n/);

  const result = {
    sections: [],
    rawText: text
  };

  let currentSection = null;
  let currentAuthor = null;
  let currentBlock = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Ignore empty lines
    if (!line.trim()) continue;

    // Section headers: [Section] or [=Decorated=]
    const sectionMatch = line.match(/^\[(=*)(.+?)(=*)\]$/);
    if (sectionMatch) {
      currentSection = {
        name: sectionMatch[2].trim(),
        entries: [],
        authors: []
      };
      result.sections.push(currentSection);
      currentAuthor = null;
      currentBlock = null;
      continue;
    }

    // Author markers: user@
    const authorMatch = line.match(/^([a-zA-Z0-9_]+)@/);
    if (authorMatch) {
      currentAuthor = authorMatch[1];
      if (currentSection) {
        currentSection.authors.push(currentAuthor);
      }
      continue;
    }

    // Block start: {code} or {commands}
    const blockStartMatch = line.match(/^\{(\w+)\}$/);
    if (blockStartMatch) {
      currentBlock = {
        type: blockStartMatch[1],
        content: []
      };
      continue;
    }

    // Block end: {/code}
    const blockEndMatch = line.match(/^\{\/(\w+)\}$/);
    if (blockEndMatch && currentBlock) {
      if (currentSection) {
        currentSection.entries.push({
          type: "block",
          blockType: currentBlock.type,
          content: currentBlock.content.join("\n"),
          author: currentAuthor
        });
      }
      currentBlock = null;
      continue;
    }

    // Inside a block
    if (currentBlock) {
      currentBlock.content.push(line);
      continue;
    }

    // Key-value pairs: key: value
    const kvMatch = line.match(/^([^:]+):\s*(.+)$/);
    if (kvMatch && currentSection) {
      currentSection.entries.push({
        type: "field",
        key: kvMatch[1].trim(),
        value: kvMatch[2].trim(),
        author: currentAuthor
      });
      continue;
    }

    // Plain text fallback
    if (currentSection) {
      currentSection.entries.push({
        type: "text",
        value: line,
        author: currentAuthor
      });
    }
  }

  return result;
}
