import { isAuthenticated } from "../../middlewares";
import { prisma } from '../../../generated/prisma-client';

export default {
    Mutation: {
        toggleLike: async(_, args, { request }) => {
            // 여기서 user 를 얻지 못하면 모든 function 이 stop
            isAuthenticated(request);
            const { postId } = args;
            const { user } = request;
            const filterOptions = {
                AND: [
                    {
                        user: {
                            id: user.id
                        }
                    },
                    {
                        post: {
                            id: postId
                        }
                    }
                ]
            };
            try {
                const existingLike = await prisma.$exists.like(filterOptions);
                if (existingLike){
                    // 이미 like 한 상태이면 
                    // To Do 
                    await prisma.deleteManyLikes(filterOptions);
                } else {
                    await prisma.createLike({
                        user: {
                            connect: {
                                id: user.id
                            }
                        },
                        post: {
                            connect: {
                                id: postId
                            }
                        } 
                    });
                }
                return true;
            } catch (error) {
                return false;
            }
        }
    }
}