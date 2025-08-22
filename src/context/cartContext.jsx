import { createContext, useContext, useReducer } from "react"

const CartContext = createContext(undefined)

const cartReducer = (state, action) => {
	const existingItem = state.cartItems.find(
		(item) => item.id === action.payload.id,
	)

	switch (action.type) {
		case "ADD_TO_CART":
			if (existingItem) {
				return {
					cartItems: state.cartItems.map((item) =>
						item.id === action.payload.id
							? { ...item, quantity: item.quantity + 1 }
							: item,
					),
				}
			}
			return {
				cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
			}

		case "REMOVE_FROM_CART":
			return {
				cartItems: state.cartItems.filter((item) => item.id !== action.payload),
			}

		case "INCREASE_QUANTITY":
			return {
				cartItems: state.cartItems.map((item) =>
					item.id === action.payload
						? { ...item, quantity: item.quantity + 1 }
						: item,
				),
			}

		case "DECREASE_QUANTITY":
			return {
				cartItems: state.cartItems.map((item) =>
					item.id === action.payload
						? { ...item, quantity: Math.max(1, item.quantity - 1) }
						: item,
				),
			}

		case "CLEAR_CART":
			return {
				cartItems: [],
			}

		default:
			return state
	}
}

export const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, { cartItems: [] })

	const addToCart = (product) => {
		dispatch({ type: "ADD_TO_CART", payload: product })
	}

	const removeFromCart = (productId) => {
		dispatch({ type: "REMOVE_FROM_CART", payload: productId })
	}

	const increaseQuantity = (productId) => {
		dispatch({ type: "INCREASE_QUANTITY", payload: productId })
	}

	const decreaseQuantity = (productId) => {
		dispatch({ type: "DECREASE_QUANTITY", payload: productId })
	}

	const clearCart = () => {
		dispatch({ type: "CLEAR_CART" })
	}

	const cartTotal = state.cartItems.reduce(
		(total, item) => total + item.price * item.quantity,
		0,
	)

	const cartQuantity = state.cartItems.reduce(
		(total, item) => total + item.quantity,
		0,
	)

	return (
		<CartContext.Provider
			value={{
				cartItems: state.cartItems,
				addToCart,
				removeFromCart,
				increaseQuantity,
				decreaseQuantity,
				clearCart,
				cartTotal,
				cartQuantity,
				existingItem: (id) => state.cartItems.some((item) => item.id === id),
			}}
		>
			{children}
		</CartContext.Provider>
	)
}

export const useCart = () => {
	const context = useContext(CartContext)
	if (!context) {
		throw new Error("useCart must be used within a CartProvider")
	}
	return context
}
