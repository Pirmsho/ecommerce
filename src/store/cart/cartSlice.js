import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  productsInCart: localStorage.getItem('cartItems') // check if there are items in localstorage
    ? JSON.parse(localStorage.getItem('cartItems')) // if there are, set state to those saved items
    : [], // otherwise === empty array
  totalQuantity: 0,
  totalAmount: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingIndex = state.productsInCart.findIndex(
        (product) => product.id === action.payload.id
      )

      if (existingIndex >= 0) {
        state.productsInCart[existingIndex] = {
          ...state.productsInCart[existingIndex],
          quantityInCart:
            state.productsInCart[existingIndex].quantityInCart + 1,
        }
      } else {
        let newCartItem = { ...action.payload, quantityInCart: 1 }
        state.productsInCart.push(newCartItem)
      }
      localStorage.setItem('cartItems', JSON.stringify(state.productsInCart))
    },
    decreaseCartQuantity(state, action) {
      const productIndex = state.productsInCart.findIndex(
        (product) => product.id === action.payload.id
      )
      if (state.productsInCart[productIndex].quantityInCart >= 1) {
        state.productsInCart[productIndex].quantityInCart -= 1
      } else if (state.productsInCart[productIndex].quantityInCart === 1) {
        const filteredProducts = state.productsInCart.filter(
          (product) => product.id !== action.payload.id
        )
        state.productsInCart = filteredProducts
      }
      localStorage.setItem('cartItems', JSON.stringify(state.productsInCart))
    },
    removeFromCart(state, action) {
      state.productsInCart.map((product) => {
        if (product.id === action.payload.id) {
          const filteredProducts = state.productsInCart.filter(
            (item) => item.id !== product.id
          )

          state.productsInCart = filteredProducts
        }
        localStorage.setItem('cartItems', JSON.stringify(state.productsInCart))
        return state
      })
    },
    getTotals(state) {
      let { total, quantity } = state.productsInCart.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem
          const itemTotal = price * cartQuantity
          console.log(price, cartQuantity)
          cartTotal.total += itemTotal
          cartTotal.quantity += cartQuantity

          return cartTotal
        },
        {
          total: 0,
          quantity: 0,
        }
      )
      total = parseFloat(total.toFixed(2))
      state.totalQuantity = quantity
      state.totalAmount = total
    },
  },
})

export const { addToCart, removeFromCart, decreaseCartQuantity, getTotals } =
  cartSlice.actions
export default cartSlice.reducer
