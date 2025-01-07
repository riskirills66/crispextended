chrome.contextMenus.create({
  id: "cektrx",
  title: "Cek Transaksi",
  contexts: ["selection"],
});

chrome.contextMenus.create({
  id: "cekdeposit",
  title: "Cek Deposit",
  contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "cektrx") {
    const dest = info.selectionText;
    if (dest) {
      fetch(`http://localhost:8040/trx?dest=${dest}`)
        .then(response => response.json())
        .then(data => {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: (data) => {
              // Helper function to format date
              function formatDate(dateString) {
                const regex = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.\d{3}Z/;
                const match = dateString.match(regex);
                if (match) {
                  return `${match[3]}-${match[2]}-${match[1]} ${match[4]}:${match[5]}:${match[6]}`;
                }
                return dateString; // In case the format doesn't match
              }

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
                table.style.color = 'black';
                table.style.backgroundColor = 'white';

                const headers = ['Tanggal', 'Produk', 'Tujuan', 'SN', 'Status', 'Reseller', 'Harga', 'Modul', '', ''];
                const headerRow = document.createElement('tr');

                headers.forEach(headerText => {
                  const th = document.createElement('th');
                  th.innerText = headerText;
                  th.style.border = '1px solid #ccc';
                  th.style.padding = '8px';
                  th.style.whiteSpace = 'nowrap';
                  th.style.overflow = 'hidden';
                  th.style.textOverflow = 'ellipsis';
                  th.style.color = 'black';
                  headerRow.appendChild(th);
                });
                table.appendChild(headerRow);

                data.forEach(row => {
                  const tr = document.createElement('tr');
                  tr.style.color = 'white';

                  const rowData = [
                    formatDate(row.tgl_entri) || '',
                    row.kode_produk || '',
                    row.tujuan || '',
                    row.sn || '',
                    row.status || '',
                    row.kode_reseller || '',
                    row.harga || '',
                    row.kode_modul_label || ''
                  ];

                  rowData.forEach(cellData => {
                    const td = document.createElement('td');
                    td.innerText = cellData;
                    td.style.border = '1px solid #ccc';
                    td.style.padding = '8px';
                    td.style.whiteSpace = 'nowrap';
                    td.style.overflow = 'hidden';
                    td.style.textOverflow = 'ellipsis';
                    td.style.maxWidth = '300px';
                    td.style.color = 'black';
                    tr.appendChild(td);
                  });

                  const reportButton = document.createElement('button');
                  reportButton.innerText = '🚩';
                  reportButton.style.margin = '4px';
                  reportButton.style.background = 'transparent';
                  reportButton.style.border = 'none';
                  reportButton.style.padding = '0';
                  reportButton.style.fontSize = '20px';
                  reportButton.onclick = () => {
                    const message = `${formatDate(row.tgl_entri || '')} %20${encodeURIComponent(row.tujuan || '')} %20${encodeURIComponent(row.sn || '')} %20${encodeURIComponent(row.status || '')} %20${encodeURIComponent(row.kode_reseller || '')} %20${encodeURIComponent(row.kode_modul_label || '')}`;
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

                  const copyButton = document.createElement('button');
                  copyButton.innerText = '📋';
                  copyButton.style.margin = '4px';
                  copyButton.style.background = 'transparent';
                  copyButton.style.border = 'none';
                  copyButton.style.padding = '0';
                  copyButton.style.fontSize = '20px';
                  copyButton.onclick = () => {
                    const formattedText = `Tanggal: ${formatDate(row.tgl_entri) || ''}.
Kode: ${row.kode_produk || ''}.
Tujuan: ${row.tujuan || ''}.
Ref: ${row.sn || ''}.
Harga: ${row.harga || ''}.
Status: ${row.status || ''}`;
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

                const closeButton = document.createElement('button');
                closeButton.innerText = 'Close';
                closeButton.style.marginTop = '10px';
                closeButton.onclick = () => modal.remove();
                modal.appendChild(closeButton);

                document.addEventListener('keydown', (event) => {
                  if (event.key === 'Escape') {
                    modal.remove();
                  }
                });

                document.addEventListener('click', (event) => {
                  if (!modal.contains(event.target) && event.target !== closeButton) {
                    modal.remove();
                  }
                });

                document.body.appendChild(modal);
              }

              displayModal(data);
            },
            args: [data],
          });
        })
        .catch(error => {
          console.error('Error fetching transaction data:', error);
        });
    }
  } else if (info.menuItemId === "cekdeposit") {
    const identifier = info.selectionText;
    if (identifier) {
      fetch(`http://localhost:8040/deposit?identifier=${identifier}`)
        .then(response => response.json())
        .then(data => {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: (data) => {
              // Helper function to format date
              function formatDate(dateString) {
                const regex = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.\d{3}Z/;
                const match = dateString.match(regex);
                if (match) {
                  return `${match[3]}-${match[2]}-${match[1]} ${match[4]}:${match[5]}:${match[6]}`;
                }
                return dateString; // In case the format doesn't match
              }

              function displayModal(data) {
                const modal = document.createElement('div');
                modal.id = 'depositModal';
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
                table.style.color = 'black';
                table.style.backgroundColor = 'white';

                const headers = ['Tanggal', 'Reseller', 'Jumlah', 'Status', 'Update', ''];
                const headerRow = document.createElement('tr');

                headers.forEach(headerText => {
                  const th = document.createElement('th');
                  th.innerText = headerText;
                  th.style.border = '1px solid #ccc';
                  th.style.padding = '8px';
                  th.style.whiteSpace = 'nowrap';
                  th.style.overflow = 'hidden';
                  th.style.textOverflow = 'ellipsis';
                  th.style.color = 'black';
                  headerRow.appendChild(th);
                });
                table.appendChild(headerRow);

                data.forEach(row => {
                  const tr = document.createElement('tr');
                  tr.style.color = 'white';

                  const rowData = [
                    formatDate(row.waktu) || '',
                    row.kode_reseller || '',
                    row.jumlah || '',
                    row.status || '',
                    formatDate(row.tgl_status) || ''
                  ];

                  rowData.forEach(cellData => {
                    const td = document.createElement('td');
                    td.innerText = cellData;
                    td.style.border = '1px solid #ccc';
                    td.style.padding = '8px';
                    td.style.whiteSpace = 'nowrap';
                    td.style.overflow = 'hidden';
                    td.style.textOverflow = 'ellipsis';
                    tr.appendChild(td);
                  });

                  const copyButton = document.createElement('button');
                  copyButton.innerText = '📋';
                  copyButton.style.margin = '4px';
                  copyButton.style.background = 'transparent';
                  copyButton.style.border = 'none';
                  copyButton.style.padding = '0';
                  copyButton.style.fontSize = '20px';
                  copyButton.onclick = () => {
                    const formattedText = `Tanggal: ${formatDate(row.waktu) || ''}.
Reseller: ${row.kode_reseller || ''}.
Jumlah: ${row.jumlah || ''}.
Status: ${row.status || ''}.
Update: ${formatDate(row.tgl_status) || ''}`;
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

                const closeButton = document.createElement('button');
                closeButton.innerText = 'Close';
                closeButton.className = 'button-29';
                closeButton.style.marginTop = '10px';
                closeButton.onclick = () => modal.remove();
                modal.appendChild(closeButton);

                document.addEventListener('keydown', (event) => {
                  if (event.key === 'Escape') {
                    modal.remove();
                  }
                });

                document.addEventListener('click', (event) => {
                  if (!modal.contains(event.target) && event.target !== closeButton) {
                    modal.remove();
                  }
                });

                document.body.appendChild(modal);
              }

              displayModal(data);
            },
            args: [data],
          });
        })
        .catch(error => {
          console.error('Error fetching deposit data:', error);
        });
    }
  }
});
