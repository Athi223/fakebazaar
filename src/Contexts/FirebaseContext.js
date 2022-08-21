import { createContext } from "react"
import useCookie from "react-use-cookie"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"

import { firebaseConfig } from "../firebaseConfig"

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

export const FirebaseContext = createContext()

export default function FirebaseProvider({ children }) {
	const [user, setUser] = useCookie("user", "")
	return <FirebaseContext.Provider value={{ user, setUser, database }}>{children}</FirebaseContext.Provider>
}
