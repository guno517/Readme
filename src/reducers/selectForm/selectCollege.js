const selectCollege = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_SELECT_MENU_COLLEGE':
            return action.data;
        default:
            return state
    }
}

export default selectCollege
