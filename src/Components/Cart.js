import { useContext } from "react"
import { AuthContext } from "../Contexts/AuthContext"
import { StoreContext } from "../Contexts/StoreContext"
import { useNavigate } from "react-router-dom"

export default function Cart() {
	const navigate = useNavigate()
	const { authToken } = useContext(AuthContext)
	const { cart, setCart, products } = useContext(StoreContext)
	const removeFromCart = productId => setCart(_cart => _cart.filter(id => id !== productId - 1))

	return (
		<div className="offcanvas offcanvas-end" tabIndex="-1" id="Cart" aria-labelledby="CartLabel">
			<div className="offcanvas-header">
				<h4 className="offcanvas-title" id="CartLabel">
					Your Cart
				</h4>
				<button className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
			</div>
			<div className="offcanvas-body">
				{cart.length ? (
					<div>
						<div className="d-grid">
							{authToken ? (
								<button
									className="btn btn-warning btn-block w-50 mx-auto"
									data-bs-dismiss="offcanvas"
									onClick={() => navigate("/checkout")}>
									Checkout
								</button>
							) : (
								<button
									className="btn btn-warning btn-block w-50 mx-auto"
									data-bs-toggle="modal"
									data-bs-target="#authenticateModal">
									Login to Checkout
								</button>
							)}
						</div>
						{cart.map((id, index) => (
							<div key={index} className="card text-center w-75 mx-auto mt-3">
								<img
									src={products[id].image}
									className="p-2 mx-auto"
									width={150}
									height={150}
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
				) : (
					<h5>Your cart is empty</h5>
				)}
			</div>
		</div>
	)
}
