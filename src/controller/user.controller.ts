import { validateOrReject } from "class-validator";
import { CreateUserDto } from "../models/user/createUser.dto";
import { User } from "../models/user/user.entity";
import { JwtService } from "../repository/jwt.service";
import { UserService } from "../service/user.service";

export class UserController {

    static async create(_parent: any, args: any, _context: any, _info: any): Promise<User> {
        const {username, email, password} = args.input;
        const createUserDto = new CreateUserDto(username, email, password);
        await validateOrReject(createUserDto);
        return await UserService.create(createUserDto);
    }

    static async logIn(_parent: any, args: any, _context: any, _info: any): Promise<any> {
        const {username, password} = args.input;
        return await UserService.logIn(username, password);
    }

    static async getUser(_parent: any, _args: any, context: any, _info: any): Promise<User> {
        const id = JwtService.validateToken(context.token);
        return await UserService.getUser(id);
    }

}