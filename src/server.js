import './env';
import { GraphQLServer } from 'graphql-yoga';
import { prisma } from "../generated/prisma-client";
import logger from 'morgan';
import schema from './schema';
import './passport';
import { authenticateJWT } from './passport';

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({ 
    schema, 
    context: ({ request }) => ({ request })
});

server.express.use(logger('dev'));
// server.express.use(passport.authenticate('jwt')); // 모든 경로를 jwt로 보호한다.
// server.express.use('/api', passport.authenticate('jwt')); // 특정 경로만 인증을 거치고 싶을때는 
server.express.use(authenticateJWT);

server.start({port: PORT}, () => {
    console.log(`✅  Sever is running on localhost:${PORT}`)
});