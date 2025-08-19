document.getElementById("openPage").addEventListener("click", () => {
  chrome.tabs.create({ url: chrome.runtime.getURL("login.html") });
});