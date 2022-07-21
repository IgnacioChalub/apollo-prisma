import axios from "axios";
import { Images, Pokemon } from "../models/pokemon/pokemon.entity";

export class PokemonRepository {

    static async getPokemon(id: string): Promise<Pokemon> {
        const url = "https://pokeapi.co/api/v2/pokemon-species/" + id + "";  
        const response = await axios.get(url).catch( (error) => {throw new Error('Pokemon not found')});
        return <Pokemon><unknown>response.data;
    }

    static async getPokemons(offset: number, limit: number): Promise<Pokemon[]> {
        const url = "https://pokeapi.co/api/v2/pokemon-species/?offset=" + offset + "&limit=" + limit + "";  
        const response = await axios.get(url);

        const pokemons = []
        for (const element of response.data.results) {
            const pokemon = PokemonRepository.getPokemon(element.url.charAt(element.url.length-2));
            pokemons.push(pokemon);    
        }

        return pokemons; 
    }

    static async getPokemonImages(id: string): Promise<Images> {
        const url = "https://pokeapi.co/api/v2/pokemon/" + id + "";  
        const response = await axios.get(url).catch( (error) => {throw new Error('Pokemon not found')});
        return <Images><unknown>response.data;
    }
}