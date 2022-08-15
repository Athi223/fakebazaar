import { useContext } from "react"
import { BootstrapContext } from "../Contexts/BootstrapContext"
import { StoreContext } from "../Contexts/StoreContext"

export default function Product() {
	const { bootstrap } = useContext(BootstrapContext)
	const { selectedProduct, setCart } = useContext(StoreContext)

	const addToCart = id => {
		const addedToCart = bootstrap.Toast.getInstance("#addedToCart")
		addedToCart.show()
		setCart(cart => [...cart, id])
	}
	return (
		<div
			className="modal fade"
			id="productModal"
			tabIndex="-1"
			aria-labelledby="productModalLabel"
			aria-hidden="true">
			<div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="productModalLabel">
							{selectedProduct.title}
						</h5>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body">
						<div className="row border rounded m-3 p-3">
							<div className="col-12 col-md-8">
								<img
									src={selectedProduct.image}
									style={{ maxHeight: 500, maxWidth: 500, height: "auto", width: "auto" }}
									alt={selectedProduct.title}
								/>
							</div>
							<div className="col-12 col-md-4 text-end">
								<button
									className="btn btn-primary mb-3"
									onClick={() => addToCart(selectedProduct.id - 1)}>
									Add to Cart
								</button>
								<h3 className="mb-3">${selectedProduct.price}</h3>
								<h6 className="lh-base text-secondary">{selectedProduct.description}</h6>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
