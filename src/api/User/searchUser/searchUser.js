import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        searchUser: async(_, args) => {
            const { term } = args;

            if ( term.length > 0) {
                const user = prisma.users({
                    where: {
                        OR: [
                            { userName_contains: args.term },
                            { firstName_contains: args.term },
                            { lastName_contains: args.term }
                        ]
                }});
                return user;
            } else {
                throw Error("Please enter a character to search");
            }
        }
    }
}