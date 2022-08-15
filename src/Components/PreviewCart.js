import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { StoreContext } from "../Contexts/StoreContext"

export default function PreviewCart() {
	const navigate = useNavigate()
	const { cart, setCart, products } = useContext(StoreContext)
	const removeFromCart = productId => setCart(_cart => _cart.filter(id => id !== productId - 1))

	return (
		<div className="container-fluid">
			{cart.length ? (
				<div className="text-center">
					<div className="d-flex flex-row flex-nowrap overflow-auto">
						{cart.map((id, index) => (
							<div
								key={index}
								className="card text-center me-4 my-3"
								style={{ minWidth: "20vw", maxWidth: "20vw" }}>
								<img
									src={products[id].image}
									className="p-2 mx-auto"
									width={250}
									height={250}
									alt={products[id].title}
								/>
								<div className="card-body">
									<h6 className="card-title">{products[id].title}</h6>
								</div>
								<div className="card-footer d-flex justify-content-between">
									<h4 className="card-text">${products[id].price}</h4>
									<button
										className="btn btn-sm btn-danger m-0"
										onClick={() => removeFromCart(products[id].id)}>
										Remove
									</button>
								</div>
							</div>
						))}
					</div>
					<button className="btn btn-warning" onClick={() => navigate("/checkout/shipping")}>
						Add Shipping Details
					</button>
				</div>
			) : (
				<div className="text-center p-4">
					<h5 className="mb-3">Your cart is empty!</h5>
					<button className="btn btn-primary" onClick={() => navigate("/")}>
						Continue Shopping
					</button>
				</div>
			)}
		</div>
	)
}
