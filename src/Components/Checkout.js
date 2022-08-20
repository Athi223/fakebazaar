import { useState } from "react"
import { Outlet } from "react-router-dom"
import CheckoutProvider from "../Contexts/CheckoutContext"
import CheckoutInfo from "./CheckoutInfo"

export default function Checkout() {
	const [progress, setProgress] = useState("0%")

	return (
		<CheckoutProvider>
			<div className="p-4">
				<CheckoutInfo setProgress={setProgress} />
				<div className="progress my-4">
					<div
						className="progress-bar bg-info"
						role="progressbar"
						aria-label="Checkout progress"
						style={{ width: progress }}></div>
				</div>
				<Outlet />
			</div>
		</CheckoutProvider>
	)
}
