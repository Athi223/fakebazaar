import { useContext } from "react"
import { StoreContext } from "../Contexts/StoreContext"
import Card from "./Card"

export default function Home() {
	const { products } = useContext(StoreContext)

	return (
		<div className='m-5'>
			<div className="row row-cols-1 row-cols-md-4 g-5">
				{products.map((product, index) => 
					<div className='col' key={index}>
						<Card product={product} />
					</div>
				)}
			</div>
		</div>
	)
}
