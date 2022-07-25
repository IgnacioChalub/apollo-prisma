import { Images, Item, ItemIdentifiers, Pokemon, PokemonIdentifiers } from "../models/pokemon/pokemon.entities";
import { PokemonRepository } from "../repository/pokemon.repository";

export class PokemonService {

    static async getPokemonsList(offset: number, limit: number): Promise<PokemonIdentifiers[]> {
        return await PokemonRepository.getPokemonsList(offset, limit);
    }

    static async getPokemon(id: string): Promise<Pokemon> {
        return await PokemonRepository.getPokemon(id);
    }

    static async getPokemonWithImages(id: string): Promise<Pokemon> {
        return await PokemonRepository.getPokemonWithImages(id);
    }
    
    static async getManyPokemons(offset: number, limit: number): Promise<Pokemon[]> {
        return await PokemonRepository.getManyPokemons(offset, limit);
    }
    
    static async getManyPokemonsWithImages(offset: number, limit: number): Promise<Pokemon[]> {
        return await PokemonRepository.getManyPokemonsWithImages(offset, limit);
    }
   
    static async getPokemonImages(id: string): Promise<Images> {
        return await PokemonRepository.getPokemonImages(id);
    }
    
    static async getItemsList(offset: number, limit: number): Promise<ItemIdentifiers[]> {
        return await PokemonRepository.getItemsList(offset, limit);
    }

    static async getItem(id: string): Promise<Item> {
        return await PokemonRepository.getItem(id);
    }

    static async getManyItems(offset: number, limit: number): Promise<Item[]> {
        return await PokemonRepository.getManyItems(offset, limit);
    }

}
