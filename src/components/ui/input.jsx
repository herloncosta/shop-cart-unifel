import { useState } from "react"
import { Eye, EyeClosed } from "lucide-react"
import { twMerge } from "tailwind-merge"

export const Input = ({
	type = "text",
	label,
	value,
	onChange,
	placeholder,
	error,
	required = false,
}) => {
	const [showPassword, setShowPassword] = useState(false)

	return (
		<div className='flex flex-col relative'>
			{label && (
				<label htmlFor={`field-${label}`} className='text-slate-700'>
					{label} {required && "*"}
				</label>
			)}

			<input
				id={`field-${label}`}
				type={showPassword ? "text" : type}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				required={required}
				className={twMerge(
					"py-2 px-4 border-2 border-slate-500 rounded-md outline-none",
					error && "border-red-500",
				)}
				autoComplete='none'
			/>

			{error && <span className='text-red-500'>{error}</span>}

			{type === "password" && (
				<button
					type='button'
					onClick={() => setShowPassword(!showPassword)}
					className='absolute right-4 top-8 cursor-pointer'
				>
					{showPassword ? <Eye /> : <EyeClosed />}
				</button>
			)}
		</div>
	)
}
