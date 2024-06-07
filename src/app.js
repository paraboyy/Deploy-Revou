// Variables
let currentPage = 0;
const pageSize = 10; // Jumlah data per halaman
let sortColumn = ''; // Kolom yang sedang diurutkan
let sortDirection = 'asc'; // Arah pengurutan (ascending atau descending)
const appDiv = document.getElementById('app');
let sampleData = [];
let filteredData = []; // Data setelah pencarian

// Function to fetch data
function fetchData() {
  fetch('../src/json/MainData.json') // Update this path to your JSON file
    .then(response => response.json())
    .then(data => {
      sampleData = data;
      filteredData = data; // Inisialisasi filteredData dengan data asli
      renderData(filteredData);
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Function to render table rows
function renderTableRows(data) {
  if (data.length === 0) {
    return `
      <tr>
        <td colspan="6" class="text-center">Data tidak ditemukan</td>
      </tr>
    `;
  }
  return data.map(item => `
    <tr>
      <td>${item.Order_ID}</td>
      <td>${item.Order_Date}</td>
      <td>${item.Customer_Name}</td>
      <td>${item.Product_Name}</td>
      <td>${item.Quantity}</td>
      <td>$${item.Sales}</td>
    </tr>
  `).join('');
}

function renderTableRowsCustomer(data) {
  if (data.length === 0) {
    return `
      <tr>
        <td colspan="2" class="text-center">Data tidak ditemukan</td>
      </tr>
    `;
  }
  return data.map(item => `
    <tr>
      <td>${item.Customer_Name}</td>
      <td>${item.City}</td>
    </tr>
  `).join('');
}

// Function to render pagination buttons
function renderPaginationButtons(currentPage, lastPage) {
  return `
    <button class="btn background mr-2 custom-border" onclick="previousPage()" ${currentPage === 0 ? 'disabled' : ''}>Halaman Sebelumnya</button>
    <button class="btn background custom-border" onclick="nextPage()" ${currentPage === lastPage ? 'disabled' : ''}>Halaman Berikutnya</button>
  `;
}

// Function to render data
function renderData(data) {
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  let sortedData = data.slice().sort(sortByColumn);
  if (sortDirection === 'desc') {
    sortedData.reverse();
  }
  const paginatedData = sortedData.slice(startIndex, endIndex);
  const tableHTML = `
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-2 shadow pt-3 pb-3 custom-border ml-2 mt-4" style="display: flex; flex-direction: column; justify-content: space-between; background-color: #FFD919">
          <ul class="nav nav-pills" style="display: block;">
            <li class="btn-display active p-2 custom-border mb-2" data-link="dashboard"><a href="../page/dashboard.html" class="text-dark">Dashboard</a></li>
            <li class="btn-pilihan active p-2 custom-border mb-2" data-link="tabledata"><a href="../page/table.html" class="text-white">Table Data</a></li>
          </ul>
          <button type="button" class="btn btn-login btn-block custom-border">
            <a href="../index.html" class="text-dark">LogOut</a>
          </button>
        </div>
        <div class="mt-4 container shadow pt-4 pb-4 background custom-border">
          <div class="container shadow-lg pt-4 pb-4 mb-4 background-table custom-border">
            <div class="col-md">
              <div class="search-bar row mb-4">
                <input type="text" class="form-control w-50" id="search-input" placeholder="Search...">
                <button class="btn btn-warning ml-2 text-dark" id="search-button">Search</button>
              </div>
              <div class="table-bordered">
                <div class="card-header">
                  Daftar Order Pelanggan
                </div>
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col" onclick="toggleSort('Order_ID')">ID Order</th>
                      <th scope="col" onclick="toggleSort('Order_Date')">Tanggal</th>
                      <th scope="col" onclick="toggleSort('Customer_Name')">Nama Customer</th>
                      <th scope="col">Nama Produk</th>
                      <th scope="col" onclick="toggleSort('Quantity')">Jumlah</th>
                      <th scope="col" onclick="toggleSort('Sales')">Harga</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${renderTableRows(paginatedData)}
                  </tbody>
                </table>
              </div>
              <div class="d-flex justify-content-center mt-3">
                ${renderPaginationButtons(currentPage, Math.ceil(data.length / pageSize) - 1)}
              </div>
            </div>
          </div>
          <div class="container shadow-lg pt-4 pb-4 background-table custom-border">
            <div class="col-md">
              <div class="table-bordered">
                <div class="card-header">
                  Data Lokasi Pelanggan
                </div>
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Nama Customer</th>
                      <th scope="col">Kota</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${renderTableRowsCustomer(paginatedData)}
                  </tbody>
                </table>
              </div>
              <div class="d-flex justify-content-center mt-3">
                ${renderPaginationButtons(currentPage, Math.ceil(data.length / pageSize) - 1)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  appDiv.innerHTML = tableHTML;
  document.getElementById('search-button').addEventListener('click', searchButtonClick);
}

// Function to handle sorting
function sortByColumn(a, b) {
  if (sortDirection === 'asc') {
    if (a[sortColumn] < b[sortColumn]) return -1;
    if (a[sortColumn] > b[sortColumn]) return 1;
    return 0;
  } else {
    if (a[sortColumn] < b[sortColumn]) return 1;
    if (a[sortColumn] > b[sortColumn]) return -1;
    return 0;
  }
}

// Function to toggle sorting direction
function toggleSort(column) {
  if (sortColumn === column) {
    sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    sortColumn = column;
    sortDirection = 'asc';
  }
  renderData(filteredData);
}

// Function for pagination
function previousPage() {
  if (currentPage > 0) {
    currentPage--;
    renderData(filteredData);
  }
}

function nextPage() {
  const lastPage = Math.ceil(filteredData.length / pageSize) - 1;
  if (currentPage < lastPage) {
    currentPage++;
    renderData(filteredData);
  }
}

// Function for search
function searchButtonClick() {
  const query = document.getElementById('search-input').value.toLowerCase();
  filteredData = sampleData.filter(item => 
    item.Order_ID.toLowerCase().includes(query) ||
    item.Order_Date.toLowerCase().includes(query) ||
    item.Customer_Name.toLowerCase().includes(query) ||
    item.Product_Name.toLowerCase().includes(query) ||
    item.Quantity.toString().toLowerCase().includes(query) ||
    item.Sales.toString().toLowerCase().includes(query)
  );

  if (filteredData.length === 0) {
    Swal.fire({
          icon: "warning",
          text: "Data tidak ditemuka",
      });   
    // alert('Data tidak ditemukan');
  }

  currentPage = 0;
  renderData(filteredData);
}

// Initial data rendering
fetchData();
