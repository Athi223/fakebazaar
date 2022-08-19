import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../Contexts/AuthContext"

export default function RequireAuth({ children }) {
	const { user } = useContext(AuthContext)

	return user ? children : <Navigate to="/" replace />
}
