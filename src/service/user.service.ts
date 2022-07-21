import { CreateUserDto } from "../models/user/createUser.dto";
import { User } from "../models/user/user.entity";
import { JwtService } from "../repository/jwt.service";
import { UserRepository } from "../repository/user.repository";

export class UserService {

    static async create(createUserDto: CreateUserDto): Promise<User> {
        return await UserRepository.create(createUserDto);
    }

    static async logIn(username: string, password: string): Promise<any> {
        
        const user = await UserRepository.findByUsername(username);
        if(user.password != password) throw new Error("Invalid credentials");

        const token =  JwtService.login(user.id);
        
        return {
            token,
            user
        }
    }

    static async getUser(id: string): Promise<User> {
        return await UserRepository.find(id);
    }

}