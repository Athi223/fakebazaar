import { useState, useContext, useEffect } from "react"
import { FirebaseContext } from "../Contexts/FirebaseContext"
import { StoreContext } from "../Contexts/StoreContext"
import { ref, child, get } from "firebase/database"

export default function Orders() {
	const { database, user } = useContext(FirebaseContext)
	const { products } = useContext(StoreContext)
	const [orders, setOrders] = useState(null)

	useEffect(() => {
		const _user = JSON.parse(user)
		get(child(ref(database), `users/${_user.uid}/orders/`))
			.then(snapshot => {
				if (snapshot.exists()) {
					setOrders(snapshot.val())
				}
			})
			.catch(error => console.error(error))
	}, [database, user])

	return (
		<div className="m-5">
			<h3 className="text-center mb-4">Orders</h3>
			{products.length && orders ? (
				Object.keys(orders).map((orderId, orderIndex) => (
					<div key={orderIndex} className="border rounded p-2">
						<div className="row">
							<div className="col-12 col-md-8 h4">
								OrderID: <span className="text-secondary">{orderId}</span>
							</div>
							<div className="col-12 col-md-4 text-md-end h4">
								Date: <span className="text-secondary">{orders[orderId].date}</span>
							</div>
						</div>
						<div className="d-flex flex-row flex-nowrap overflow-auto">
							{orders[orderId].products.map((id, index) => (
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
				))
			) : (
				<h3 className="text-center">No orders placed</h3>
			)}
		</div>
	)
}
