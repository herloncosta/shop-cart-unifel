import { Eye, EyeClosed } from "lucide-react"
import { useState } from "react"
import { twMerge } from "tailwind-merge"

export const InputPassword = (
	{ label = "Senha", error, className = "", ...props },
	ref,
) => {
	const [showPassword, setShowPassword] = useState(false)

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword)
	}

	const baseClasses =
		"w-full px-4 py-3 rounded-md border focus:outline-none transition-all duration-200"

	const variantClasses = {
		default:
			"border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
		error:
			"border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200",
	}

	const inputClasses = twMerge(
		baseClasses,
		error ? variantClasses.error : variantClasses.default,
		className,
	)

	return (
		<div>
			{label && (
				<label className='block text-sm font-medium text-gray-700 mb-1'>
					{label}

					<div className='relative'>
						<input
							type={showPassword ? "text" : "password"}
							className={inputClasses}
							ref={ref}
							autoComplete='current-password'
							{...props}
						/>
						<button
							onClick={togglePasswordVisibility}
							type='button'
							className='absolute right-2 top-2.5'
						>
							{showPassword ? <Eye /> : <EyeClosed />}
						</button>
					</div>
				</label>
			)}

			{error && <p className='mt-1 text-sm text-red-600'>{error}</p>}
		</div>
	)
}
