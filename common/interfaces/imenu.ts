export interface IMenu {
    name:string
    link:string
    isActive?:boolean
    contextMenu: Array<IContextMenuItem>   
  }
  
export interface IContextMenuItem {
  name:string
  link:string
  label:string,
  sub? : IContextMenuItem[]
}
  
export interface IMenuFrame {
  menus: IMenu[]
  actions: IMenu
}


// export interface ILoginMenu {
//   default: string
//   menu: IMenuFrame
// }