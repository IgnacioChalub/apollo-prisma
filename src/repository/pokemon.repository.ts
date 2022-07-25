import axios from "axios";
import { Images, Item, ItemIdentifiers, Pokemon, PokemonIdentifiers, Sprites} from "../models/pokemon/pokemon.entities";

export class PokemonRepository {
    

    static async pokemonExists(id: string): Promise<boolean> {
        const url = "https://pokeapi.co/api/v2/pokemon-species/" + id + "";  
        return await axios.get(url)
        .then(() => {
            return true;
        }).catch( () => {
            return false;
        })
    }

    static async getPokemonsList(offset: number, limit: number): Promise<PokemonIdentifiers[]> {
        const url = "https://pokeapi.co/api/v2/pokemon-species/?offset=" + offset + "&limit=" + limit + "";  
        const response = await axios.get(url);

        const pokemonList = []
        for (const element of response.data.results) {
            pokemonList.push(new PokemonIdentifiers(element.name, PokemonRepository.getIdFromUrl(element.url)));
        }

        return pokemonList;
    }

    
    static async getPokemon(id: string): Promise<Pokemon> {
        const url = "https://pokeapi.co/api/v2/pokemon-species/" + id + "";  
        const response = await axios.get(url).catch( (error) => {throw new Error('Pokemon not found')});
        return <Pokemon><unknown>response.data;
    }

    static async getPokemonWithImages(id: string): Promise<Pokemon> {
        const url = "https://pokeapi.co/api/v2/pokemon-species/" + id + "";  
        const response = await axios.get(url).catch( (error) => {throw new Error('Pokemon not found')});
       
        const pokemon = response.data;

        const images = await PokemonRepository.getPokemonImages(id);
        pokemon["sprites"] = new Sprites(images.sprites.back_default, images.sprites.front_default);

        return <Pokemon><unknown>pokemon;
    }

    static async getManyPokemons(offset: number, limit: number): Promise<Pokemon[]> {
        const url = "https://pokeapi.co/api/v2/pokemon-species/?offset=" + offset + "&limit=" + limit + "";  
        const response = await axios.get(url);

        const pokemons = []
        for (const element of response.data.results) {
            const pokemon = PokemonRepository.getPokemon(PokemonRepository.getIdFromUrl(element.url));
            pokemons.push(pokemon);    
        }

        return pokemons; 
    }

    static async getManyPokemonsWithImages(offset: number, limit: number): Promise<Pokemon[]> {
        const url = "https://pokeapi.co/api/v2/pokemon-species/?offset=" + offset + "&limit=" + limit + "";  
        const response = await axios.get(url);

        const pokemons = []
        for (const element of response.data.results) {
            const pokemon = PokemonRepository.getPokemonWithImages(PokemonRepository.getIdFromUrl(element.url));
            pokemons.push(pokemon);    
        }

        return pokemons; 
    }

    private static getIdFromUrl(url: string): string {
        let pos = url.length-2;
        let char = url[pos];
        let id = ""
        while(char != '/'){
            id = char + id;
            pos = pos - 1;
            char = url[pos];
        }
        return id;
    }

    static async getPokemonImages(id: string): Promise<Images> {
        const url = "https://pokeapi.co/api/v2/pokemon/" + id + "";  
        const response = await axios.get(url).catch( (error) => {throw new Error('Pokemon not found')});
        return <Images><unknown>response.data;
    }

    static async getItemsList(offset: number, limit: number): Promise<ItemIdentifiers[]>{
        const url = "https://pokeapi.co/api/v2/item/?offset=" + offset + "&limit=" + limit + "";  
        const response = await axios.get(url);

        const itemsIdentifiers = [];

        for (const element of response.data.results) {
            itemsIdentifiers.push(new ItemIdentifiers(element.name, PokemonRepository.getIdFromUrl(element.url)));
        }
        return itemsIdentifiers;

    }

    static async getItem(id: string): Promise<Item> {
        const url = "https://pokeapi.co/api/v2/item/" + id + "";
        const response = await axios.get(url).catch( (error) => {throw new Error('Item not found')});

        return <Item><unknown>response.data
    }

    static async getManyItems(offset: number, limit: number): Promise<Item[]> {
        const url = "https://pokeapi.co/api/v2/item/?offset=" + offset + "&limit=" + limit + "";  
        const response = await axios.get(url);
        const results = response.data.results;

        const items = [];

        for (const result of results) {
            const id = PokemonRepository.getIdFromUrl(result.url);
            items.push(await PokemonRepository.getItem(id));
        }
        return items;
    }


}