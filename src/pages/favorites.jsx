import { Footer } from "../components/layout/footer"
import { Navbar } from "../components/layout/navbar"

export const Favorites = () => {
	return (
		<div className='flex flex-col min-h-screen'>
			<Navbar />
			<main className='flex-1 flex flex-col items-center justify-center'>
				<h1 className='text-3xl font-bold mb-4'>Favorites Page</h1>
				<p>This is where the favorites process will be implemented.</p>
			</main>
			<Footer />
		</div>
	)
}
