// import { PokemonService } from '../entites/pokemon/PokemonService'
// import { createPokemonsStore } from '../entites/pokemon/pokemonStore'
// import { PokemonApi } from '../entites/pokemon/repository/PokemonApi'
import { createBaseMediaStore } from '@/entities/media/store/createBaseMediaStore'

export function setupDeps() {
	// const pokemonService = new PokemonService(new PokemonApi())

	const useMediaStore = createBaseMediaStore()

	return { useMediaStore }
}
