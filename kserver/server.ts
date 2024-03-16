import express, { Express, Request, Response } from 'express';
import InformationRoutes from './src/routes/InformationRoutes'
import UserRoutes from './src/routes/UserRoutes'
import AuthRoutes from './src/routes/AuthRoutes'
import ObjectRoutes from './src/routes/ObjectRoutes'
import ConnectMongoDBSession from 'connect-mongodb-session';
import session from 'express-session';
import passport from 'passport';
import mongoose from "mongoose";
import path from 'path'

const server: Express = express();

const port = process.env['PORT'] || 4000;
// const buildFiles = process.env['STATIC_FILES'];
const buildFiles = '/Users/sthakur/Projects/ENVZN/karma/kclient/dist/kclient/browser'
// const uri = process.env['MONGO_TEST_URI'] || ''

 

//   mongoose.connect(uri, {}).then(() => { 
//     console.log('Connected to MongoDB');}) .catch((err) => {
//     console.error('Error connecting to MongoDB:', err); });
//   const MongoDBStore = ConnectMongoDBSession(session)
//   var store = new MongoDBStore({ uri: uri, collection: 'sessions' })
//   store.on( 'error', (error)=>{ console.log(`MongodbStore Error: ${error}`) })

//   server.use(express.json())
//   server.use(passport.initialize())

//   server.use(
//     session({
//       secret: 'ddlj',
//       resave: false,
//       saveUninitialized: false,
//       store: store,
//       cookie: {
//         maxAge:  1000 * 60 * 60 * 24, // Session duration in milliseconds (e.g., 1 day)
//       }
//     })
//   )
//   server.use(passport.session())  

  // Example Express Rest API endpoints
  // server.use('/api/**', InformationRoutes);
  // server.use(passport.authenticate('session'))
//   server.use((req, res, next) => {
//     res.locals['isAuthenticated'] = req.isAuthenticated()
//     console.log('Session data: ', req.session, req.user)
//     console.log('user data: ', req.user)
//     console.log("Authentication status: ", req.isAuthenticated())
//     next()
//   })
  server.use('/api/**', InformationRoutes);
  server.use('/info', InformationRoutes);
  server.use('/auth', AuthRoutes);
  server.use('/user', UserRoutes);
  server.use('/obj', ObjectRoutes);
  

server.get('/', async (req: Request, res: Response) => {
    res.sendFile(path.join(buildFiles+'/index.html'));
});

server.get('*.*', express.static(buildFiles, {
    maxAge: '1y'
  }));

server.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(buildFiles+'/index.html'));
});


server.listen(port, () => {
console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});