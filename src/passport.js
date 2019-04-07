// import './env'
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

export const authenticateJWT = (req, res, next) => 
    passport.authenticate('jwt', { session: false }, (error, user) => {
        if(user){
            req.user = user;
        }
        next();
    })(req, res, next);

passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();