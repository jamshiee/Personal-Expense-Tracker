import passport from '../config/passport.js';
export const jwtAuth = passport.authenticate('jwt', { session: false });
