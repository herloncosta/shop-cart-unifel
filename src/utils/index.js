export const formatToBRL = (value) => {
	if (!value) return "R$ 0,00"

	return value.toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL",
	})
}
