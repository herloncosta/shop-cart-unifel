import { toast } from "sonner"

export const imageToast = (
	product,
	existingItem,
	removeFromCart,
	decreaseQuantity,
) => {
	const toastContent = (
		<div className='flex items-center gap-1'>
			<div className='h-12 w-12'>
				<img
					className='h-full w-full object-contain'
					src={product.image}
					alt={product.description}
				/>
			</div>

			<div className='max-w-[200px]'>
				<p className='font-semibold truncate'>{product.title}</p>
				<p className='truncate'>{product.description}</p>
				<strong className='block mt-2 text-sm'>Adicionado ao carrinho!</strong>
			</div>
		</div>
	)

	const toastOptions = {
		duration: 3000,
		position: "top-center",
		action: {
			label: "Desfazer",
			onClick: () => {
				existingItem(product.id)
					? decreaseQuantity(product.id)
					: removeFromCart(product.id)
				toast.dismiss()
			},
		},
	}

	toast(toastContent, toastOptions)
}
