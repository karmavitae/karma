import express, { Express, Request, Response } from 'express';
import InformationRoutes from './src/routes/InformationRoutes'
import UserRoutes from './src/routes/UserRoutes'
import AuthRoutes from './src/routes/AuthRoutes'
import WikiRoutes from './src/routes/WikiRoutes'
import AdminRoutes from './src/routes/AdmRoutes'
import ConnectMongoDBSession from 'connect-mongodb-session';
import session from 'express-session';
import passport from 'passport';
import mongoose from "mongoose";
import path from 'path'
import { mex } from './src/services/MetaProvider';

const server: Express = express();

const port = process.env['PORT'] || 4000;
const buildFiles = process.env['STATIC_FILES'] || '';
const uri = process.env['MONGO_URI'] || '';

const MongoDBStore = ConnectMongoDBSession(session)

mongoose.connect(uri).then(() => { 
console.log('Connected to MongoDB');}) .catch((err) => {
console.error('Error connecting to MongoDB:', err); });
const store = new MongoDBStore({ uri: uri, collection: 'sessions' })
store.on( 'error', (error)=>{ console.log(`MongodbStore Error: ${error}`) })    
  
  console.log(__dirname+'/dist/browser/index.html')
  server.use(express.json())
  server.use(passport.initialize())

  server.use(
    session({
      secret: 'ddlj',
      resave: false,
      saveUninitialized: false,
      store: store,
      cookie: {
        maxAge:  1000 * 60 * 60 * 24, // Session duration in milliseconds (e.g., 1 day)
      }
    })
  )
  server.use(passport.session())  

  server.use(passport.authenticate('session'))

  server.use(mex)
  server.use('/info', InformationRoutes);
  server.use('/auth', AuthRoutes);
  server.use('/user', UserRoutes);
  server.use('/wiki', WikiRoutes)
  server.use('/adm', AdminRoutes)

server.use(express.static(__dirname + '/dist/browser'))  

server.get('/', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname+ '/dist/browser/index.html'));
});



server.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname+ '/dist/browser/index.html'));
});


server.listen(port, () => {
console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
