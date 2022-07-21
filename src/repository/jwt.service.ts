import jwt from 'jsonwebtoken'

interface Payload{
    _id: string;
    iat: number;
    exp: number;
}

export class JwtService {

    static login(accountId: string): string {
        return jwt.sign({_id: accountId}, 'secretiveness', {
            expiresIn: 60 * 60 * 24 // 24 hours
        });
    }

    static validateToken(token: string): string {
        try{
            const payload = jwt.verify(token, 'secretiveness') as Payload;
            const id = payload._id;
            return id;
        }catch(e: any){
            throw Error("Access denied");
        }
    }

}