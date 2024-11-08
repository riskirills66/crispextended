//Ctrl+Alt+F Shortcut to Ask for Ratings
document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.altKey && event.key === "f") {
    const targetSelector = ".c-conversation-profile-widget-layout-action--button.c-conversation-profile-widget-layout-action--green";
    const targetElement = document.querySelector(targetSelector);

    if (targetElement) {
      targetElement.click();
    }
  }
});
// ..................

// Dynamic Bubble Color
function changeBackgroundColor() {
  const profileElement = document.querySelector("#crisp-app > div.c-app__container > div.c-app__content > div.c-app__stack > div > div > div > div.c-inbox-conversation.o-layout.o-layout--flex > div.c-inbox-conversation__pane > div > div.c-conversation-profile.c-inbox-conversation__profile > div > div.c-conversation-profile__body > div > div:nth-child(8) > div > div.c-conversation-profile-widget__body > div > div:nth-child(1) > div:nth-child(2) > div.c-conversation-profile-widget-data-item__cell.c-conversation-profile-widget-data-item__cell--value");

  if (profileElement) {
    let backgroundColor = ''; // Default background color

    // Check for different text and set color accordingly
    const textContent = profileElement.textContent.trim();
    if (textContent.includes("Zona Loket")) {
      backgroundColor = '#a90000'; 
    } else if (textContent.includes("Talenta Mobile")) {
      backgroundColor = '#FF00FF'; 
    } else if (textContent.includes("AFF Mobile")) {
      backgroundColor = '#ca5c00'; 
    } else if (textContent.includes("Rumah Pulsa Apps")) {
      backgroundColor = '#661200'; 
    } else if (textContent.includes("Loket Kuota")) {
      backgroundColor = '#618874'; 
    } else if (textContent.includes("Infra Mobile")) {
      backgroundColor = '#0c4aff'; 
    } else if (textContent.includes("Smart Loket")) {
      backgroundColor = '#03807f'; 
    }

    if (backgroundColor) {
      const elements = document.querySelectorAll('.c-conversation-box-content-message-bubble--operator .c-conversation-box-content-message-bubble__wrapper');
      elements.forEach(element => {
        element.style.backgroundColor = backgroundColor;
      });
    }
  }
}
document.addEventListener('DOMContentLoaded', changeBackgroundColor);
const observer = new MutationObserver(() => {
  changeBackgroundColor();
});
observer.observe(document.body, {
  childList: true,
  subtree: true
});
// ..................
