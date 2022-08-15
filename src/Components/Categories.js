import { useContext, useEffect, useState } from "react"
import { StoreContext } from "../Contexts/StoreContext"
import Card from "./Card"

export default function Categories() {
	const { products, categories } = useContext(StoreContext)
	const [ selectedCategory, setSelectedCategory ] = useState("")

	useEffect(() => {
		setSelectedCategory(categories[0])
	}, [categories])

	return (
		<div className="mt-1">
			<ul className="nav nav-tabs" id="myTab" role="tablist">
				{categories.map((category, index) =>
					<li key={index} className="nav-item" role="presentation">
						<button className={"text-capitalize nav-link " + (selectedCategory === category ? "active" : "")} id={category.replace(" ", "").replace("'", "") + "-tab"} data-bs-toggle="tab" data-bs-target={"#" + category.replace(" ", "").replace("'", "") + "-tab-pane"} type="button" role="tab" aria-controls={category.replace(" ", "").replace("'", "") + "-tab-pane"} aria-selected={selectedCategory === category ? "true" : "false"}>{category}</button>
					</li>
				)}
			</ul>
			<div className="tab-content p-5" id="myTabContent">
				{categories.map((category, catIndex) =>
					<div key={catIndex} className={"tab-pane fade " + (selectedCategory === category ? "show active" : "")} id={category.replace(" ", "").replace("'", "") + "-tab-pane"} role="tabpanel" aria-labelledby={category.replace(" ", "").replace("'", "") + "-tab"} tabIndex="0">
						<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-5">
							{products.filter(product=> product.category === category).map((product, index) => 
								<div className='col' key={index}>
									<Card product={product} />
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
