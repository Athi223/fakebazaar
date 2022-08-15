import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ShippingContext } from "../Contexts/ShippingContext"

export default function ShippingDetails() {
	const navigate = useNavigate()
	const { shipping, setShipping } = useContext(ShippingContext)
	const [disableButton, setDisableButton] = useState(true)

	useEffect(() => {
		setDisableButton(Object.values(shipping).some(value => value === ""))
	}, [shipping])

	return (
		<div className="container p-3 my-5 border rounded">
			<form>
				<div className="row">
					<div className="col-12 col-md-6 mb-3">
						<label htmlFor="fullname" className="form-label fw-bold">
							Full Name (First Name + Last Name)
						</label>
						<input
							type="text"
							id="fullname"
							className="form-control"
							placeholder="Full name"
							aria-label="Full name"
							value={shipping.fullname}
							onChange={e => setShipping({ ...shipping, fullname: e.target.value })}
							required
						/>
					</div>
					<div className="col-12 col-md-6 mb-3">
						<label htmlFor="phonenumber" className="form-label fw-bold">
							Phone Number (with Country Code)
						</label>
						<input
							type="number"
							id="phonenumber"
							minLength={10}
							maxLength={10}
							className="form-control"
							placeholder="Phone Number"
							aria-label="Phone Number"
							value={shipping.phonenumber}
							onChange={e => setShipping({ ...shipping, phonenumber: e.target.value })}
							required
						/>
					</div>
				</div>
				<div className="mb-3">
					<label htmlFor="address" className="form-label fw-bold">
						Shipping Address
					</label>
					<input
						type="text"
						className="form-control mb-2"
						id="address"
						placeholder="Address Line 1"
						aria-label="Shipping Address"
						value={shipping.addressline1}
						onChange={e => setShipping({ ...shipping, addressline1: e.target.value })}
						required
					/>
					<input
						type="text"
						className="form-control"
						placeholder="Address Line 2"
						aria-label="Shipping Address"
						value={shipping.addressline2}
						onChange={e => setShipping({ ...shipping, addressline2: e.target.value })}
						required
					/>
				</div>
				<div className="row">
					<div className="col-12 col-md-6 mb-3">
						<label htmlFor="zip" className="form-label fw-bold">
							ZIP
						</label>
						<input
							type="number"
							id="zip"
							className="form-control"
							placeholder="ZIP"
							aria-label="ZIP"
							value={shipping.zip}
							onChange={e => setShipping({ ...shipping, zip: e.target.value })}
							required
						/>
					</div>
					<div className="col-12 col-md-6 mb-3">
						<label htmlFor="city" className="form-label fw-bold">
							City
						</label>
						<input
							type="text"
							id="city"
							className="form-control"
							placeholder="City"
							aria-label="City"
							value={shipping.city}
							onChange={e => setShipping({ ...shipping, city: e.target.value })}
							required
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-12 col-md-6 mb-3">
						<label htmlFor="state" className="form-label fw-bold">
							State
						</label>
						<input
							type="text"
							id="state"
							className="form-control"
							placeholder="State"
							aria-label="State"
							value={shipping.state}
							onChange={e => setShipping({ ...shipping, state: e.target.value })}
							required
						/>
					</div>
					<div className="col-12 col-md-6 mb-3">
						<label htmlFor="country" className="form-label fw-bold">
							Country
						</label>
						<input
							type="text"
							id="country"
							className="form-control"
							placeholder="Country"
							aria-label="Country"
							value={shipping.country}
							onChange={e => setShipping({ ...shipping, country: e.target.value })}
							required
						/>
					</div>
				</div>
			</form>
			<div className="text-center">
				<button
					disabled={disableButton}
					className="btn btn-warning"
					onClick={() => navigate("/checkout/payment")}>
					Add Payment Details
				</button>
			</div>
		</div>
	)
}
