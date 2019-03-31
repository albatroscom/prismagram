import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { prisma } from '../generated/prisma-client';

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

// jwt를 가져와서 확인
const verifyUser = async(payload, done) => {
    try {
        const user = await prisma.user({ id: payload.id })
        if(user !== null) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error, null);
    }
};

passport.use(new Strategy(jwtOptions, verifyUser));