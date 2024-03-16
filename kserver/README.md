npm init -y
npm i expressim
npm i -D typescript @types/express @types/node

To generate tsconfig file 
npx tsc --init  

Configure outDis variable

create an Express server application (app.ts)  with ts extention ts


    const app: Express = express();

    const port = process.env['PORT'];
    const buildFiles = process.env['STATIC_FILES'];

    app.get('/', async (req: Request, res: Response) => {
        res.sendFile(path.join(buildFiles+'/index.html'));
    });

    app.get('*', (req: Request, res: Response) => {
        res.sendFile(path.join(buildFiles+'/index.html'));
    });


    app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });


npx ts-node src/index.ts  //start the application


Dev setup

npm i -D nodemon ts-node 

update package.json

{
  "scripts": {
    "build": "npx tsc",
    "start": "node dist/index.js",
    "dev": "nodemon src/index.ts"
  }
}

npm run dev