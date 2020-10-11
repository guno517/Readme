const votePledge = (state = [], action) => {
    switch (action.type) {
        case 'PLEDGE_CHANGE_DATA':
            console.log(action.data)
            return action.data;
        default:
            return state
    }
}

export default votePledge