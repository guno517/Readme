const voteDataCollege = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_CANDIDATE_DATA_COLLEGE':
            return action.data;
        case 'FETCH_RESULT_DATA_COLLEGE':
            return action.data;
        default:
            return state
    }
}

export default voteDataCollege