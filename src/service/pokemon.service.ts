import { Images, Item, Pokemon } from "../models/pokemon/pokemon.entities";
import { PokemonRepository } from "../repository/pokemon.repository";

export class PokemonService {

    static async getPokemon(id: string): Promise<Pokemon> {
        return await PokemonRepository.getPokemon(id);
    }

    static async getManyPokemons(offset: number, limit: number): Promise<Pokemon[]> {
        return await PokemonRepository.getManyPokemons(offset, limit);
    }
   
    static async getPokemonImages(id: string): Promise<Images> {
        return await PokemonRepository.getPokemonImages(id);
    }
    

    static async getItem(id: string): Promise<Item> {
        return await PokemonRepository.getItem(id);
    }

    static async getManyItems(offset: number, limit: number): Promise<Item[]> {
        return await PokemonRepository.getManyItems(offset, limit);
    }

}