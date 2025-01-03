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
                const headers = ['Tanggal', 'Produk', 'Tujuan', 'SN', 'Reseller', 'Status', 'Harga', 'Modul Label', 'Actions'];
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
                    row.status || '',            // Status
                    row.kode_reseller || '',     // Kode Reseller
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

                  // Add "Report" button to the row
                  const reportButton = document.createElement('button');
                  reportButton.innerText = 'Report';
                  reportButton.style.margin = '4px';
                  reportButton.onclick = () => {
                    const message = `${encodeURIComponent(row.tgl_entri || '')} %20${encodeURIComponent(row.tujuan || '')} %20${encodeURIComponent(row.sn || '')} %20${encodeURIComponent(row.status || '')} %20${encodeURIComponent(row.kode_reseller || '')} %20${encodeURIComponent(row.kode_modul_label || '')}`;

                    fetch(`http://localhost:4040/send?message=${message}`)
                      .then(response => response.json())
                      .catch(error => {
                        console.error('Error sending report:', error)
                      });
                  };

                  const buttonCell = document.createElement('td');
                  buttonCell.style.border = '1px solid #ccc';
                  buttonCell.style.padding = '8px';
                  buttonCell.appendChild(reportButton);
                  tr.appendChild(buttonCell);

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
