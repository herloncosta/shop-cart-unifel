import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { validateEmail, validateForm } from "../utils/validations"
import { useNavigate } from "react-router-dom"

export const Login = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [emailError, setEmailError] = useState("")
	const [passwordError, setPasswordError] = useState("")
	const [isSubmitting, setIsSubmitting] = useState(false)
	const navigate = useNavigate()

	const handleEmailChange = (e) => {
		const value = e.target.value
		setEmail(e.target.value)

		value && !validateEmail(value)
			? setEmailError("Email inválido")
			: setEmailError("")
	}

	const handlePasswordChange = (e) => {
		const value = e.target.value
		setPassword(e.target.value)

		value && value.length < 8
			? setPasswordError("Senha inválida")
			: setPasswordError("")
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!validateForm(email, password)) return
		setIsSubmitting(true)

		try {
			// simulando chamada de API
			await new Promise((resolve) => setTimeout(resolve, 2000))
			navigate("/")
		} catch (err) {
			console.log(err)
		} finally {
			setIsSubmitting(false)
		}
	}

	const isFormValid = validateForm(email, password) && !isSubmitting
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
									placeholder='Digite seu email'
									required
									error={emailError}
									value={email}
									onChange={handleEmailChange}
								/>

								<Input
									type='password'
									label='Senha'
									placeholder='Digite sua senha'
									required
									error={passwordError}
									value={password}
									onChange={handlePasswordChange}
								/>

								<Button
									type='submit'
									disabled={!isFormValid}
									onClick={handleSubmit}
								>
									Entrar
								</Button>
							</form>
						</div>
					</div>
				</section>
			</div>
		</main>
	)
}
