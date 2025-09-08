import { useEffect } from "react"
import { X } from "lucide-react"

export const Modal = ({
	isOpen,
	onClose,
	title,
	children,
	confirmText = "Confirmar",
	cancelText = "Cancelar",
	onConfirm,
	showActions = true,
}) => {
	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === "Escape") {
				onClose()
			}
		}

		if (isOpen) {
			document.addEventListener("keydown", handleEscape)
			document.body.style.overflow = "hidden"
		}

		return () => {
			document.removeEventListener("keydown", handleEscape)
			document.body.style.overflow = "unset"
		}
	}, [isOpen, onClose])

	if (!isOpen) return null

	const handleBackdropClick = (e) => {
		if (e.target === e.currentTarget) {
			onClose()
		}
	}

	const handleBackdropKeyDown = (e) => {
		if (e.key === "Enter" || e.key === " ") {
			if (e.target === e.currentTarget) {
				onClose()
			}
		}
	}

	const handleConfirm = () => {
		onConfirm?.()
		onClose()
	}

	return (
		<dialog
			className='h-full w-full fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-transparent'
			onClick={handleBackdropClick}
			onKeyDown={handleBackdropKeyDown}
			aria-modal='true'
			tabIndex={-1}
			open
		>
			{/* Backdrop */}
			<div className='absolute inset-0 bg-black/60 transition-opacity' />

			{/* Modal */}
			<div className='relative bg-white rounded-xl shadow-2xl w-full max-w-[90%] sm:max-w-md md:max-w-lg lg:max-w-xl mx-4 transform transition-all'>
				{/* Header */}
				<div className='flex items-center justify-between p-4 sm:p-5 md:p-6 border-b border-gray-200'>
					<h3 className='text-base sm:text-lg md:text-xl font-semibold text-gray-900'>
						{title}
					</h3>
					<button
						type='button'
						onClick={onClose}
						className='text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 rounded'
						aria-label='Fechar modal'
					>
						<X size={20} />
					</button>
				</div>

				{/* Content */}
				<div className='p-4 sm:p-5 md:p-6'>{children}</div>

				{/* Actions */}
				{showActions && (
					<div className='flex flex-col-reverse sm:flex-row justify-end gap-3 p-4 sm:p-5 md:p-6 border-t border-gray-200'>
						<button
							type='button'
							onClick={onClose}
							className='w-full sm:w-auto px-3 py-1.5 sm:px-3 sm:py-1.5 md:px-4 md:py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300'
						>
							{cancelText}
						</button>
						<button
							type='button'
							onClick={handleConfirm}
							className='w-full sm:w-auto px-3 py-1.5 sm:px-3 sm:py-1.5 md:px-4 md:py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
						>
							{confirmText}
						</button>
					</div>
				)}
			</div>
		</dialog>
	)
}
