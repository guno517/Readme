const selectAll = (state = [], action) => {
        switch (action.type) {
            case 'FETCH_SELECT_MENU':
                return action.data;
            default:
                return state
        }
  }
  
  export default selectAll