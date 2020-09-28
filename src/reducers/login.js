import { act } from "react-dom/test-utils";

const login = (state = {isLogined:false}, action) => {
        switch (action.type) {
            case 'LOGIN_SUCCESS':
                return {
                    isLogined:true,
                    id:action.id,
                    college:action.college,
                    department:action.department,
                }
            case 'LOGOUT_SUCCESS':
                return {
                    isLogined:false
                }

            default:
                return state
        }
    }
 
  export default login