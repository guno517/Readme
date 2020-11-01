const voteTurnOut = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_VOTE_TURNOUT_DATA_ALL':
            return action.data;
        default:
            return state
    }
}

export default voteTurnOut;