import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import config from "../../config/index.js";

const { PRIVATE_KEY } = config;

export const jwtLocal = new JwtStrategy(
  {
    secretOrKey: PRIVATE_KEY,
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  },
  (payload, done) => {
    done(null, payload)
  },
)

function cookieExtractor(req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["access_token"];
  }
  return token;
}