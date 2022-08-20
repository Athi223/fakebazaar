import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import useCookie from "react-use-cookie"
import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import { FirebaseContext } from "./Contexts/FirebaseContext"
import { BootstrapContext } from "./Contexts/BootstrapContext"
import { StoreContext } from "./Contexts/StoreContext"
import bootstrap from "bootstrap/dist/js/bootstrap"
import Layout from "./Components/Layout"
import Home from "./Components/Home"
import Categories from "./Components/Categories"
import Checkout from "./Components/Checkout"
import PreviewCart from "./Components/PreviewCart"
import ShippingDetails from "./Components/ShippingDetails"
import PaymentDetails from "./Components/PaymentDetails"
import Confirmation from "./Components/Confirmation"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
import { getDatabase, ref, child, get, set } from "firebase/database"
import Orders from "./Components/Orders"
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCiTm4GF9uFclQKhW20PS_t3BHN8knBIp8",
	authDomain: "fakebazaar-42069.firebaseapp.com",
	databaseURL: "https://fakebazaar-42069-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "fakebazaar-42069",
	storageBucket: "fakebazaar-42069.appspot.com",
	messagingSenderId: "410714308136",
	appId: "1:410714308136:web:0257bfcb6ca1926ec83f1d",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

export default function App() {
	// TODO: remove fakestoreapi usage completely
	const [user, setUser] = useCookie("user", "")
	const [products, setProducts] = useState([])
	const [selectedProduct, setSelectedProduct] = useState({})
	const [categories, setCategories] = useState([])
	const [cart, setCart] = useState(null)

	useEffect(() => {
		let categories = new Set()
		get(child(ref(database), "products/"))
			.then(snapshot => {
				if (snapshot.exists()) {
					const products = snapshot.val().map((product, index) => {
						categories.add(product.category)
						product.id = index
						return product
					})
					setProducts(products)
					setCategories([...categories])
				} else {
					console.log("No data available")
				}
			})
			.catch(error => {
				console.error(error)
			})

		const toastElList = document.querySelectorAll(".toast")
		toastElList.forEach(toastEl => new bootstrap.Toast(toastEl, {}))
	}, [])

	useEffect(() => {
		if (user) {
			const _user = JSON.parse(user)
			get(child(ref(database), `users/${_user.uid}/cart`))
				.then(snapshot => {
					if (snapshot.exists()) {
						setCart(snapshot.val())
					} else {
						console.log("Cart Empty")
					}
				})
				.catch(error => {
					console.error(error)
				})
		}
	}, [user])

	useEffect(() => {
		if (user) {
			const _user = JSON.parse(user)
			if (cart !== null) {
				set(child(ref(database), "users/" + _user.uid + "/cart/"), cart ?? [])
			}
		}
	}, [user, cart])

	return (
		<FirebaseContext.Provider value={{ user, setUser, database }}>
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

							<Route path="checkout" element={<Checkout />}>
								<Route index element={<PreviewCart />} />

								<Route path="shipping" element={<ShippingDetails />} />

								<Route path="payment" element={<PaymentDetails />} />
								<Route path="confirmation" element={<Confirmation />} />
							</Route>
							<Route path="orders" element={<Orders />} />
						</Route>
					</Routes>
				</StoreContext.Provider>
			</BootstrapContext.Provider>
		</FirebaseContext.Provider>
	)
}
