class Dashboard {
    constructor() {
        this.createCharts = this.createCharts.bind(this);
        this.data = {} ;
        this.dataSalesYear = {} ;
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
}

document.addEventListener('DOMContentLoaded', () => {
    const dashboard = new Dashboard();
    dashboard.mounted();
});