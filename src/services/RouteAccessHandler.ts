import { NextFunction, Request, Response } from "express";

export function isRouteAllowed(route: string)
{
    return function (req: Request, res: Response, next: NextFunction) {
        console.log('Called', route)
    let user:any = req.user ? req.user : undefined
    let result = false
    if(user && req.isAuthenticated()) {
        let userType = Number(user['user_type'])
            switch(true) {
                case (userType < 20): {
                    if(['info', 'wiki', 'obj', 'pro'].includes(route)) {result = true}
                }
                case (userType > 20 && userType < 40): {
                    if(['info', 'wiki', 'obj', 'pro', 'rec'].includes(route)) {result = true}
                }
                case (userType > 39 && userType < 50): {
                    if(['info', 'wiki', 'obj', 'pro', 'ent'].includes(route)) {result = true}
                }
                case (userType > 49 && userType < 60): {
                    if(['info', 'wiki', 'obj', 'pro', 'rec', 'ent'].includes(route)) {result = true}
                }
                case (userType > 89 && userType < 100): {
                    if(['info', 'wiki', 'obj', 'pro', 'rec', 'ent', 'adm'].includes(route)) {result = true}
                }
            }
        }
        if(result) { next() }
        else { res.status(401).json({status: 401, message: "Please login"})}

    }

     
}