import { useContext, useEffect } from "react"
import { Calendar, CreditCard, Key } from "react-feather"
import { CheckoutContext } from "../Contexts/CheckoutContext"

export default function PaymentDetails() {
	const { setCheckoutButton, payment, setPayment } = useContext(CheckoutContext)

	useEffect(() => {
		setCheckoutButton(checkoutButton => {
			return {
				...checkoutButton,
				disabled:
					payment.cardnumber.length !== 19 || payment.expirydate.length !== 5 || payment.cvv.length !== 3,
			}
		})
	}, [setCheckoutButton, payment])

	return (
		<div className="container-fluid">
			<h3 className="text-center mb-4">Payment Details</h3>
			<div
				className="card border rounded shadow mx-auto text-bg-secondary bg-gradient"
				style={{ maxWidth: "25rem" }}>
				<div className="card-title">
					<div className="d-flex justify-content-center mt-3">
						<img
							alt="Visa"
							src="http://www.credit-card-logos.com/images/visa_credit-card-logos/visa_logo_2.gif"
							border="0"
						/>
						<img
							alt="MasterCard"
							className="mx-3"
							src="http://www.credit-card-logos.com/images/mastercard_credit-card-logos/mastercard_logo_4.gif"
							border="0"
						/>
						<img
							alt="AMEX"
							src="http://www.credit-card-logos.com/images/american_express_credit-card-logos/american_express_logo_1.gif"
							border="0"
						/>
					</div>
				</div>
				<div className="card-body">
					<label className="form-label required fw-semibold">Number</label>
					<div className="input-group mb-3">
						<span className="input-group-text">
							<CreditCard />
						</span>
						<input
							value={payment.cardnumber}
							onChange={e => setPayment({ ...payment, cardnumber: e.target.value })}
							onKeyUp={e => {
								if (e.target.value.length < 19) {
									e.target.value = e.target.value
										.replace(/[^\dA-Z]/g, "")
										.replace(/(.{4})/g, "$1-")
										.trim()
								}
								if (e.key === "Backspace" && e.target.value.endsWith("-")) {
									e.target.value = e.target.value.slice(0, -2)
								}
							}}
							minLength={19}
							maxLength={19}
							type="text"
							className="form-control"
							placeholder="Card Number"
							aria-label="Card Number"
							required
						/>
					</div>
					<label className="form-label fw-semibold">Expiry</label>
					<div className="input-group mb-3">
						<span className="input-group-text">
							<Calendar />
						</span>
						<input
							value={payment.expirydate}
							onChange={e => setPayment({ ...payment, expirydate: e.target.value })}
							onKeyUp={e => {
								if (e.target.value.length < 5) {
									e.target.value = e.target.value
										.replace(/[^\dA-Z]/g, "")
										.replace(/(.{2})/g, "$1/")
										.trim()
								}
								if (e.key === "Backspace" && e.target.value.endsWith("/")) {
									e.target.value = e.target.value.slice(0, -2)
								}
							}}
							minLength={5}
							maxLength={5}
							type="text"
							className="form-control"
							placeholder="MM/YY"
							aria-label="MM/YY"
							required
						/>
					</div>
					<label className="form-label fw-semibold">CVV</label>
					<div className="input-group">
						<span className="input-group-text">
							<Key />
						</span>
						<input
							value={payment.cvv}
							onChange={e => setPayment({ ...payment, cvv: e.target.value })}
							type="password"
							minLength={3}
							maxLength={3}
							className="form-control"
							placeholder="CVV"
							aria-label="CVV"
							id="cvv"
							required
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
