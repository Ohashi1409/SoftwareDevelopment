import prismaClient from "../../prisma";
import { compare } from "bcryptjs";

interface AuhtRequest{
    email: string,
    password: string
}

class AuthUserService{
    async execute({ email, password }: AuhtRequest){
        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if (!user){
            throw new Error("User/Password incorrect")
        }

        const passwordMatch = await compare(password, user.password);
        
        if (!passwordMatch){
            throw new Error("User/Password incorrect")
        }

        return { okay: true }
    }
}

export { AuthUserService };