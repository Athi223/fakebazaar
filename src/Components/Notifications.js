import { useContext } from "react"
import { StoreContext } from "../Contexts/StoreContext"

export default function Notification() {
	const { cart, products } = useContext(StoreContext)

	return (
		<div className="toast-container position-fixed bottom-0 end-0 p-3">
			<div id="addedToCart" className="toast text-bg-success" role="alert" aria-live="assertive" aria-atomic="true">
				<div className="toast-header">
					<strong className="me-auto text-success">Added to Cart</strong>
					<button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
				</div>
				<div className="toast-body">
					{cart.length ? <b>{products[cart[cart.length - 1]].title}</b> : null} was added to cart successfully!
				</div>
			</div>
		</div>
	)
}