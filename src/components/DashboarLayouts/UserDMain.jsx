
import { useSelector } from 'react-redux';
 import { Bar } from "react-chartjs-2"

// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, plugins } from 'chart.js';
// import UserStats from './useStates';

import { useGetUserStatsQuery } from '../../redux/features/states/statesapi';
import UserStats from './userStates';
import Loading from '../loading';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const UserDMain = () => {
    const { user } = useSelector(state => state.auth);

  //  const identifier = user?.email || user?.mobile;
  const skip = !user?._id;
const { data: UserData, isLoading, error } = useGetUserStatsQuery(user?._id,{skip});
     console.log("User Object:", user); // Check what the user object looks like
   
   
       if (isLoading) return <Loading />
    if (error) return <div>Failed to fetch data</div>

    const stats = UserData?.data || {}
    console.log("User Stats:", stats);

    const { totalPayments, totalPurchadedProducts, totalReviews,purchaseInfo  } = stats;

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

             <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Your Purchase History</h2>

        {purchaseInfo && purchaseInfo.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {purchaseInfo.map((order) => (
              <div
                key={order._id}
                className="bg-white shadow-md rounded-lg p-5 border border-gray-200 hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold mb-2">{order.orderId}</h3>
                <p><strong>Total Price:</strong> ${order.totalPrice}</p>
                <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                <p><strong>Status:</strong> 
                  <span className={`ml-1 ${order.status === "pending" ? "text-yellow-600" : "text-green-600"}`}>
                    {order.status}
                  </span>
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No purchases found.</p>
        )}
      </div>
    </div>
    )
}

export default UserDMain