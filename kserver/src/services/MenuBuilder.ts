import { IContextMenuItem, IMenu, IMenuFrame } from '../../common/interfaces/imenu'

const reception:IMenu[] = [
    { name: 'Join', link: 'join', contextMenu: []},
    { name: 'Sign in', link: 'login', contextMenu: []},
]

const userProfile:IMenu = {
    name: 'Account', link: 'Account', contextMenu: [
        {label: "Settings and Privacy", name: 'Settings and Privacy', link: '/settings'},
        {label: "Preferences", name: 'Preferences', link: '/preferences'},
        {label: "Sign Out", name: 'Sign Out', link: '/logout'},
    ]
}


const kvp:IMenu = 
    { name: 'KV Professional', link: 'kvp', contextMenu: [
        {label: 'Karma Arena', name: 'Karma Arena', link: 'kvp', sub: [] },
        {label: 'Profile', name: 'Profile', link: 'kvp/profile', sub: []},
        {label: 'Post', name: 'Posts', link: 'n/a', sub: [ 
            {label: 'Posts/Inbox', name: 'Inbox', link: 'kvp/inbox'}, 
            {label: 'Posts/Sent' ,name: 'Sent', link: 'kvp/sent'} ]},
        {label: 'Network', name: 'Network', link: 'kvp/networks', sub: []},
    ]
    }
    

const kvr:IMenu = { name: 'Recruitment', link: 'kvr', contextMenu:   [
        {label: 'Dashboard', name: 'Dashboard', link: 'kvr', sub: []},
        {label: 'Management', name: 'My Organization', link: 'kvr', sub: [
          {label: 'My Organization/Recruiters', name: 'Recruiters', link: 'kvr/user'},
          {label: 'My Organization/Departments', name: 'Departments', link: 'kvr/user'},
        ]},
        {label: 'Talent Pool', name: 'Talent Pool', link: 'kvr/posts', sub: []},
        {label: 'Jobs', name: 'Jobs', link: 'kvp/jobs', sub: []}
      ]
    }


const kve:IMenu = { name: 'Enterpirse', link: 'kve', contextMenu: [
        {label: 'Dashboard', name: 'Dashboard', link: 'kve', sub: []},
        {label: 'Talent Capital', name: 'Talent Capital', link: 'kvp/capital', sub: []},
      ]
    }


const kva:IMenu = { name: 'Administrator', link: 'kva', contextMenu: [
        {label: 'Dashboard', name: 'Dashboard', link: 'kva', sub: []},
        {label: 'Users', name: 'Users', link: 'kva/users', sub: []},
        {label: 'Services', name: 'Services', link: 'kvp/services', sub: []},
      ]
    }


export function getMenuItems(userType: number, userName:string):IMenuFrame {
    let result = {} as IMenuFrame
    result.menus = []
    result.actions = buildUserAccountMenu(userName)
    switch(userType) {
        case 10: { 
            kvp.isActive = true
            result.menus.push(kvp)
            break }
        case 11: { break }
        case 12: { break }
        case 20: {
            result.menus.push(kvp)
            let contextMenu:IContextMenuItem[] = []
            kvr.contextMenu.forEach((cmt:IContextMenuItem)=>{
                if(!(['Management'].includes(cmt.label))) {
                    contextMenu.push(cmt)
                }
            })
            result.menus.push({ name: 'Recruitment', link: 'kvr',isActive: true, contextMenu: contextMenu})
            break 
        }
        case 21: { 
            result.menus.push(kvp)
            result.menus.push(kvr)
            break 
        }
        case 22: { 
            result.menus.push(kvp)
            result.menus.push(kvr)
            break 
        }
        case 30: { 
            result.menus.push(kvp)
            let contextMenu:IContextMenuItem[] = []
            kve.contextMenu.forEach((cmt:IContextMenuItem)=>{
                if(!(['Management'].includes(cmt.label))) {
                    contextMenu.push(cmt)
                }
            })
            result.menus.push({ name: 'Enterprise', link: 'kve', isActive: true,  contextMenu: contextMenu})
            break 
        }
        case 31: { 
            result.menus.push(kvp)
            result.menus.push(kve)
            break 
        }
        case 32: { 
            result.menus.push(kvp)
            result.menus.push(kve)
            break 
        }
        case 90: { break }
        case 91: { break }
        case 92: { break }
        case 99: {
            result.menus.push(kvp)
            result.menus.push(kva)
            break 
        }
        default : {
            result.menus.push(kvp)
            result.menus = reception 
            break 
        }
    }
    return result
}

function buildUserAccountMenu(userName:string): IMenu {
   return {
        name: 'Account', link: 'Account', contextMenu: [
            {label: userName, name: userName, link: ''},
            {label: "Settings and Privacy", name: 'Settings and Privacy', link: '/settings'},
            {label: "Preferences", name: 'Preferences', link: '/preferences'},
            {label: "Sign Out", name: 'Sign Out', link: 'logout'},
        ]
    }
}