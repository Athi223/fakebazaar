import { createContext, useState } from "react"
import RequireAuth from "../Components/RequireAuth"
import RequireCheckout from "../Components/RequireCheckout"

export const CheckoutContext = createContext()

export default function CheckoutProvider({ children }) {
	const [checkoutPath, setCheckoutPath] = useState("/checkout")
	const [checkoutButton, setCheckoutButton] = useState({ text: "", disabled: false })
	const [shipping, setShipping] = useState({
		fullname: "",
		phonenumber: "",
		addressline1: "",
		addressline2: "",
		city: "",
		state: "",
		country: "",
		zip: "",
		saveDetails: false,
	})
	const [payment, setPayment] = useState({
		cardnumber: "",
		expirydate: "",
		cvv: "",
	})

	return (
		<CheckoutContext.Provider
			value={{
				checkoutPath,
				setCheckoutPath,
				checkoutButton,
				setCheckoutButton,
				shipping,
				setShipping,
				payment,
				setPayment,
			}}>
			<RequireAuth>
				<RequireCheckout checkout={checkoutPath}>{children}</RequireCheckout>
			</RequireAuth>
		</CheckoutContext.Provider>
	)
}
