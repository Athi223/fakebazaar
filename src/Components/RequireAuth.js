import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { FirebaseContext } from "../Contexts/FirebaseContext"

export default function RequireAuth({ children }) {
	const { user } = useContext(FirebaseContext)

	return user ? children : <Navigate to="/" replace />
}
