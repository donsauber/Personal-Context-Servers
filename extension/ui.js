
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
  getCurrentTab((tab) => {
    chrome.runtime.sendMessage({
      type: "SET_CONTEXT",
      context: "Example Context File"
    }, () => {
      document.getElementById("status").innerText = "Context opened.";
    });
  });
};
