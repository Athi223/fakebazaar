import { Navigate, useLocation } from "react-router-dom"

export default function RequireCheckout({ children, checkout }) {
	const location = useLocation()

	return location.pathname === checkout ? children : <Navigate to={checkout} replace />
}
