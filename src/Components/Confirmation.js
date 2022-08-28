import { useState, useContext, useEffect } from "react"
import { FirebaseContext } from "../Contexts/FirebaseContext"
import { StoreContext } from "../Contexts/StoreContext"
import { ref, child, get, query, orderByKey, limitToLast } from "firebase/database"

export default function Confirmation() {
	const { database, user } = useContext(FirebaseContext)
	const { products } = useContext(StoreContext)
	const [confirmation, setConfirmation] = useState({
		orderId: "",
		products: [],
		date: "",
	})

	useEffect(() => {
		const _user = JSON.parse(user)
		get(query(child(ref(database), `users/${_user.uid}/orders/`), orderByKey(), limitToLast(1)))
			.then(snapshot => {
				if (snapshot.exists()) {
					const orderId = Object.keys(snapshot.val())[0]
					const confirmation = snapshot.val()[orderId]
					setConfirmation({
						orderId: orderId,
						products: confirmation.products,
						date: confirmation.date,
					})
				}
			})
			.catch(error => console.error(error))
	}, [database, user])

	return (
		<div className="container-fluid">
			<h3 className="text-center mb-4">Your order was placed successfully!</h3>
			{products.length && (
				<div className="border rounded p-2">
					<div className="row">
						<div className="col-12 col-md-8 h4">
							OrderID: <span className="text-secondary">{confirmation.orderId}</span>
						</div>
						<div className="col-12 col-md-4 text-md-end h4">
							Date: <span className="text-secondary">{confirmation.date}</span>
						</div>
					</div>
					<div className="d-flex flex-row flex-nowrap overflow-auto">
						{confirmation.products.map((id, index) => (
							<div key={index} className="card text-center me-3 my-3" style={{ minWidth: 300 }}>
								<img
									src={products[id].image_url.replace("/s/", "/m/").replace("/mm/", "/m/")}
									className="card-img-top"
									alt={products[id].title}
								/>
								<div className="card-body">
									<h6 className="card-title">{products[id].title}</h6>
								</div>
								<div className="card-footer d-flex justify-content-between">
									<h5 className="card-text">
										₹
										{products[id].market_price === products[id].sale_price ? (
											products[id].sale_price
										) : (
											<>
												<span className="text-decoration-line-through text-danger">
													{products[id].market_price}
												</span>
												<span className="text-success"> {products[id].sale_price} </span>
												<span className="text-secondary">
													(-
													{(
														((products[id].market_price - products[id].sale_price) /
															products[id].market_price) *
														100
													).toFixed(0)}
													%)
												</span>
											</>
										)}
									</h5>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
}
