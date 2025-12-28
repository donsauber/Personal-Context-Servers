// background.js

import { parseCopper } from "./copperParser.js";

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

/*
ROLE LOADING DESIGN NOTES

A Role represents scope and availability, not security.

Planned behavior:
- Roles are plain text Copper files selected explicitly by the user.
- A Role file declares:
  - Which folders are mounted
  - Which applications are available
- Role selection is always user-driven.
- The extension must never auto-discover or auto-activate Roles.

Implementation constraints:
- Role loading should be local-first (filesystem or Drive picker).
- No background scanning.
- No implicit defaults.
- No persistence beyond the tab unless explicitly saved.

Security note:
- Role loading does NOT perform authentication or permission checks.
- Access control is inherited from the storage provider.
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
      // TODO:
  // - Validate role object structure
  // - Load Role file from user-selected source
  // - Mount folders declared in Role
  // - Register available applications
      state.role = message.role;
      sendResponse({ ok: true });
      break;

    case "SET_CONTEXT":
      state.activeContextFile = message.context;
      sendResponse({ ok: true });
      break;

    case "PARSE_COPPER_TEXT":
    // Read-only Copper parsing service
    // Input: raw text
    // Output: parsed structure
      try {
        const parsed = parseCopper(message.text);
        sendResponse({ ok: true, parsed });
      } catch (e) {
        sendResponse({ ok: false, error: e.message });
      }
      break;


    default:
      console.warn("Unknown message:", message);
  }
});

