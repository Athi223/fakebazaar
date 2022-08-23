import { Link, Navigate, useParams } from "react-router-dom"
import { useContext } from "react"
import { StoreContext } from "../Contexts/StoreContext"
import Card from "./Card"

export default function Categories() {
	const { category } = useParams()
	const { categories, products } = useContext(StoreContext)

	return category ? (
		categories.includes(category) ? (
			<div className="m-4">
				<h4>{category}</h4>
				<hr />
				<div className="bg-secondary p-4 rounded" style={{ "--bs-bg-opacity": 0.75 }}>
					<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-5">
						{products
							.filter(product => product.category === category)
							.map((product, index) => (
								<div className="col" key={index}>
									<Card product={product} />
								</div>
							))}
					</div>
				</div>
			</div>
		) : (
			<Navigate to="/" />
		)
	) : (
		<div className="mt-5 container">
			<ul className="list-group">
				{categories.map((category, index) => (
					<li className="list-group-item" key={index}>
						<Link className="text-decoration-none" to={category}>
							{category}
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
