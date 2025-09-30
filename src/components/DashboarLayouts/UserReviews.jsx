/* eslint-disable no-extra-boolean-cast */
import Loading from '../Loading';
import { useGetReviewByUserIdQuery } from '../../redux/features/reviews/reviewsApi'
import { useSelector, } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserReviews = () => {
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();
  
  // Use the `skip` option to prevent the query from running
    // if `user` or `user._id` is falsy.
    const { data, isLoading, error } = useGetReviewByUserIdQuery(user?._id, {
        skip: !user?._id,
    });
  console.log("Fetched reviews:", data);
  console.log("User ID:", user?._id);

  if (isLoading) return <Loading />;
  if (error) return <div>Failed to show Reviews!</div>;

  // const reviews = Array.isArray(data?.data) ? data.data : [];
  const reviews = data.data || [];
  console.log(reviews);

  const handleCardClick = () => {
    navigate("/shop");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Given Reviews</h1>

      {reviews.length === 0 && !isLoading && !error && (
        <p className="text-center text-gray-500">You havent reviewed any products yet.</p>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200 cursor-pointer hover:scale-105 transition-all duration-200"
          >
            <p className="text-lg font-semibold mb-2">Rating: {review.rating}</p>
            <p className="mb-2"><strong>Comment:</strong> {review.comment}</p>
            <p className="text-sm text-gray-600 mb-2"><strong>Product ID:</strong> {review.productId}</p>
            <p className="text-sm text-gray-500">
              <strong>Created At:</strong> {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : "N/A"}
            </p>
          </div>
        ))}

        <div
          className="bg-gray-100 text-black flex flex-col items-center justify-center rounded-lg p-6 border border-gray-200 cursor-pointer hover:bg-primary hover:text-white transition-all duration-200"
          onClick={handleCardClick}
        >
          <span className="text-3xl font-bold">+</span>
          <p className="ml-2 text-lg">Add New Review</p>
        </div>
      </div>
    </div>
  );
 
};

export default UserReviews;
