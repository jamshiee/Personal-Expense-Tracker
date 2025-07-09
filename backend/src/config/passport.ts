import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import * as dotenv from 'dotenv';
import { AppDataSource } from './ormconfig.js';
import { User } from '../entities/User.js';

dotenv.config();

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET!,
}, async (payload, done) => {
  const repo = AppDataSource.getRepository(User);
  const user = await repo.findOneBy({ id: payload.sub as string });
  return user ? done(null, user) : done(null, false);
}));

export default passport;
