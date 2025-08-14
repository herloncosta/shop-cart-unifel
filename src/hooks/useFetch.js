import { useEffect, useState } from "react"

export const useFetch = (url, options) => {
	const [data, setData] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)

	useEffect(() => {
		if (!url) return
		const controller = new AbortController()

		const fetchProducts = async () => {
			try {
				setIsLoading(true)
				const response = await fetch(url, {
					...(options || []),
					sginal: controller.signal,
				})
				if (!response.ok) {
					throw new Error(
						`Request failed with status ${response.status} - ${response.statusText}`,
					)
				}
				const data = await response.json()
				setData(data)
			} catch (error) {
				if (error.name !== "AbortError") setError(error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchProducts()

		return () => {
			controller.abort()
		}
	}, [url, options])

	return { data, isLoading, error }
}
