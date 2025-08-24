import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { validateEmail } from "../utils/validations"
import { useNavigate } from "react-router-dom"
import { InputPassword } from "../components/ui/input-password"

export const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	})
	const [errors, setErrors] = useState({})
	const navigate = useNavigate()

	const handleChange = (e) => {
		const { name, value } = e.target

		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}))

		if (errors[name]) {
			setErrors((prevErrors) => ({
				...prevErrors,
				[name]: "",
			}))
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const newErrors = {}
		if (!formData.email) newErrors.email = "Email é obrigatório"
		if (!validateEmail(formData.email))
			newErrors.email = "Formato de email inválido"
		if (!formData.password) newErrors.password = "Senha é obrigatória"

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors)
			return
		}

		return new Promise((resolve) =>
			setTimeout(() => {
				resolve()
				navigate("/dashboard")
			}, 2000),
		)
	}

	return (
		<main className='h-screen'>
			<div className='h-full grid grid-cols-2'>
				<section>
					<img
						src='/banner.webp'
						alt='Banner da loja virtual'
						className='w-full h-full object-cover'
					/>
				</section>

				<section className='bg-slate-100'>
					<div className='h-full flex flex-col justify-center'>
						<div className='w-[500px] mx-auto'>
							<div className='py-4'>
								<h1 className='text-2xl font-bold text-slate-800'>
									Bem vindo(a) de volta!
								</h1>
							</div>

							<form className='flex flex-col gap-4' onSubmit={handleSubmit}>
								<Input
									type='email'
									label='Email'
									name='email'
									placeholder='Digite seu email'
									value={formData.email}
									onChange={handleChange}
									error={errors.email}
									required
								/>

								<InputPassword
									name='password'
									placeholder='Digite sua senha'
									value={formData.password}
									onChange={handleChange}
									required
								/>

								<Button type='submit'>Entrar</Button>
							</form>
						</div>
					</div>
				</section>
			</div>
		</main>
	)
}
