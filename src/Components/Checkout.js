import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate, Outlet } from "react-router-dom"
import { StoreContext } from "../Contexts/StoreContext"

export default function Checkout() {
	const navigate = useNavigate()
	const { cart, products } = useContext(StoreContext)
	const [title, setTitle] = useState("")
	const [progress, setProgress] = useState("0%")
	const [amount, setAmount] = useState(0)
	const location = useLocation()

	useEffect(() => {
		setAmount(cart.reduce((acc, productId) => acc + products[productId].price, 0))
		switch (location.pathname) {
			case "/checkout":
				setTitle("Preview your Cart")
				setProgress("25%")
				break
			case "/checkout/shipping":
				setTitle("Shipping Details")
				setProgress("50%")
				break
			case "/checkout/payment":
				setTitle("Payment Details")
				setProgress("75%")
				break
			default:
				setTitle("Confirmation")
				setProgress("100%")
		}
	}, [location, cart, products])

	return (
		<div className="p-4">
			<div className="row">
				<div className="col-6 text-start">
					<h3 className="m-0">{title}</h3>
				</div>
				<div className="col-6 text-end">
					{location.pathname === "/checkout/confirmation" ? (
						<button className="btn btn-primary" onClick={() => navigate("/")}>
							Continue Shopping
						</button>
					) : (
						<h3 className="m-0">Total: ${amount}</h3>
					)}
				</div>
			</div>
			<div className="progress my-4">
				<div
					className="progress-bar bg-info"
					role="progressbar"
					aria-label="Checkout progress"
					style={{ width: progress }}></div>
			</div>
			<Outlet />
		</div>
	)
}
