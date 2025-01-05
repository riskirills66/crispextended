//Ctrl+Alt+E Shortcut to Ask for Ratings
document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.altKey && event.key === "e") {
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

  // Store previously applied background color to reset when condition no longer matches
  let lastAppliedColor = '';

  if (profileElement) {
    let backgroundColor = ''; // Default to no background color
    const textContent = profileElement.textContent.trim();

    // Determine the background color based on text content
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

    // Function to reset styles to default
    const resetStyles = () => {
      const elementsToReset = [
        ...document.querySelectorAll('.c-conversation-box-content-message-bubble--operator .c-conversation-box-content-message-bubble__wrapper'),
        ...document.querySelectorAll('.c-conversation-box-content-message-bubble--operator .c-conversation-box-content-message-bubble__audio .c-conversation-box-content-message-bubble__progress'),
        ...document.querySelectorAll('.c-conversation-menu-item__meta--draft .c-conversation-menu-item__meta-marker'),
        ...document.querySelectorAll('.c-conversation-menu-item__meta--draft .c-conversation-menu-item__meta-label'),
        ...document.querySelectorAll('.c-conversation-menu-item--pending .c-conversation-menu-item__nickname, .c-conversation-menu-item--has-unread .c-conversation-menu-item__nickname'),
        ...document.querySelectorAll('.c-conversation-menu-item--pending:before'),
        ...document.querySelectorAll('.c-new-conversation__participants-add, .c-new-conversation__participants-add-icon'),
        ...document.querySelectorAll('.c-conversation-menu__button--new .c-base-button__icon'),
        ...document.querySelectorAll('.c-sidebar-item--current:not(.c-sidebar-item--sub)>.c-sidebar-item__inner'),
        ...document.querySelectorAll('.c-base-notification--blue'),
        ...document.querySelectorAll('.c-base-button--blue'),
        ...document.querySelectorAll('.c-base-tabs--blue .c-base-tabs__item--active .c-base-tabs__wrapper'),
        ...document.querySelectorAll('.c-field-token .c-field-token__field'),
        ...document.querySelectorAll('.c-base-toast--info .c-base-toast__view')
      ];

      elementsToReset.forEach(element => {
        element.style.backgroundColor = ''; // Reset background color
        element.style.color = ''; // Reset color
        element.style.stroke = ''; // Reset stroke color
      });
    };

    // If a new background color should be applied, set it; otherwise, reset
    if (backgroundColor) {
      if (backgroundColor !== lastAppliedColor) {
        resetStyles(); // Reset previous styles before applying new ones
        lastAppliedColor = backgroundColor; // Update the last applied color

        // Apply new background color to specific elements
        document.querySelectorAll('.c-conversation-box-content-message-bubble--operator .c-conversation-box-content-message-bubble__wrapper').forEach(element => {
          element.style.backgroundColor = backgroundColor;
        });
        document.querySelectorAll('.c-conversation-box-content-message-bubble--operator .c-conversation-box-content-message-bubble__audio .c-conversation-box-content-message-bubble__progress').forEach(element => {
          element.style.backgroundColor = backgroundColor;
        });
        document.querySelectorAll('.c-conversation-menu-item__meta--draft .c-conversation-menu-item__meta-marker').forEach(element => {
          element.style.backgroundColor = backgroundColor;
        });
        document.querySelectorAll('.c-conversation-menu-item__meta--draft .c-conversation-menu-item__meta-label').forEach(element => {
          element.style.color = backgroundColor;
        });
        document.querySelectorAll('.c-conversation-menu-item--pending .c-conversation-menu-item__nickname, .c-conversation-menu-item--has-unread .c-conversation-menu-item__nickname').forEach(element => {
          element.style.color = backgroundColor;
        });
        document.querySelectorAll('.c-conversation-menu-item--pending:before').forEach(element => {
          element.style.backgroundColor = backgroundColor;
        });
        document.querySelectorAll('.c-new-conversation__participants-add, .c-new-conversation__participants-add-icon').forEach(element => {
          element.style.color = backgroundColor;
          element.style.stroke = backgroundColor;
        });
        document.querySelectorAll('.c-conversation-menu__button--new .c-base-button__icon').forEach(element => {
          element.style.color = backgroundColor;
          element.style.stroke = backgroundColor;
        });
        document.querySelectorAll('.c-sidebar-item--current:not(.c-sidebar-item--sub)>.c-sidebar-item__inner').forEach(element => {
          element.style.backgroundColor = backgroundColor;
        });
        document.querySelectorAll('.c-base-notification--blue').forEach(element => {
          element.style.backgroundColor = backgroundColor;
        });
        document.querySelectorAll('.c-base-button--blue').forEach(element => {
          element.style.backgroundColor = backgroundColor;
        });
        document.querySelectorAll('.c-base-tabs--blue .c-base-tabs__item--active .c-base-tabs__wrapper').forEach(element => {
          element.style.color = backgroundColor;
        });
        document.querySelectorAll('.c-field-token .c-field-token__field').forEach(element => {
          element.addEventListener('focus', () => {
            element.style.boxShadow = `inset 0 -1.5px 0 0 ${backgroundColor}`;
          });
          element.addEventListener('blur', () => {
            element.style.boxShadow = ''; // Reset shadow on blur
          });
        });
        document.querySelectorAll('.c-base-toast--info .c-base-toast__view').forEach(element => {
          element.style.color = backgroundColor;
        });
      }
    } else {
      // Reset styles if no matching condition
      resetStyles();
      lastAppliedColor = ''; // Clear last applied color
    }
  }
}

// Run changeBackgroundColor on DOMContentLoaded and with a MutationObserver
document.addEventListener('DOMContentLoaded', changeBackgroundColor);
const observer = new MutationObserver(() => {
  changeBackgroundColor();
});
observer.observe(document.body, {
  childList: true,
  subtree: true
});


// ..................