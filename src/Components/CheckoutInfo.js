import { useState, useContext, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { StoreContext } from "../Contexts/StoreContext"
import { CheckoutContext } from "../Contexts/CheckoutContext"
import { FirebaseContext } from "../Contexts/FirebaseContext"
import { BootstrapContext } from "../Contexts/BootstrapContext"
import { ref, child, get, push, set } from "firebase/database"

export default function CheckoutInfo({ setProgress }) {
	const navigate = useNavigate()
	const { cart, setCart, products } = useContext(StoreContext)
	const { payment, shipping, setCheckoutPath, checkoutButton, setCheckoutButton } = useContext(CheckoutContext)
	const { database, user } = useContext(FirebaseContext)
	const { bootstrap } = useContext(BootstrapContext)
	const [amount, setAmount] = useState(0)
	const location = useLocation()

	const checkout = () => {
		switch (location.pathname) {
			case "/checkout":
				setCheckoutPath(cart && cart.length ? "/checkout/shipping" : "/")
				break
			case "/checkout/shipping":
				setCheckoutPath("/checkout/payment")
				break
			case "/checkout/payment":
				get(child(ref(database), "cards/"))
					.then(snapshot => {
						const result = snapshot
							.val()
							.filter(
								card =>
									card.number === parseInt(payment.cardnumber) &&
									card.expiry === parseInt(payment.expirydate) &&
									card.cvv === parseInt(payment.cvv)
							)
						if (result.length > 0) {
							if (result[0].valid) {
								const checkoutResult = bootstrap.Toast.getInstance("#checkoutResult")
								checkoutResult.show()
								const _user = JSON.parse(user)
								let shippingDetails = { ...shipping }
								delete shippingDetails.saveDetails
								if (shipping.saveDetails) {
									set(child(ref(database), `users/${_user.uid}/shipping`), shippingDetails)
										.then(() => setCart([]))
										.catch(error => console.error(error))
									push(child(ref(database), `users/${_user.uid}/orders/`), {
										shipping: "default",
										products: cart ?? [],
										date: new Date().toLocaleDateString("en-GB"),
									})
										.then(() => setCart([]))
										.catch(error => console.error(error))
								} else {
									push(child(ref(database), `users/${_user.uid}/orders/`), {
										shipping: shippingDetails,
										products: cart ?? [],
										date: new Date().toLocaleDateString("en-GB"),
									})
										.then(() => setCart([]))
										.catch(error => console.error(error))
								}
								setCheckoutPath("/checkout/confirmation")
							} else {
								alert(result[0].reason)
							}
						} else {
							alert("Invalid Card Details")
						}
					})
					.catch(error => console.error(error))
				break
			default:
				navigate("/orders")
		}
	}

	useEffect(() => {
		setAmount(cart?.reduce((acc, productId) => acc + products[productId].sale_price, 0) || 0)
		switch (location.pathname) {
			case "/checkout":
				setCheckoutButton({
					text: cart?.length ? "Add Shipping Details" : "Continue Shopping",
					disabled: false,
				})
				setProgress("25%")
				break
			case "/checkout/shipping":
				setCheckoutButton({ text: "Add Payment Details", disabled: true })
				setProgress("50%")
				break
			case "/checkout/payment":
				setCheckoutButton({ text: "Make Payment", disabled: true })
				setProgress("75%")
				break
			case "/checkout/confirmation":
				setCheckoutButton({ text: "View Orders", disabled: false })
				setProgress("100%")
				break
			default:
				break
		}
	}, [location, cart, products, setCheckoutButton, setProgress])

	return (
		<div className="row">
			<div className="col-6 text-start">
				<h3 className="m-0">Total: ₹{amount && amount.toFixed(2)}</h3>
			</div>
			<div className="col-6 text-end">
				<button className="btn btn-warning" onClick={checkout} disabled={checkoutButton.disabled}>
					{checkoutButton.text}
				</button>
			</div>
		</div>
	)
}
