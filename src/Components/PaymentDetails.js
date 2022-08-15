import { useState, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

import CheckoutForm from "./CheckoutForm"

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
	"pk_test_51LWxAiSJZv3p8EVz5xfRXLNDCy5Dbb1B3FPR67wIkaIQhxX7hh82tgDqu5j2PlVQzBN8SLAY9hysoVtMCK7NEu4c00YCmpvHgg"
)

export default function App() {
	const [clientSecret, setClientSecret] = useState("")

	useEffect(() => {
		// Create PaymentIntent as soon as the page loads
		fetch("http://localhost:4242/create-payment-intent", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				paymentMethodType: "card",
				currency: "usd",
			}),
		})
			.then(res => res.json())
			.then(data => setClientSecret(data.clientSecret))
	}, [])

	const appearance = {
		theme: "stripe",
	}
	const options = {
		clientSecret,
		appearance,
	}

	return (
		<div className="p-3 my-5 border rounded shadow mx-auto text-center" style={{ maxWidth: "30rem" }}>
			{clientSecret && (
				<Elements options={options} stripe={stripePromise} key={clientSecret}>
					<CheckoutForm />
				</Elements>
			)}
		</div>
	)
}
