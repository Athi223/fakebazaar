import { useContext } from "react"
import { BootstrapContext } from "../Contexts/BootstrapContext"
import { StoreContext } from "../Contexts/StoreContext"

export default function Card({ product }) {
	const { bootstrap } = useContext(BootstrapContext)
	const { setCart, setSelectedProduct } = useContext(StoreContext)

	const addToCart = (e, id) => {
		e.stopPropagation()
		const addedToCart = bootstrap.Toast.getInstance("#addedToCart")
		addedToCart.show()
		setCart(cart => (cart === null ? [id] : [...cart, id]))
	}

	const showProduct = () => {
		const productModal = new bootstrap.Modal("#productModal")
		productModal.show()
		setSelectedProduct(product)
	}

	return (
		<div className="card border-secondary shadow h-100" role="button" onClick={showProduct}>
			<img
				src={product.image_url.replace("/s/", "/m/").replace("/mm/", "/m/")}
				className="card-img-top p-3"
				alt={product.product}
			/>
			<div className="card-body">
				<h4 className="card-title">{product.product}</h4>
			</div>
			<div className="card-footer d-flex justify-content-between">
				<h5 className="card-text">
					₹
					{product.market_price === product.sale_price ? (
						product.sale_price
					) : (
						<>
							<span className="text-decoration-line-through text-danger">{product.market_price}</span>
							<span className="text-success"> {product.sale_price} </span>
							<span className="text-secondary">
								(-
								{(((product.market_price - product.sale_price) / product.market_price) * 100).toFixed(
									0
								)}
								%)
							</span>
						</>
					)}
				</h5>
				<button className="btn btn-sm btn-warning m-0" onClick={e => addToCart(e, product.id)}>
					Add to Cart
				</button>
			</div>
		</div>
	)
}
