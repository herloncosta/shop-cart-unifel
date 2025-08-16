import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Login } from "./pages/login"
import { Catalog } from "./pages/catalog"
import { Product } from "./pages/product"
import { Cart } from "./pages/cart"

export function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Catalog />} />
				<Route path='/product/:id' element={<Product />} />
				<Route path='/login' element={<Login />} />
				<Route path='/cart' element={<Cart />} />
			</Routes>
		</Router>
	)
}
