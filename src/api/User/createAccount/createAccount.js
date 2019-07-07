import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        createAccount: async(_, args, { request }) => {
            const { userName, email, firstName="", lastName="", bio="" } = args;
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