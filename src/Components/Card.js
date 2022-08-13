import { useContext } from "react"
import { BootstrapContext } from "../Contexts/BootstrapContext"
import { StoreContext } from "../Contexts/StoreContext"

export default function Card({ product }) {
	const { bootstrap } = useContext(BootstrapContext)
	const { viewProduct, setCart } = useContext(StoreContext)

	const addToCart = (id) => {
		const addedToCart = bootstrap.Toast.getInstance("#addedToCart")
		addedToCart.show()
		setCart(cart => [...cart, id])
	}

	return (
		<div className='card h-100'>
			<img src={product.image} className="card-img-top p-3" height={300} alt={product.title} />
			<div className="card-body">
				<h4 className="card-title">{product.title}</h4>
			</div>
			<div className="card-footer d-flex justify-content-between">
				<h4 className="card-text">${product.price}</h4>
				<button className='btn btn-sm btn-info m-0' onClick={() => addToCart(product.id - 1)}>Add to Cart</button>
			</div>
		</div>
	)
}
