import { useContext } from "react"
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom"
import { FirebaseContext } from "../Contexts/FirebaseContext"
import { StoreContext } from "../Contexts/StoreContext"
import { LogIn, ShoppingCart, User } from "react-feather"
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth"
import Cart from "./Cart"
import Notification from "./Notifications"
import Product from "./Product"
import fakebazaar from "../fakebazaar.png"

const provider = new GoogleAuthProvider()

export default function Layout() {
	const navigate = useNavigate()
	const location = useLocation()
	const { user, setUser } = useContext(FirebaseContext)
	const { cart, categories } = useContext(StoreContext)

	const login = () => {
		const auth = getAuth()
		signInWithPopup(auth, provider)
			.then(result => {
				const credential = GoogleAuthProvider.credentialFromResult(result)
				const token = credential.accessToken
				const user = result.user
				setUser(
					JSON.stringify({
						uid: user.uid,
						name: user.displayName,
						email: user.email,
						accessToken: token,
					})
				)
			})
			.catch(error => console.error(error))
	}

	const logout = () => {
		const auth = getAuth()
		signOut(auth)
			.then(() => setUser(""))
			.catch(error => console.error(error))
	}

	const search = e => {
		e.preventDefault()
		const query = e.target.querySelector("input[type=search]").value
		navigate(`/search/${query}`)
	}

	return (
		<div>
			<nav className="navbar navbar-expand-lg navbar-light bg-navbar sticky-top">
				<div className="container-fluid">
					<a className="navbar-brand pt-0" href={process.env.PUBLIC_URL}>
						<img src={fakebazaar} width={115} alt="FakeBazaar" />
					</a>
					<form className="d-flex flex-grow-1" role="search" onSubmit={search}>
						<input
							className="form-control me-2"
							type="search"
							placeholder="Search a Product"
							aria-label="Search"
						/>
					</form>
					<button
						className="navbar-toggler"
						data-bs-toggle="collapse"
						data-bs-target="#navbarContent"
						aria-controls="navbarContent"
						aria-expanded="false"
						aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<NavLink className="nav-link" aria-current="page" to="/">
									Home
								</NavLink>
							</li>
							<li className="nav-item">
								<div
									className={`nav-link dropdown ${
										location.pathname.includes("categories") ? "active" : ""
									}`}>
									<span
										className="dropdown-toggle"
										role="button"
										data-bs-toggle="dropdown"
										aria-expanded="false">
										Categories
									</span>
									<ul className="dropdown-menu mt-0">
										{categories.map(category => (
											<li key={category}>
												<NavLink to={`/categories/${category}`} className="dropdown-item">
													{category}
												</NavLink>
											</li>
										))}
									</ul>
								</div>
							</li>
							{user && (
								<li className="nav-item">
									<NavLink className="nav-link" to="/checkout">
										Checkout
									</NavLink>
								</li>
							)}
							{user && (
								<li className="nav-item">
									<NavLink className="nav-link" to="/orders">
										Orders
									</NavLink>
								</li>
							)}
						</ul>
						<div className="btn-group" role="group">
							{location.pathname.startsWith("/checkout") ? null : (
								<button className="btn">
									<ShoppingCart
										size={20}
										data-bs-toggle="offcanvas"
										data-bs-target="#Cart"
										aria-controls="Cart"
									/>
									<span className="position-absolute top-10 start-90 translate-middle badge rounded-pill bg-danger">
										{cart?.length ? cart.length : null}
									</span>
								</button>
							)}
							{user ? (
								<div className="dropdown">
									<button
										className="btn dropdown-toggle"
										data-bs-toggle="dropdown"
										aria-expanded="false">
										<User size={20} />
									</button>
									<ul className="dropdown-menu dropdown-menu-end">
										<li>
											<button className="dropdown-item" onClick={logout}>
												Logout
											</button>
										</li>
									</ul>
								</div>
							) : (
								<button className="btn">
									<LogIn size={20} onClick={login} />
								</button>
							)}
						</div>
					</div>
				</div>
			</nav>
			<Outlet />
			<Product />
			<Cart login={login} />
			<Notification />
		</div>
	)
}
