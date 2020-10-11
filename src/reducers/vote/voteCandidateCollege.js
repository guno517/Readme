const voteCandidateCollege = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_CANDIDATE_DATA_COLLEGE':
            return action.data;
        default:
            return state
    }
}

export default voteCandidateCollege