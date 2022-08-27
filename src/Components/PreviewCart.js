import { useContext } from "react"
import { StoreContext } from "../Contexts/StoreContext"

export default function PreviewCart() {
	const { cart, setCart, products } = useContext(StoreContext)
	const removeFromCart = productId => setCart(_cart => _cart.filter((_, index) => index !== _cart.indexOf(productId)))

	return (
		<div className="container-fluid">
			{cart?.length ? (
				<div className="border rounded p-3">
					<div className="row mb-3">
						<h4 className="col-12 col-md-6">
							Total items: <span className="text-primary">{cart?.length}</span>
						</h4>
						<h4 className="col-12 col-md-6 text-md-end">
							Total Savings: ₹
							<span className="text-success">
								{cart.reduce(
									(total, id) => products[id].market_price - products[id].sale_price + total,
									0
								)}
							</span>
						</h4>
					</div>
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
									<button
										className="btn btn-sm btn-danger m-0"
										onClick={() => removeFromCart(products[id].id)}>
										Remove
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			) : (
				<div className="container-fluid">
					<h3 className="text-center">Your cart is empty!</h3>
				</div>
			)}
		</div>
	)
}
