import { createSlice } from '@reduxjs/toolkit'
import Swal from 'sweetalert2'

const initialState ={
    products: [],
    selectedItems: 0,
    totalPrice: 0
}

const calculateCartTotals = (products) => {
    const selectedItems = products.reduce((total, product) => total + product.quantity, 0);
    const totalPrice = products.reduce((total, product) => total + product.quantity * product.price , 0)

    return {selectedItems, totalPrice};
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
     addToCart: (state, action) => {
  const { _id, selectedSize } = action.payload;

  const isExist = state.products.find(
    product => product._id === _id && product.size === selectedSize
  );

  if (!isExist) {
    state.products.push({
      ...action.payload,
      quantity: 1,
      size: selectedSize || "Default Size",
    });

    // alert("Product added successfully!");
      Swal.fire({
                    title: 'Success!',
                    text: 'Product added successfully!',
                    icon: 'success',
                    confirmButtonText: 'Great!'
                });
  } else {
    Swal.fire({
      title: 'Error!',
      text: 'Product with this size already added to Cart. To add more, go to the cart page.',
      icon: 'error',
      confirmButtonText: "It's Ok"
    });
  }

  const totals = calculateCartTotals(state.products);
  state.selectedItems = totals.selectedItems;
  state.totalPrice = totals.totalPrice;
},



        // updateQuantity: (state, action) => {
        //     const product = state.products.find((item) => item._id === action.payload.id);
        
        //     if(product) {
        //         if(action.payload.type === "increament") {
        //             product.quantity += 1;
        //         } else if(action.payload.type === "decrement" && product.quantity > 1) {
        //             product.quantity -= 1;
        //         }
        //     }
        //     const totals = calculateCartTotals(state.products);
        //     state.selectedItems = totals.selectedItems;
        //     state.totalPrice = totals.totalPrice;
        // },
        updateQuantity: (state, action) => {
          const { id, type } = action.payload;
          const product = state.products.find(item => item._id === id);
          // const product = state.products.find(item => item._id === id && item.size === size);

          if (product) {
            if (type === "increment") {
              product.quantity += 1;
            } else if (type === "decrement" && product.quantity > 1) {
              product.quantity -= 1;
            }
          }

          const totals = calculateCartTotals(state.products);
          state.selectedItems = totals.selectedItems;
          state.totalPrice = totals.totalPrice;
        },

        // removeFromCart: (state, action) => {
        //     state.products = state.products.filter(product => product._id !== action.payload.id)
        //     const totals = calculateCartTotals(state.products);
        //     state.selectedItems = totals.selectedItems;
        //     state.totalPrice = totals.totalPrice;
        // },
        removeFromCart: (state, action) => {
            const { id, size } = action.payload;
            state.products = state.products.filter(product => !(product._id === id && product.size === size));
            
            const totals = calculateCartTotals(state.products);
            state.selectedItems = totals.selectedItems;
            state.totalPrice = totals.totalPrice;
          },

        clearCart: (state) => {
            Object.assign(state, initialState)

        }
    }
})

export const {addToCart, updateQuantity, removeFromCart, clearCart} = cartSlice.actions;
export default cartSlice.reducer;