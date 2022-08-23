import { useParams } from "react-router-dom"
import { useContext } from "react"
import { StoreContext } from "../Contexts/StoreContext"
import Card from "./Card"

export default function Search() {
	const { query } = useParams()
	const { products } = useContext(StoreContext)

	return (
		<div className="m-4">
			<h4>
				Search Results for <span className="text-primary">{query}</span>
			</h4>
			<hr />
			<div className="bg-secondary p-4 rounded" style={{ "--bs-bg-opacity": 0.75 }}>
				<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
					{products
						.filter(product => product.product.toLowerCase().includes(query.toLowerCase()))
						.map((product, index) => (
							<div className="col" key={index}>
								<Card product={product} />
							</div>
						))}
				</div>
			</div>
		</div>
	)
}
