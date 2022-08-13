import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useEffect, useState } from 'react'
import { Routes, Route } from "react-router-dom"
import { AuthContext } from './Contexts/AuthContext'
import { BootstrapContext } from './Contexts/BootstrapContext'
import { StoreContext } from './Contexts/StoreContext'
import bootstrap from 'bootstrap/dist/js/bootstrap'
import Layout from './Components/Layout'
import Home from './Components/Home'
import Categories from './Components/Categories'


export default function App() {
	const baseURL = "https://fakestoreapi.com"
	const [ authToken, setAuthToken ] = useState("")
	const [ products, setProducts ] = useState([])
	const [ categories, setCategories ] = useState([])
	const [ cart, setCart ] = useState([])
	const viewProduct = (product) => console.log(product)

	useEffect(() => {
		fetch(`${baseURL}/products`)
		.then(response => response.json())
		.then(json => setProducts(json))
		.catch(error => console.log(error))

		fetch(`${baseURL}/products/categories`)
		.then(response => response.json())
		.then(json => setCategories(json))
		.catch(error => console.log(error))

		const toastElList = document.querySelectorAll('.toast')
		toastElList.forEach(toastEl => new bootstrap.Toast(toastEl, {}))
	}, [ baseURL ])

	return (
		<AuthContext.Provider value={{ authToken, setAuthToken, baseURL }}>
			<BootstrapContext.Provider value={{ bootstrap }}>
				<StoreContext.Provider value={{ products, categories, viewProduct, cart, setCart }}>
					<Routes>
						<Route path="/" element={<Layout />}>
							<Route index element={<Home />} />
							<Route path="categories" element={<Categories />} />
						</Route>
					</Routes>
				</StoreContext.Provider>
			</BootstrapContext.Provider>
		</AuthContext.Provider>
	)
}
