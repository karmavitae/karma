import express, { Request } from "express"
import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import { getMenuItems } from "../services/MenuBuilder"
import { IUser } from "../../../common/interfaces/iuser"
import { ILoginResult } from "../../../common/interfaces/ilogin"
import { authenticateUser } from "../services/UserManager"

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
        let result = {} as ILoginResult
        result.status = 200
        result.message = 'Successful'
        result.data = getMenuItems(req.user.user_type, req.user.first_name + ' ' + req.user.last_name)
        res.status(200).json(result)
      } else {
        console.log('should never reach here!')
        res.status(401).json({message: 'Check your username or password'})
      }
      next()
   }, function(err:any, req:any, res:any, next:any) {
      req.session.destroy((err:any)=>{console.log(err)})
      res.status(200).json({status: 401, message: err})
      next()
    }
)

router.post('/logout', function(req, res, next) {
  req.logout(function(err) { if (err) { return next(err); }});
  res.status(200).json({isLoggedOut: "true"})
})

export async function validateUserPassword(
req: Request, username: string, 
password: string, 
done: (arg0: string | null, arg1: IUser | boolean, arg2: { message: string }) => any ) 
{
  const result = await authenticateUser(username, password)
  if(result.status === 200){
    req.user = result.data
    return done(null, result.data, {message: "Authentication Successful"})
  }
  else {
    return done( result.message , false, {message: "User does not exits"})
  }
}

export default router


