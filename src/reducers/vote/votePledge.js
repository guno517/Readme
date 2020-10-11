const votePledge = (state = [], action) => {
    switch (action.type) {
        case 'PLEDGE_CHANGE_DATA':
            return action.data;
        default:
            return state
    }
}

export default votePledge