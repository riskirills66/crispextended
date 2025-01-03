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


// content.js

// You can add logic to handle messages or interactions with the page if needed
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'showModal' && request.data) {
    displayModal(request.data);
  }
});

function displayModal(data) {
  const modal = document.createElement('div');
  modal.id = 'transactionModal';
  modal.style.position = 'fixed';
  modal.style.top = '50%';
  modal.style.left = '50%';
  modal.style.transform = 'translate(-50%, -50%)';
  modal.style.backgroundColor = 'white';
  modal.style.padding = '20px';
  modal.style.zIndex = '9999';
  modal.style.borderRadius = '8px';
  modal.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
  
  const table = document.createElement('table');
  table.style.width = '100%';
  table.style.borderCollapse = 'collapse';
  
  // Define table headers and map the columns explicitly
  const headers = ['Tanggal', 'Kode Produk', 'Tujuan', 'Kode Reseller', 'Harga', 'Status', 'Modul Label'];
  const headerRow = document.createElement('tr');

  headers.forEach(headerText => {
    const th = document.createElement('th');
    th.innerText = headerText;
    th.style.border = '1px solid #ccc';
    th.style.padding = '8px';
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);
  
  // Loop through the data and make sure the values align with the headers
  data.forEach(row => {
    const tr = document.createElement('tr');

    // Correct mapping of the data
    const rowData = [
      row.tgl_entri || '',         // Tanggal (mapped to tgl_entri)
      row.kode_produk || '',       // Kode Produk (mapped to kode_produk)
      row.tujuan || '',            // Tujuan (mapped to tujuan)
      row.kode_reseller || '',     // Kode Reseller (mapped to kode_reseller)
      row.harga || '',             // Harga (mapped to harga)
      row.status || '',            // Status (mapped to status)
      row.kode_modul_label || ''   // Modul Label (mapped to kode_modul_label)
    ];

    rowData.forEach(cellData => {
      const td = document.createElement('td');
      td.innerText = cellData;
      td.style.border = '1px solid #ccc';
      td.style.padding = '8px';
      tr.appendChild(td);
    });

    table.appendChild(tr);
  });
  
  modal.appendChild(table);
  
  // Create a close button
  const closeButton = document.createElement('button');
  closeButton.innerText = 'Close';
  closeButton.style.marginTop = '10px';
  closeButton.onclick = () => modal.remove();
  modal.appendChild(closeButton);
  
  document.body.appendChild(modal);
}
