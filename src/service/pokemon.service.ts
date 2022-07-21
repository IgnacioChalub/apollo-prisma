import { Images, Pokemon } from "../models/pokemon/pokemon.entity";
import { PokemonRepository } from "../repository/pokemon.repository";

export class PokemonService {

    static async getPokemon(id: string): Promise<Pokemon> {
        return await PokemonRepository.getPokemon(id);
    }

    static async getManyPokemons(offset: number, limit: number): Promise<Pokemon[]> {
        return await PokemonRepository.getPokemons(offset, limit);
    }
   
    static async getPokemonImages(id: string): Promise<Images> {
        return await PokemonRepository.getPokemonImages(id);
    }
    

}