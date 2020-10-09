const initialData = {
    college:0,
    major:''
}
const selectFlagData = (state = initialData, action) => {
    switch (action.type) {
        case 'SELECT_MENU_DATA':
            // 상위 select 가없으면 major 만 바꿈
            return action.college ? { ...state, college:action.college, major:action.major }:{ ...state, major:action.major };
        default:
            return state
    }
}

export default selectFlagData
