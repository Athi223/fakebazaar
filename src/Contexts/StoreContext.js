import { createContext } from "react"
import { useContext, useEffect, useState } from "react"
import { ref, child, get, set } from "firebase/database"
import { FirebaseContext } from "./FirebaseContext"
import { BootstrapContext } from "./BootstrapContext"

export const StoreContext = createContext({})

export default function StoreProvider({ children }) {
	const { user, database } = useContext(FirebaseContext)
	const { bootstrap } = useContext(BootstrapContext)
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
					console.warn("No data available")
				}
			})
			.catch(error => console.error(error))

		const toastElList = document.querySelectorAll(".toast")
		toastElList.forEach(toastEl => new bootstrap.Toast(toastEl, {}))
	}, [database, bootstrap])

	useEffect(() => {
		if (user) {
			const _user = JSON.parse(user)
			get(child(ref(database), `users/${_user.uid}/cart`))
				.then(snapshot => {
					if (snapshot.exists()) {
						setCart(snapshot.val())
					}
				})
				.catch(error => console.error(error))
		}
	}, [user, database])

	useEffect(() => {
		if (user) {
			const _user = JSON.parse(user)
			if (cart !== null) {
				set(child(ref(database), `users/${_user.uid}/cart/`), cart ?? [])
			}
		}
	}, [user, cart, database])

	return (
		<StoreContext.Provider
			value={{
				products,
				categories,
				cart,
				setCart,
				selectedProduct,
				setSelectedProduct,
			}}>
			{children}
		</StoreContext.Provider>
	)
}
