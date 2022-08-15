import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../Contexts/AuthContext"

export default function RequireAuth({ children }) {
	const { authToken } = useContext(AuthContext)

	return authToken ? children : <Navigate to="/" replace />
}
