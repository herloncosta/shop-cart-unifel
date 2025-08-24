export const validateEmail = (email) => {
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return re.test(String(email).toLowerCase())
}

export const validatePassword = (password) => {
	const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/
	if (!re.test(password)) return false
	return true
}
