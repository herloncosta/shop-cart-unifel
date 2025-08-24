import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Login } from "./pages/login"
import { Catalog } from "./pages/catalog"
import { Product } from "./pages/product"
import { Cart } from "./pages/cart"
import { CartProvider } from "./context/cartContext"
import { Toaster } from "sonner"
import { Favorites } from "./pages/favorites"
import { Checkout } from "./pages/checkout"

export function App() {
	return (
		<CartProvider>
			<Router>
				<Routes>
					<Route path='*' element={<Catalog />} />
					<Route path='/' element={<Catalog />} />
					<Route path='/product/:id' element={<Product />} />
					<Route path='/login' element={<Login />} />
					<Route path='/cart' element={<Cart />} />
					<Route path='/favorites' element={<Favorites />} />
					<Route path='/checkout' element={<Checkout />} />
				</Routes>
			</Router>
			<Toaster />
		</CartProvider>
	)
}
