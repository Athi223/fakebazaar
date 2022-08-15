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
		setCart(cart => [...cart, id])
	}

	const showProduct = () => {
		const productModal = new bootstrap.Modal("#productModal")
		productModal.show()
		setSelectedProduct(product)
	}

	return (
		<div className="card border-secondary shadow h-100" role="button" onClick={showProduct}>
			<img src={product.image} className="card-img-top p-3" height={300} alt={product.title} />
			<div className="card-body">
				<h4 className="card-title">{product.title}</h4>
			</div>
			<div className="card-footer d-flex justify-content-between">
				<h4 className="card-text">${product.price}</h4>
				<button className="btn btn-sm btn-primary m-0" onClick={e => addToCart(e, product.id - 1)}>
					Add to Cart
				</button>
			</div>
		</div>
	)
}
