import { useState } from "react"

export const ShippingCalculator = () => {
	const [cep, setCep] = useState("")
	const [location, setLocation] = useState(null)
	const [locationLoading, setLocationLoading] = useState(null)
	const [locationError, setLocationError] = useState(null)

	const handleSearchCep = async () => {
		try {
			const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
			const cepData = await response.json()

			if (response.ok && !cepData.erro) {
				setLocation(cepData)
				setLocationError(null)
			}

			if (cepData.erro) {
				throw new Error("CEP inválido, por favor, verifique e tente novamente.")
			}
		} catch (error) {
			setLocationError(error.message)
		} finally {
			setLocationLoading(false)
		}
	}

	const applyCepMask = (valor) => {
		const apenasNumeros = valor.replace(/\D/g, "")
		if (apenasNumeros.length <= 5) {
			return apenasNumeros
		}
		return `${apenasNumeros.slice(0, 5)}-${apenasNumeros.slice(5, 8)}`
	}

	return (
		<div className='space-y-4'>
			<div className='flex justify-between items-center'>
				<p className='text-md font-medium'>Calcular frete + entrega</p>

				<div className='flex gap-2'>
					<input
						className='max-w-40 outline-0 border border-slate-800 rounded-md p-2'
						type='text'
						placeholder='Digite seu CEP'
						value={applyCepMask(cep)}
						onChange={(e) => setCep(e.target.value)}
					/>

					<button
						className='max-w-40 bg-slate-800 text-slate-50 outline-0 border border-slate-800 rounded-md p-2 cursor-pointer hover:bg-slate-700 transition-colors duration-300'
						type='button'
						onClick={() => handleSearchCep()}
						disabled={locationLoading}
					>
						Consultar
					</button>
				</div>
			</div>

			<div>
				{location && (
					<div>
						<p>
							<strong>Localidade: </strong>
							<span>
								{location?.logradouro} - {location?.localidade}
							</span>
						</p>
						<p>
							<strong>Frete:</strong> Grátis
						</p>
					</div>
				)}

				{locationError && <p>{locationError}</p>}
			</div>
		</div>
	)
}
