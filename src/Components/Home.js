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
		<div className="m-4">
			<h4 className="text-info mb-3">Highest Discounts!</h4>
			<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-5">
				{discountedProducts
					.filter((_, index) => index < 12)
					.map((product, index) => (
						<div className="col" key={index}>
							<Card product={product} />
						</div>
					))}
			</div>
			<hr className="my-4" />
			<h4 className="text-info mb-3">Highest Rated!</h4>
			<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-5">
				{highestRatedProducts
					.filter((_, index) => index < 12)
					.map((product, index) => (
						<div className="col" key={index}>
							<Card product={product} />
						</div>
					))}
			</div>
		</div>
	)
}
