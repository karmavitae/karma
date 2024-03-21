export interface INetwork {
    _id:any
    user:any
    connections:Array<IConnection>
}


export interface IConnection {
    user_id:any
    name:string
}