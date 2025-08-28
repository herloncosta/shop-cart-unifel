import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useFavoritesStore = create(
	persist(
		(set, get) => ({
			favorites: [],
			getFavoritesCount: () => {
				const { favorites } = get()
				return favorites.length
			},
			addFavorite: (product) => {
				const { favorites } = get()
				const isAlreadyFavorite = favorites.some((fav) => fav.id === product.id)

				if (!isAlreadyFavorite) {
					set({ favorites: [...favorites, product] })
				}
			},
			removeFavorite: (productId) => {
				const { favorites } = get()
				const updatedFavorites = favorites.filter((fav) => fav.id !== productId)
				set({ favorites: updatedFavorites })
			},
			clearFavorites: () => set({ favorites: [] }),
			isFavorite: (productId) => {
				const { favorites } = get()
				return favorites.some((fav) => fav.id === productId)
			},
			toggleFavorite: (product) => {
				const { isFavorite, addFavorite, removeFavorite } = get()
				if (isFavorite(product.id)) {
					removeFavorite(product.id)
					return
				}
				addFavorite(product)
			},
		}),
		{
			name: "favorites-store",
			partialize: (state) => ({ favorites: state.favorites }),
		},
	),
)
