document.getElementById("openPage").addEventListener("click", () => {
  chrome.tabs.create({ url: chrome.runtime.getURL("Notes_page.html") });
});