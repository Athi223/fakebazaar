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
							{selectedProduct.product}
						</h5>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body">
						<div className="row border rounded m-3 p-3">
							<div className="col-12 col-md-6">
								<img
									src={
										selectedProduct.image_url &&
										selectedProduct.image_url.replace("/s/", "/l/").replace("/mm/", "/l/")
									}
									alt={selectedProduct.product}
								/>
							</div>
							<div className="col-12 col-md-6 text-end">
								<button className="btn btn-primary mb-3" onClick={() => addToCart(selectedProduct.id)}>
									Add to Cart
								</button>
								<h3 className="mb-3">
									₹
									{selectedProduct.market_price === selectedProduct.sale_price ? (
										selectedProduct.sale_price
									) : (
										<>
											<span className="text-decoration-line-through text-danger">
												{selectedProduct.market_price}
											</span>
											<span className="text-success"> {selectedProduct.sale_price} </span>
											<span className="text-secondary">
												(
												{(
													((selectedProduct.market_price - selectedProduct.sale_price) /
														selectedProduct.market_price) *
													100
												).toFixed(0)}
												% off)
											</span>
										</>
									)}
								</h3>
								<p className="fs-4">
									<span className="badge text-bg-warning">{selectedProduct.brand}</span>
								</p>
								{selectedProduct.rating ? (
									<p className="fs-5">
										<span className="badge text-bg-info">★ {selectedProduct.rating} / 5</span>
									</p>
								) : null}
								<h6 className="lh-base text-secondary">{selectedProduct.description}</h6>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
