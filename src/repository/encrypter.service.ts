
import bcrypt from "bcrypt";

export class EncrypterService {
    
    static async compare(password: string, hashedPassword: string): Promise<boolean> {
        const auth = await bcrypt.compare(password, hashedPassword)
        if (auth) {
            return true;
        } else {
            return false;
        }
    }

    static encrypt(password: string): string {
        return bcrypt.hashSync(password, 5);
    }


}