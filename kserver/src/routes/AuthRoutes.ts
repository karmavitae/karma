import express, { Request, Response, NextFunction } from "express"
import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import { getMenuItems } from "../services/MenuBuilder"
import User from "../models/User"
import { IUser } from "../../../common/interfaces/iuser"

const router = express.Router()

passport.use(new LocalStrategy({passReqToCallback: true}, validateUserPassword))
passport.serializeUser(function(user:any, cb) {
    process.nextTick(function() {
      cb(null, 
        { id: user._id, 
          username: user.first_name + ' ' + user.last_name,
          userType: user.user_type,
        });
    });
  });
    
  passport.deserializeUser(function(user:any, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

router.get('/valid', (req, res, next)=>{
  if(req.isAuthenticated()) {
    console.log('checking auth status', req.isAuthenticated())
    res.status(200).json({isValid: 'true'})
  }else{
    res.status(200).send({isValid: 'false'})
  }
})

router.post('/login',
passport.authenticate('local', {
    failWithError: true }
  ), async (req:any, res:any, next:any) => {
      if(req.user) {
        // req.login(req.user, function(err: any) { if (err) { return next(err); }});
        res.status(200).json(getMenuItems(req.user.user_type, req.user.first_name + ' ' + req.user.last_name))
      } else {
        res.status(401).json({message: 'Check your username or password'})
      }
      next()
   }, function(err:any, req:any, res:any, next:any) {
      req.session.destroy((err:any)=>{console.log(err)})
      res.status(400).json({status: 401, message: err})
      next()
    }
)

router.post('/logout', function(req, res, next) {
  // req.session.destroy(function(err) { if (err) { return next(err); }})
  req.logout(function(err) { if (err) { return next(err); }});
  res.status(200).json({isLoggedOut: "true"})
})

export async function validateUserPassword(
req: Request, username: string, 
password: string, 
done: (arg0: string | null, arg1: IUser | boolean, arg2: { message: string }) => any ) 
{
const user = await User.findOne(
    {email: username}, 
    {first_name: 1, last_name: 1, kv_id: 1, status: 1, user_type: 1})
if(user) {
    req.user = user
    console.log("Information extracted: ", user)
    return done(null, user, {message: "Authentication Successful"})
} else {
    return done( 'the new error', false, {message: "User does not exits"})
}
}

export default router


