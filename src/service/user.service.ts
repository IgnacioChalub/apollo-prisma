import { FavoritePokemon } from "@prisma/client";
import { CreateUserDto } from "../models/user/createUser.dto";
import { User } from "../models/user/user.entity";
import { EncrypterService } from "../repository/encrypter.service";
import { JwtService } from "../repository/jwt.service";
import { PokemonRepository } from "../repository/pokemon.repository";
import { S3Service } from "../repository/s3.service";
import { UserRepository } from "../repository/user.repository";

export class UserService {

    static async create(createUserDto: CreateUserDto): Promise<User> {
        const encryptedPassword = EncrypterService.encrypt(createUserDto.password);
        return await UserRepository.create(createUserDto, encryptedPassword);
    }

    static async logIn(username: string, password: string): Promise<any> {
        
        const user = await UserRepository.findByUsername(username);
        if(! await EncrypterService.compare(password, user.password)) throw new Error("Invalid credentials");

        const token =  JwtService.login(user.id);
        return {
            token,
            user
        }
    }

    static async getUser(id: string): Promise<User> {
        return await UserRepository.find(id);
    }

    static async addFavoritePokemon(id: string, pokemonId: string): Promise<string> {
        if(! await PokemonRepository.pokemonExists(pokemonId)) throw new Error("Pokemon not found");
        return await UserRepository.addFavoritePokemon(id,  pokemonId);
    }

    static async getAllFavorites(id: string): Promise<FavoritePokemon[]> {
        return await UserRepository.getAllFavorites(id);
    }

    static async addProfilePictureGetUrl(id: string): Promise<string> {
        await UserRepository.setProfilePicture(id); 
        return await S3Service.getPutUrl(id);
    }

    static async getProfilePictureUrl(id: string): Promise<string> {
        const user: User = await UserRepository.find(id);
        if(!user.hasProfilePicture) throw Error("User does not have a profile picture");
        return await S3Service.getUrl(id);
    }
}