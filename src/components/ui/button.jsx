import { Loader } from "lucide-react"
import { useState } from "react"
import { twMerge } from "tailwind-merge"

export const Button = (
	{
		children,
		loading = false,
		variant = "primary",
		disabled,
		className = "",
		...props
	},
	ref,
) => {
	const [isLoading, setIsLoading] = useState(loading)

	const baseClasses =
		"w-full py-3 px-4 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center cursor-pointer"

	const variantClasses = {
		primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
		secondary:
			"bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500",
		danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
	}

	const disabledClasses = "opacity-70 cursor-not-allowed"

	const buttonClasses = twMerge(
		baseClasses,
		variantClasses[variant],
		(disabled || isLoading) && disabledClasses,
		className,
	)

	return (
		<button className={buttonClasses} {...props}>
			{isLoading ? <Loader className='animate-spin' /> : children}
		</button>
	)
}
