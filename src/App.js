import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { Routes, Route } from "react-router-dom"
import FirebaseProvider from "./Contexts/FirebaseContext"
import BootstrapProvider from "./Contexts/BootstrapContext"
import StoreProvider from "./Contexts/StoreContext"
import Layout from "./Components/Layout"
import Home from "./Components/Home"
import Categories from "./Components/Categories"
import Checkout from "./Components/Checkout"
import PreviewCart from "./Components/PreviewCart"
import ShippingDetails from "./Components/ShippingDetails"
import PaymentDetails from "./Components/PaymentDetails"
import Confirmation from "./Components/Confirmation"
import Orders from "./Components/Orders"
import RequireAuth from "./Components/RequireAuth"
import Search from "./Components/Search"

export default function App() {
	return (
		<FirebaseProvider>
			<BootstrapProvider>
				<StoreProvider>
					<Routes>
						<Route path="/" element={<Layout />}>
							<Route index element={<Home />} />
							<Route path="categories" element={<Categories />}>
								<Route path=":category" element={<Categories />} />
							</Route>
							<Route path="checkout" element={<Checkout />}>
								<Route index element={<PreviewCart />} />
								<Route path="shipping" element={<ShippingDetails />} />
								<Route path="payment" element={<PaymentDetails />} />
								<Route path="confirmation" element={<Confirmation />} />
							</Route>
							<Route
								path="orders"
								element={
									<RequireAuth>
										<Orders />
									</RequireAuth>
								}
							/>
							<Route path="search/:query" element={<Search />} />
						</Route>
					</Routes>
				</StoreProvider>
			</BootstrapProvider>
		</FirebaseProvider>
	)
}
