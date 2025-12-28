// background.js

// Per-tab runtime state
const tabState = new Map();

/*
Each tabState entry contains:
{
  role: null | RoleObject,
  mountedFolders: [],
  activeContextFile: null,
  session: {}
}
*/

chrome.tabs.onRemoved.addListener((tabId) => {
  tabState.delete(tabId);
});

// Initialize state when a tab is first touched
function ensureTabState(tabId) {
  if (!tabState.has(tabId)) {
    tabState.set(tabId, {
      role: null,
      mountedFolders: [],
      activeContextFile: null,
      session: {}
    });
  }
  return tabState.get(tabId);
}

// Message router
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const tabId = sender.tab?.id;
  if (!tabId) return;

  const state = ensureTabState(tabId);

  switch (message.type) {
    case "GET_STATE":
      sendResponse(state);
      break;

    case "SET_ROLE":
      state.role = message.role;
      sendResponse({ ok: true });
      break;

    case "SET_CONTEXT":
      state.activeContextFile = message.context;
      sendResponse({ ok: true });
      break;

    default:
      console.warn("Unknown message:", message);
  }
});

