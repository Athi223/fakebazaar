import { createContext } from "react"
import bootstrap from "bootstrap/dist/js/bootstrap"

export const BootstrapContext = createContext()

export default function BootstrapProvider({ children }) {
	return <BootstrapContext.Provider value={{ bootstrap }}>{children}</BootstrapContext.Provider>
}
