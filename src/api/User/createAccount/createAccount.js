import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        createAccount: async(_, args, { request }) => {
            const { userName, email, firstName="", lastName="", bio="" } = args;
            const exists = await prisma.$exists.user({ 
                OR: [
                    {
                        userName
                    },
                    { email }
                ]
            });

            if(exists){
                throw Error('This userName OR email is already taken');
            }
            await prisma.createUser({
                userName,
                email,
                firstName,
                lastName,
                bio
            });
            return true;
        }
    }
};