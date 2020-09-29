import { act } from "react-dom/test-utils"

const menuItem = [{
    id:0,
    name:"Home",
    link:"/",
    isActive:true
},
{
    id:1,
    name:"학생회",
    link:"/council",
    isActive:false
},
{
    id:2,
    name:"선거",
    link:"/vote",
    isActive:false
},
{
    id:3,
    name:"공지사항",
    link:"/notice",
    isActive:false
},
{
    id:4,
    name:"로그인",
    link:"/login",
    isActive:false
},
]

const menu = (state = menuItem, action) => {
    
        switch (action.type) {
            case 'UPDATE_MENU':
                return state.map((menu)=>
                    menu.id === action.id ? {...menu, isActive:true} : {...menu, isActive:false}
                )
            case 'LOGIN_MENU':
                return state.map((menu)=>
                menu.id === 4 ? {...menu, name:"로그아웃", link:"/logout"} : {...menu, isActive:false}
            )
            case 'LOGOUT_MENU':
                return state.map((menu)=>
                menu.id === 4 ? {...menu, name:"로그인", link:"/login"} : {...menu, isActive:false}
            )
            default:
                return state
        }
  }
  
  export default menu