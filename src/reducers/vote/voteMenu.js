import { act } from "react-dom/test-utils"

const menuItem = [{
    id:0,
    link:"/vote",
    name:"선거 공지",
    isActive:true,
    activeColor:'rgb(90, 130, 190)',
    isNotActiveColor:"black",
    componentName:"VoteInfo"
},
{
    id:1,
    link:"/vote",
    name:"입후보",
    isActive:false,
    activeColor:'rgb(90, 130, 190)',
    isNotActiveColor:"black",
    componentName:"VoteCandidate"
},
{
    id:2,
    link:"/vote",
    name:"선거 결과",
    isActive:false,
    activeColor:'rgb(90, 130, 190)',
    isNotActiveColor:"black",
    componentName:"VoteResult"
},
]

const voteMenu = (state = menuItem, action) => {
    
        switch (action.type) {
            case 'VOTE_UPDATE_MENU':
                return state.map((menu)=>
                    menu.id === action.id ? {...menu, isActive:true} : {...menu, isActive:false}
                )
            default:
                return state
        }
  }
  
  export default voteMenu