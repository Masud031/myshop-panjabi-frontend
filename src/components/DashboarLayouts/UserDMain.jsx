
import { useSelector } from 'react-redux';
 import { Bar } from "react-chartjs-2"

// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, plugins } from 'chart.js';
import UserStats from './useStates';
import Loading from '../Loading';
import { useGetUserStatsQuery } from '../../redux/features/states/statesapi';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const UserDMain = () => {
    const { user } = useSelector(state => state.auth);
  
    const { data: UserData, isLoading, error } = useGetUserStatsQuery(user?.email);
    console.log("API Response Data:", UserData);
   
    // const { data: UserData, isLoading, error } = useGetUserStatsQuery(user?.email, {
    //     skip: !user?.email,  // Skip the query if email is not available
    // });
    // if (!user?.email) {
    //     return <p>Loading user...</p>;
    // }

    // if (isLoading) {
    //     return <Loading />;
    // }
    // if (error) {
    //     return <p>Error loading user data.</p>;
    // }
    // if (!UserData) {
    //     return <p>No user data available.</p>;
    // }


    if (isLoading) return <Loading />
    if (error) return <div>Failed to fetch data</div>
    const stats = UserData?.data || {}
    console.log("User Stats:", stats);

    const { totalPayments, totalPurchadedProducts, totalReviews } = stats;

    const data = {
        labels: ['Total Payment', 'Total Reviews', 'Total Purchased Products'],
        datasets: [
            {
                label: 'User Stats',
                data: [totalPayments, totalReviews * 10, totalPurchadedProducts * 10],
                backgroundColor: ['rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',],
                borderColor: ['rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',],
                borderWidth: 1
            }
        ]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        if (tooltipItem.label === 'Total Payments') {
                            return `Total Payments: $${tooltipItem.raw.toFixed(2)}`;
                        }
                        return `${tooltipItem.label}: ${tooltipItem.raw}`;
                    },
                },
            }
        }
    }

    return (
        <div className='p-6'>
            <div>
                <h1 className='text-2xl font-semibold mb-4'>User Dashboard</h1>
                <p className='text-gray-500'>Hi, {user?.username}! Welcome to your user dashboard.</p>
            </div>
            
            <UserStats stats={stats} />

            <div className='mb-6'>
                <Bar data={data} options={options} />
            </div>
        </div>
    )
}

export default UserDMain