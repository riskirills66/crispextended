chrome.contextMenus.create({
  id: "cektrx",
  title: "Cek Transaksi",
  contexts: ["selection"],  // You can adjust based on what you want to trigger the menu with
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "cektrx") {
    const dest = info.selectionText;  // This is the selected text, assumed to be the 'dest' (e.g., phone number)

    // Make sure we have a valid 'dest' value
    if (dest) {
      // Fetch transaction data from the server
      fetch(`http://localhost:8040/trx?dest=${dest}`)
        .then(response => response.json())
        .then(data => {
          // Send the fetched data to the content script
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: (data) => {
              // The displayModal function is defined here in the injected context
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
                const headers = ['Tanggal', 'Produk', 'Tujuan', 'SN', 'Reseller', 'Status', 'Harga', 'Modul', '', ''];
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

                  const rowData = [
                    row.tgl_entri || '',         // Tanggal
                    row.kode_produk || '',       // Kode Produk
                    row.tujuan || '',            // Tujuan
                    row.sn || '',                // SN
                    row.kode_reseller || '',     // Reseller
                    row.status || '',            // Status
                    row.harga || '',             // Harga
                    row.kode_modul_label || ''   // Modul Label
                  ];

                  rowData.forEach(cellData => {
                    const td = document.createElement('td');
                    td.innerText = cellData;
                    td.style.border = '1px solid #ccc';
                    td.style.padding = '8px';
                    td.style.whiteSpace = 'nowrap';  // Prevent wrapping
                    td.style.overflow = 'hidden';    // Optionally hide overflowing content
                    td.style.textOverflow = 'ellipsis';  // Optionally add ellipsis for overflow
                    td.style.maxWidth = '300px';     // Set maximum width
                    tr.appendChild(td);
                  });

                  // Add "Report" button in its own column
                  const reportButton = document.createElement('button');
                  reportButton.innerText = '🚩';
                  reportButton.style.margin = '4px';
                  reportButton.style.background = 'transparent';  // Remove the background
                  reportButton.style.border = 'none';  // Remove the border
                  reportButton.style.padding = '0';  // Remove extra padding
                  reportButton.style.fontSize = '20px';  // Adjust the emoji size as needed
                  reportButton.onclick = () => {
                    const message = `${encodeURIComponent(row.tgl_entri || '')} %20${encodeURIComponent(row.tujuan || '')} %20${encodeURIComponent(row.sn || '')} %20${encodeURIComponent(row.status || '')} %20${encodeURIComponent(row.kode_reseller || '')} %20${encodeURIComponent(row.kode_modul_label || '')}`;

                    fetch(`http://localhost:4040/send?message=${message}`)
                      .then(response => response.json())
                      .catch(error => {
                        console.error('Error sending report:', error)
                      });
                  };

                  const reportCell = document.createElement('td');
                  reportCell.style.border = '1px solid #ccc';
                  reportCell.style.padding = '8px';
                  reportCell.appendChild(reportButton);
                  tr.appendChild(reportCell);

                  // Add "Copy" button in its own column
                  const copyButton = document.createElement('button');
                  copyButton.innerText = '📋';
                  copyButton.style.margin = '4px';
                  copyButton.style.background = 'transparent';  // Remove the background
                  copyButton.style.border = 'none';  // Remove the border
                  copyButton.style.padding = '0';  // Remove extra padding
                  copyButton.style.fontSize = '20px';  // Adjust the emoji size as needed
                  copyButton.onclick = () => {
                    const formattedText = `Tanggal: ${row.tgl_entri || ''}.\nKode: ${row.kode_produk || ''}.\nTujuan: ${row.tujuan || ''}.\nRef: ${row.sn || ''}.\nHarga: ${row.harga || ''}.\nStatus: ${row.status || ''}`;
                    navigator.clipboard.writeText(formattedText)
                      .catch(error => console.error('Error copying text:', error));
                  };

                  const copyCell = document.createElement('td');
                  copyCell.style.border = '1px solid #ccc';
                  copyCell.style.padding = '8px';
                  copyCell.appendChild(copyButton);
                  tr.appendChild(copyCell);

                  table.appendChild(tr);
                });

                modal.appendChild(table);

                // Create a close button
                const closeButton = document.createElement('button');
                closeButton.innerText = 'Close';
                closeButton.style.marginTop = '10px';
                closeButton.onclick = () => modal.remove();
                modal.appendChild(closeButton);

                // Listen for the "ESC" key to close the modal
                document.addEventListener('keydown', (event) => {
                  if (event.key === 'Escape') {
                    modal.remove();
                  }
                });

                document.body.appendChild(modal);
              }

              // Call displayModal with the fetched data
              displayModal(data);
            },
            args: [data],  // Pass the transaction data to the function
          });
        })
        .catch(error => {
          console.error('Error fetching transaction data:', error);
        });
    }
  }
});
