const voteCandidate = (state = [], action) => {
        switch (action.type) {
            case 'FETCH_CANDIDATE_DATA_ALL':
                return action.data;
            default:
                return state
        }
  }
  
  export default voteCandidate