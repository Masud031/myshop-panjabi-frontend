/* eslint-disable react/prop-types */

import { Pie, Line } from "react-chartjs-2";
import 'chart.js/auto'
import { useMemo } from "react";

// eslint-disable-next-line react/prop-types
const AdminStatsChart = ({ stats }) => {

    const pieData = useMemo(() => ({
        labels: ['Total Orders', 'Total Products', 'Total Reviews', 'All Users'],
        datasets: [{
            label: 'Admin Stats',
            data: [
                stats?.totalOrders || 0,
                stats?.totalProducts || 0,
                stats?.totalReviews || 0,
                stats?.totalUsers || 0,
            ],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            borderWidth: 1,
        }]
    }), [stats]);

    // line charts data
    // const data = new Array(12).fill(0);
    // stats?.monthlyEarnings.forEach(entry => {
    //     data[entry.month - 1] = entry.earnings
    // })
    const data = new Array(12).fill(0);
stats?.monthlyEarnings?.forEach(entry => {
    if (entry?.month && entry?.earnings) {
        data[entry.month - 1] = entry.earnings;
    }
});



    const lineData = {
        labels: ["January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"],
        datasets: [
            {
                label: 'Monthly Earnings',
                data,
                fill: false,
                backgroundColor: '#36A2EB',
                borderColor: '#36A2EB',
                tension: 0.1
            }
        ] 
    }

    const options = {
        responsive: true, 
        maintainAspectRatio: false,
    }
    return (
        <div className='mt-12 space-y-8'>
            <h2 className="text-xl font-semibold mb-4">Admin Stats Overview</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* pie chart */}
                <div className='max-h-96 md:h-96 w-full'>
                    <Pie data={pieData} options={options} />
                </div>

                {/* line lhart */}
                <div className='max-h-96 md:h-96 w-full'>
                    <Line data={lineData} options={options}/>
                </div>
            </div>
        </div>
    )
}

export default AdminStatsChart