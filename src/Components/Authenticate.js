import { useContext, useState } from "react"
import { AuthContext } from "../Contexts/AuthContext"
import { BootstrapContext } from "../Contexts/BootstrapContext"

export default function Authenticate() {
	const { baseURL, setAuthToken } = useContext(AuthContext)
	const { bootstrap } = useContext(BootstrapContext)
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState(false)

	const authenticate = e => {
		e.preventDefault()
		fetch(`${baseURL}/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username: username, password: password }),
		})
			.then(response => (response.ok ? response.json() : Promise.reject(response)))
			.then(json => {
				setAuthToken(json.token)
				const authenticateModal = bootstrap.Modal.getInstance("#authenticateModal")
				authenticateModal.hide()
			})
			.catch(() => setError(true))
	}
	return (
		<div
			className="modal fade"
			id="authenticateModal"
			data-bs-backdrop="static"
			data-bs-keyboard="false"
			tabIndex="-1"
			aria-labelledby="authenticateModalLabel"
			aria-hidden="true">
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="authenticateModalLabel">
							Sign In to your Account
						</h5>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body">
						<form onSubmit={authenticate}>
							<div className="mb-3">
								<label htmlFor="username" className="form-label">
									Username
								</label>
								<input
									value={username}
									onChange={e => setUsername(e.target.value)}
									type="text"
									className="form-control"
									id="username"
									required
								/>
							</div>
							<div className="mb-3">
								<label htmlFor="password" className="form-label">
									Password
								</label>
								<input
									value={password}
									onChange={e => setPassword(e.target.value)}
									type="password"
									className="form-control"
									id="password"
									required
								/>
							</div>
							{error && <div className="mb-3 text-center text-danger">Invalid Username/Password</div>}
							<div className="text-center">
								<button type="submit" className="btn btn-primary">
									Sign In
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
