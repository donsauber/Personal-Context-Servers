
// ui.js

function getCurrentTab(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    callback(tabs[0]);
  });
}

document.getElementById("selectRole").onclick = () => {
  getCurrentTab((tab) => {
    chrome.runtime.sendMessage({
      type: "SET_ROLE",
      role: { name: "Example Role" }
    }, () => {
      document.getElementById("status").innerText = "Role selected.";
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
