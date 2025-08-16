import { twMerge } from "tailwind-merge"

export const Button = ({
	children,
	onClick,
	disabled = false,
	type = "button",
	className,
}) => {
	return (
		<button
			type={type}
			className={twMerge(
				"w-full bg-slate-800 py-2 px-4 rounded-md text-slate-50 cursor-pointer",
				disabled && "opacity-50",
				className,
			)}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	)
}
