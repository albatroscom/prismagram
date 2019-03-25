import { generatorSecret } from "../../../utils";
import { prisma } from "../../../../generated/prisma-client";

export default { 
    Mutation: {
        requestSecret: async(_, args) => {
            const { email } = args;
            const loginSecret = generatorSecret();
            console.log(loginSecret);
            try {
                await prisma.updateUser({data:{loginSecret}, where:{ email }});
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
};