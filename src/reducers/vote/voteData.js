const voteData = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_CANDIDATE_DATA_ALL':
            return action.data;
        case 'FETCH_VOTE_RESULT_DATA_ALL':
            return action.data;
        default:
            return state
    }
}

export default voteData;