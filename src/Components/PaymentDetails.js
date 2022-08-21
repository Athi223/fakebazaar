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
					payment.cardnumber.length !== 16 || payment.expirydate.length !== 4 || payment.cvv.length !== 3,
			}
		})
	}, [setCheckoutButton, payment])

	return (
		<div className="container-fluid">
			<h3 className="text-center mb-4">Payment Details</h3>
			<div className="card border rounded shadow mx-auto" style={{ maxWidth: "25rem" }}>
				<div className="card-body">
					<label className="form-label required fw-semibold">Number</label>
					<div className="input-group mb-3">
						<span className="input-group-text">
							<CreditCard />
						</span>
						<input
							value={payment.cardnumber}
							onChange={e => setPayment({ ...payment, cardnumber: e.target.value })}
							minLength={16}
							maxLength={16}
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
							type="text"
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
