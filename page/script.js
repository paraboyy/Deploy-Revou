class Dashboard {
    constructor() {
        this.createCharts = this.createCharts.bind(this);
        this.data = {
            totalCustomers: 1000,
            totalSales: 7500,
            totalQuantity: 1500,
            totalProfit: 3500
        };
    }

    mounted = () => {
        this.updateData();
        this.createCharts();
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
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Segment A', 'Segment B', 'Segment C', 'Segment D', 'Segment E'],
                    datasets: [{
                        label: 'Sales',
                        data: [200, 300, 400, 500, 600],
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
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['01-2019', '02-2019', '03-2019', '04-2019', '05-2019', '06-2019',
                             '07-2019', '08-2019', '09-2019', '10-2019', '11-2019', '12-2019',
                             '01-2020', '02-2020', '03-2020', '04-2020', '05-2020', '06-2020',
                             '07-2020', '08-2020', '09-2020', '10-2020', '11-2020', '12-2020',
                ],
                    datasets: [{
                        label: 'Sales',
                        data: [1800, 1500, 2000, 1800, 2100, 1800,
                               1800, 1000, 2800, 1100, 2000, 1800,
                               1500, 1300, 2000, 1800, 2400, 2100,
                               2000, 1700, 2000, 1800, 2200, 2100
                        ],
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
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Mode A', 'Mode B', 'Mode C', 'Mode D', 'Mode E'],
                    datasets: [{
                        label: 'Sales',
                        data: [300, 400, 500, 600, 700],
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