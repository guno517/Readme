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
}]

const menu = (state = menuItem, action) => {
    
    switch (action.type) {
        case 'UPDATE_MENU':
            return state.map((menu)=>
                    menu.id === action.id ? {...menu, isActive:true} : {...menu, isActive:false}
                )
        default:
            return state
    }
  }
  
  export default menu