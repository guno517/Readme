const voteTurnOutCollege = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_TURNOUT_DATA_COLLEGE':
            return action.data;
        default:
            return state
    }
}

export default voteTurnOutCollege