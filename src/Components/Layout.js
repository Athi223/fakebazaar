import { useContext } from "react"
import { NavLink, Outlet } from "react-router-dom"
import { AuthContext } from "../Contexts/AuthContext"
import Cart from './Cart'
import Authenticate from './Authenticate'
import Notification from './Notifications'
import { LogIn, ShoppingCart, User } from 'react-feather'

export default function Layout() {
	const { authToken, setAuthToken } = useContext(AuthContext)

	return (
		<div>
			<nav className="navbar navbar-expand-lg navbar-light bg-navbar">
				<div className="container-fluid">
					<a className="navbar-brand" href="/">FakeBazaar</a>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/categories">Categories</NavLink>
							</li>
						</ul>
						<div className="btn-group" role="group">
							<button className='btn'>
								<ShoppingCart size={20} data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" />
							</button>
							{authToken ? 
								<div className="dropdown">
									<button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
										<User size={20} />
									</button>
									<ul className="dropdown-menu dropdown-menu-end">
										<li><button className="dropdown-item" onClick={() => setAuthToken("")}>Logout</button></li>
									</ul>
								</div>
								: <button className='btn' data-bs-toggle="modal" data-bs-target="#authenticateModal">
									<LogIn size={20} />
								</button>
							}
						</div>
					</div>
				</div>
			</nav>
			<Outlet />
			<Authenticate />
			<Cart />
			<Notification />
		</div>
	)
}
