import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { StoreContext } from "../Contexts/StoreContext"

export default function PreviewCart() {
	const navigate = useNavigate()
	const { cart, setCart, products } = useContext(StoreContext)
	const removeFromCart = productId => setCart(_cart => _cart.filter((_, index) => index !== _cart.indexOf(productId)))

	return (
		<div className="container-fluid">
			{cart && cart.length ? (
				<div className="text-center">
					<div className="d-flex flex-row flex-nowrap overflow-auto">
						{cart.map((id, index) => (
							<div key={index} className="card text-center me-3 mb-3" style={{ minWidth: 300 }}>
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
											</>
										)}
									</h5>
									<button
										className="btn btn-sm btn-danger m-0"
										onClick={() => removeFromCart(products[id].id)}>
										Remove
									</button>
								</div>
							</div>
						))}
					</div>
					<button className="btn btn-warning mt-3" onClick={() => navigate("/checkout/shipping")}>
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
