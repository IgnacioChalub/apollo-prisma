import { Images, Pokemon } from "../models/pokemon/pokemon.entity";
import { JwtService } from "../repository/jwt.service";
import { PokemonService } from "../service/pokemon.service";

export class PokemonController {

    static async getPokemon(_parent: any, args: any, context: any, _info: any): Promise<Pokemon> {
        JwtService.validateToken(context.token);
        return await PokemonService.getPokemon(args.input.id)
    }

    static async getManyPokemons(_parent: any, args: any, context: any, _info: any): Promise<Pokemon[]> {
        JwtService.validateToken(context.token);
        return await PokemonService.getManyPokemons(args.input.offset, args.input.limit);
    }


    static async getPokemonImages(_parent: any, args: any, context: any, _info: any): Promise<Images> {
        JwtService.validateToken(context.token);
        return await PokemonService.getPokemonImages(args.input.id);
    }



}