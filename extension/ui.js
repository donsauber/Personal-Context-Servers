
// ui.js

/*
UI INTENT NOTES

The UI is an explicit control surface.
It must never:
- Auto-select Roles
- Auto-open Context Files
- Assume a default workspace

All actions must be:
- Visible
- Intentional
- Reversible
*/

function renderParsedContext(parsed) {
  const status = document.getElementById("status");
  status.innerText = "";

  parsed.sections.forEach(section => {
    const header = document.createElement("h4");
    header.innerText = section.name;
    status.appendChild(header);

    section.entries.forEach(entry => {
      const line = document.createElement("div");

      if (entry.type === "field") {
        line.innerText = `${entry.key}: ${entry.value}`;
      } else if (entry.type === "text") {
        line.innerText = entry.value;
      } else if (entry.type === "block") {
        line.innerText = `[${entry.blockType} block]`;
      }

      status.appendChild(line);
    });
  });
}


function getCurrentTab(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    callback(tabs[0]);
  });
}

document.getElementById("selectRole").onclick = () => {
  // TODO:
  // - Open file picker for Role file
  // - Parse Role using Copper parser
  // - Send parsed Role object to background
  // - Confirm active Role to user
   getCurrentTab((tab) => {
    chrome.runtime.sendMessage({
      type: "SET_ROLE",
      role: { name: "Example Role (placeholder)" }
    }, () => {
      document.getElementById("status").innerText = "Role selected (placeholder).";
    });
  });
};

document.getElementById("openContext").onclick = () => {
  const exampleText = `
[Overview]
This is a test context.

[Account]
service: Example
login_email: test@example.com
`;

  chrome.runtime.sendMessage(
    {
      type: "PARSE_COPPER_TEXT",
      text: exampleText
    },
    (response) => {
      if (response.ok) {
        renderParsedContext(response.parsed);
      } else {
        document.getElementById("status").innerText = "Parse error.";
      }
    }
  );
};
