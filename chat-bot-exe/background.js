chrome.runtime.onInstalled.addListener(() => {
    console.log('WhatsApp Chatbot Extension Installed');
  });
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'openPopup') {
      chrome.action.openPopup();
    }
  });