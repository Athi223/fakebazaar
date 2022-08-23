import { useContext, useEffect, useState } from "react"
import { StoreContext } from "../Contexts/StoreContext"
import Card from "./Card"

export default function Home() {
	const { products } = useContext(StoreContext)
	const [discountedProducts, setDiscountedProducts] = useState([])
	const [highestRatedProducts, setHighestRatedProducts] = useState([])

	useEffect(() => {
		let discountedProducts = [...products]
		discountedProducts.sort((a, b) => b.market_price - b.sale_price - (a.market_price - a.sale_price))
		setDiscountedProducts(discountedProducts)

		let highestRatedProducts = [...products]
		highestRatedProducts.sort((a, b) => b.rating - a.rating)
		setHighestRatedProducts(highestRatedProducts)
	}, [products])

	return (
		<div className="m-3">
			<div className="accordion" id="accordionHome">
				<div className="accordion-item">
					<h2 className="accordion-header" id="headingDiscounts">
						<button
							className="accordion-button fs-4"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#collapseDiscounts"
							aria-expanded="true"
							aria-controls="collapseDiscounts">
							Highest Discounts!
						</button>
					</h2>
					<div
						id="collapseDiscounts"
						className="accordion-collapse collapse show"
						aria-labelledby="headingDiscounts">
						<div className="accordion-body bg-secondary py-4" style={{ "--bs-bg-opacity": 0.75 }}>
							<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
								{discountedProducts
									.filter((_, index) => index < 12)
									.map((product, index) => (
										<div className="col" key={index}>
											<Card product={product} />
										</div>
									))}
							</div>
						</div>
					</div>
				</div>
				<div className="accordion-item">
					<h2 className="accordion-header" id="headingRated">
						<button
							className="accordion-button fs-4"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#collapseRated"
							aria-expanded="true"
							aria-controls="collapseRated">
							Highest Rated!
						</button>
					</h2>
					<div id="collapseRated" className="accordion-collapse collapse show" aria-labelledby="headingRated">
						<div className="accordion-body bg-secondary py-4" style={{ "--bs-bg-opacity": 0.75 }}>
							<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
								{highestRatedProducts
									.filter((_, index) => index < 12)
									.map((product, index) => (
										<div className="col" key={index}>
											<Card product={product} />
										</div>
									))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
