import axios from "axios";
import { Images, Item, ItemIdentifiers, Location, LocationName, Pokemon, PokemonIdentifiers, RegionName, Sprites} from "../models/pokemon/pokemon.entities";

export class PokemonRepository {
    
    static async pokemonExists(id: string): Promise<boolean> {
        const url = "https://pokeapi.co/api/v2/pokemon-species/" + id + "";  
        try{
            await axios.get(url)
            return true;
        }catch(e: any){
            return false;
        }
    }

    static async getPokemonsList(offset: number, limit: number): Promise<PokemonIdentifiers[]> {
        const url = "https://pokeapi.co/api/v2/pokemon-species/?offset=" + offset + "&limit=" + limit + "";  
        const response = await axios.get(url);

        return response.data.results.map((element: { name: string; url: string; }) => {
            return new PokemonIdentifiers(element.name, PokemonRepository.getIdFromUrl(element.url));
        })
        
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
        return response.data.results.map((element: { url: string; }) => {
            return PokemonRepository.getPokemon(PokemonRepository.getIdFromUrl(element.url));
        })
    }

    static async getManyPokemonsWithImages(offset: number, limit: number): Promise<Pokemon[]> {
        const url = "https://pokeapi.co/api/v2/pokemon-species/?offset=" + offset + "&limit=" + limit + "";  
        const response = await axios.get(url);
        return response.data.results.map((element: { url: string; }) => {
            return PokemonRepository.getPokemonWithImages(PokemonRepository.getIdFromUrl(element.url));    
        })
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
        return response.data.results.map(element => {
            return new ItemIdentifiers(element.name, PokemonRepository.getIdFromUrl(element.url));
        })
    }

    static async getItem(id: string): Promise<Item> {
        const url = "https://pokeapi.co/api/v2/item/" + id + "";
        const response = await axios.get(url).catch( (error) => {throw new Error('Item not found')});
        return <Item><unknown>response.data
    }

    static async getManyItems(offset: number, limit: number): Promise<Item[]> {
        const url = "https://pokeapi.co/api/v2/item/?offset=" + offset + "&limit=" + limit + "";  
        const response = await axios.get(url);
        return response.data.results.map(async (result: { url: string; }) => {
            return await PokemonRepository.getItem(PokemonRepository.getIdFromUrl(result.url))
        })
    }

    static async getRegionsList(): Promise<RegionName[]> {
        const url = "https://pokeapi.co/api/v2/region/";  
        const response = await axios.get(url);
        return <RegionName[]>response.data.results;
    }

    static async getRegionLocations(regionName: string): Promise<LocationName[]> {
        const url = "https://pokeapi.co/api/v2/region/" + regionName + "";  
        const response = await axios.get(url).catch( (error) => {throw new Error('Region not found')});
        return <LocationName[]>response.data.locations;
    }

    static async getLocation(locationName: string): Promise<Location> {
        const url = "https://pokeapi.co/api/v2/location/" + locationName + "";
        const response = await axios.get(url).catch( (error) => {throw new Error('Location not found')});
        return <Location>response.data;
    }

}