// import { useState, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import "./App.css";

// // Load your Stripe public key
// const stripePromise = loadStripe("your-publishable-key-here");

// const ProductDisplay = () => {
//   const handleCheckout = async () => {
//     const stripe = await stripePromise;
//     const response = await fetch("/create-checkout-session", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     const session = await response.json();

//     // Redirect to Stripe Checkout
//     const result = await stripe.redirectToCheckout({ sessionId: session.id });

//     if (result.error) {
//       console.error(result.error.message);
//     }
//   };

//   return (
//     <section>
//       <div className="product">
//         <img
//           src="https://i.imgur.com/EHyR2nP.png"
//           alt="The cover of Stubborn Attachments"
//         />
//         <div className="description">
//           <h3>Stubborn Attachments</h3>
//           <h5>$20.00</h5>
//         </div>
//       </div>
//       <button onClick={handleCheckout}>Checkout</button>
//     </section>
//   );
// };

// // eslint-disable-next-line react/prop-types
// const Message = ({ message }) => (
//   <section>
//     <p>{message}</p>
//   </section>
// );

// export default function App() {
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     // Check to see if this is a redirect back from Checkout
//     const query = new URLSearchParams(window.location.search);

//     if (query.get("success")) {
//       setMessage("Order placed! You will receive an email confirmation.");
//     }

//     if (query.get("canceled")) {
//       setMessage(
//         "Order canceled -- continue to shop around and checkout when you're ready."
//       );
//     }
//   }, []);

//   return (
//     <Elements stripe={stripePromise}>
//       {message ? <Message message={message} /> : <ProductDisplay />}
//     </Elements>
//   );
// }
