document.addEventListener('DOMContentLoaded', async () => {
    const apiUrl = '../src/json/MainData.json';

    async function fetchDataTable() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    }

    function populateTable(data, pageNumber, pageSize) {
        const tableBody = document.querySelector('#data-table tbody');
        tableBody.innerHTML = ''; // Clear previous data
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const pageData = data.slice(startIndex, endIndex);
        data.forEach(item => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${item.Row_ID}</td>
                <td>${item.Order_ID}</td>
                <td>${item.Order_Date}</td>
                <td>${item.Ship_Date}</td>
                <td>${item.Ship_Mode}</td>
                <td>${item.Customer_ID}</td>
                <td>${item.Customer_Name}</td>
                <td>${item.Segment}</td>
                <td>${item.Country}</td>
                <td>${item.City}</td>
                <td>${item.State}</td>
                <td>${item.Postal_Code}</td>
                <td>${item.Region}</td>
                <td>${item.Product_ID}</td>
                <td>${item.Category}</td>
                <td>${item.Sub_Category}</td>
                <td>${item.Product_Name}</td>
                <td>${item.Quantity}</td>
                <td>${item.Sales}</td>
                <td>${item.Discount}</td>
                <td>${item.Profit}</td>
            `;

            tableBody.appendChild(row);
        });
    }

    document.addEventListener('DOMContentLoaded', async () => {
        const mainDataUrl = '../src/json/MainData.json';
        const pageSize = 10;
        let currentPage = 1;
        let data = [];

        async function fetchData() {
            data = await fetchDataTable(mainDataUrl);
            if (data) {
                populateTable(data, currentPage, pageSize);
                renderPagination();
            }
        }

        function renderPagination() {
            const totalPages = Math.ceil(data.length / pageSize);
            const paginationContainer = document.querySelector('#pagination');
            paginationContainer.innerHTML = '';

            const prevButton = document.createElement('button');
            prevButton.textContent = 'Previous';
            prevButton.disabled = currentPage === 1;
            prevButton.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    populateTable(data, currentPage, pageSize);
                    renderPagination();
                }
            });
            paginationContainer.appendChild(prevButton);

            for (let i = 1; i <= totalPages; i++) {
                const pageButton = document.createElement('button');
                pageButton.textContent = i;
                pageButton.disabled = i === currentPage;
                pageButton.addEventListener('click', () => {
                    currentPage = i;
                    populateTable(data, currentPage, pageSize);
                    renderPagination();
                });
                paginationContainer.appendChild(pageButton);
            }

            const nextButton = document.createElement('button');
            nextButton.textContent = 'Next';
            nextButton.disabled = currentPage === totalPages;
            nextButton.addEventListener('click', () => {
                if (currentPage < totalPages) {
                    currentPage++;
                    populateTable(data, currentPage, pageSize);
                    renderPagination();
                }
            });
            paginationContainer.appendChild(nextButton);
        }

        await fetchData();
    });

    const data = await fetchDataTable();
    populateTable(data);
});


class Dashboard {
    constructor() {
        this.createCharts = this.createCharts.bind(this);
        this.data = {} ;
        this.dataSalesYear = {} ;
        this.dataSalesMonth = {} ;
        this.dataSihpmode = {} ;
        this.dataSegment = {} ;
    }

    mounted = () => {
        this.fetchData().then(() => {
            this.updateData();
            this.createCharts();
        })
    }

    async fetchData() {
        try {
            const response = await fetch('../src/json/SalesYear.json');
            this.dataSalesYear = await response.json();
            const responseMonth = await fetch('../src/json/SalesMont.json');
            this.dataSalesMonth = await responseMonth.json();
            const response2 = await fetch('../src/json/TotalData.json');
            this.data = await response2.json();
            const responseshipmode = await fetch('../src/json/ShipmodeData.json');
            this.dataSihpmode = await responseshipmode.json();
            const responseSegment = await fetch('../src/json/SegmentData.json');
            this.dataSegment = await responseSegment.json();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async fetchDataTable() {
        try {
            const response = await fetch('../src/json/MainData.json');
            this.dataTable = await response.json();
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    updateData() {
        document.getElementById('totalCustomers').innerText = this.data.totalCustomers;
        document.getElementById('totalSales').innerText = this.data.totalSales;
        document.getElementById('totalQuantity').innerText = this.data.totalQuantity;
        document.getElementById('totalProfit').innerText = this.data.totalProfit;
    }

    createCharts = () => {
        this.createSalesChartPerSegment();
        this.createSalesChartPerYear();
        this.createSalesChartByShipmode();
        this.createSalesChartPerMonth();
        this.createSalesChartByCategory();
        this.createSalesChartByRegion();
    }

    // Create chart for total sales per segment
        createSalesChartPerSegment() {
            const ctx = document.getElementById('chart-sales-per-segment').getContext('2d');
            const labels = this.dataSegment.map(item => item.Segment);
            const salesData = this.dataSegment.map(item => item.total_sales);
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Sales',
                        data: salesData,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(67, 67, 67, 0.5)',
                            'rgba(255, 206, 86, 0.5)',
                            'rgba(153, 102, 255, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(67, 67, 67, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(153, 102, 255, 1)',
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        }
    // Create chart for total sales per year
        createSalesChartPerYear() {
            const ctx = document.getElementById('chart-sales-per-year').getContext('2d');
            const labels = this.dataSalesYear.total_sales_per_year.map(item => item.year);
            const salesData = this.dataSalesYear.total_sales_per_year.map(item => item.total_sales);
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Sales',
                        data: salesData,
                        backgroundColor: 'rgba(67, 67, 67, 0.5)',
                        borderColor: 'rgba(67, 67, 67, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        }
        createSalesChartByCategory() {
            const ctx = document.getElementById('chart-sales-category').getContext('2d');
            const data = {
                labels: ['Technology', 'Office Supplies', 'Furniture'],
                datasets: [{
                    data: [38, 32.1, 29.9],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)'
                    ],
                    borderWidth: 1
                }]
            };
            const config = {
                type: 'pie',
                data: data,
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            callbacks: {
                                label: function(tooltipItem) {
                                    return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                                }
                            }
                        }
                    }
                },
            };
            new Chart(ctx, config);
        }
        // Create chart for total sales by shipmode
        createSalesChartByShipmode(){
            const ctx = document.getElementById('chart-sales-shipmode').getContext('2d');
            const labels = this.dataSihpmode.map(item => item.Ship_Mode);
            const salesData = this.dataSihpmode.map(item => item.total_sales);
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Sales',
                        data: salesData,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(153, 102, 255, 0.5)',
                            'rgba(67, 67, 67, 0.5)',
                            'rgba(255, 206, 86, 0.5)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(67, 67, 67, 1)',
                            'rgba(255, 206, 86, 1)',
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        }
        createSalesChartByRegion() {
            const ctx = document.getElementById('chart-sales-region').getContext('2d');
            const labels = ['West', 'South', 'East', 'Central']; // Define labels

            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Sales by Region', 
                        data: [725.457, 391.721, 678.781, 501.239,],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(153, 102, 255, 0.5)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(153, 102, 255, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        }
        // Create chart for total sales per month
        createSalesChartPerMonth() {
        // const yearSelector = document.getElementById('year-selector');
        // const year = yearSelector.value;
        const ctx = document.getElementById('chart-sales-per-month').getContext('2d');
        // const year = "2017";
        const years = Object.keys(this.dataSalesMonth);
        const labels = this.dataSalesMonth["2014"].map(item => item.month);
        const datasets = years.map(year => {
            return {
                label: `Sales ${year}`,
                data: this.dataSalesMonth[year].map(item => item.total_sales),
                backgroundColor: getRandomColor(),
                borderColor: getRandomColor(),
                borderWidth: 1,
                fill: false
            };
        });
        const config = {
            type: 'line',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };
        new Chart(ctx, config);

        function getRandomColor() {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const dashboard = new Dashboard();
    dashboard.mounted();

    document.getElementById('year-selector').addEventListener('change', () => {
        this.createSalesChartPerMonth();
    });
});
