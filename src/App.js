import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import useCookie from "react-use-cookie"
import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import { AuthContext } from "./Contexts/AuthContext"
import { BootstrapContext } from "./Contexts/BootstrapContext"
import { StoreContext } from "./Contexts/StoreContext"
import { ShippingContext } from "./Contexts/ShippingContext"
import { PaymentContext } from "./Contexts/PaymentContext"
import bootstrap from "bootstrap/dist/js/bootstrap"
import Layout from "./Components/Layout"
import Home from "./Components/Home"
import Categories from "./Components/Categories"
import RequireAuth from "./Components/RequireAuth"
import Checkout from "./Components/Checkout"
import PreviewCart from "./Components/PreviewCart"
import ShippingDetails from "./Components/ShippingDetails"
import PaymentDetails from "./Components/PaymentDetails"
import Confirmation from "./Components/Confirmation"

export default function App() {
	const baseURL = "https://fakestoreapi.com"
	const [authToken, setAuthToken] = useCookie("authToken", "")
	const [products, setProducts] = useState([])
	const [selectedProduct, setSelectedProduct] = useState({})
	const [categories, setCategories] = useState([])
	const [cart, setCart] = useState([])
	const [shipping, setShipping] = useState({
		fullname: "",
		phonenumber: "",
		addressline1: "",
		addressline2: "",
		city: "",
		state: "",
		country: "",
		zip: "",
	})
	const [payment, setPayment] = useState({
		number: "",
		expiry: "",
		cvv: "",
		holdername: "",
	})

	useEffect(() => {
		fetch(`${baseURL}/products`)
			.then(response => response.json())
			.then(json => setProducts(json))
			.catch(error => console.log(error))

		fetch(`${baseURL}/products/categories`)
			.then(response => response.json())
			.then(json => setCategories(json))
			.catch(error => console.log(error))

		const toastElList = document.querySelectorAll(".toast")
		toastElList.forEach(toastEl => new bootstrap.Toast(toastEl, {}))
	}, [baseURL])

	return (
		<AuthContext.Provider value={{ authToken, setAuthToken, baseURL }}>
			<BootstrapContext.Provider value={{ bootstrap }}>
				<StoreContext.Provider
					value={{
						products,
						categories,
						cart,
						setCart,
						selectedProduct,
						setSelectedProduct,
					}}>
					<Routes>
						<Route path="/" element={<Layout />}>
							<Route index element={<Home />} />
							<Route path="categories" element={<Categories />} />

							<Route
								path="checkout"
								element={
									<RequireAuth>
										<Checkout />
									</RequireAuth>
								}>
								<Route index element={<PreviewCart />} />

								<Route
									path="shipping"
									element={
										<ShippingContext.Provider value={{ shipping, setShipping }}>
											<ShippingDetails />
										</ShippingContext.Provider>
									}
								/>

								<Route
									path="payment"
									element={
										<PaymentContext.Provider value={{ payment, setPayment }}>
											<PaymentDetails />
										</PaymentContext.Provider>
									}
								/>
								<Route path="confirmation" element={<Confirmation />} />
							</Route>
						</Route>
					</Routes>
				</StoreContext.Provider>
			</BootstrapContext.Provider>
		</AuthContext.Provider>
	)
}
