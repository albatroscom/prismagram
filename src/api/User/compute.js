import { prisma } from "../../../generated/prisma-client";

export default {
    User: {
        fullName: parent => {
            return `${parent.firstName} ${parent.lastName}`;
        },
        amIFollowing: async(parent, _, {request}) => {
            const { user } = request;
            const { id: parentId } = parent;
            try {
                const exist = await prisma.$exists.user({
                    AND: [{ id: parentId}, { followers_some: [user.id] }]
                });
                console.log('exist : ', exist);
                if(exist){
                    return true;
                } else {
                    return false;
                }
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        itsMe: (parent, _, {request}) => {
            const { user } = request;
            const { id: parentId } = parent;
            return user.id === parentId; // 요청하는 사람(request)이 같으면 내 프로필을 요청하는 것
        }
    }
};