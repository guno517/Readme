const initialData = {
    college:0,
    collegeName:"총학생회",
    majorName:"총학생회",
    major:''
}
const selectFlagData = (state = initialData, action) => {
    switch (action.type) {
        case 'SELECT_MENU_DATA':
            // 상위 select 가없으면 major 만 바꿈
            return action.college !== undefined && action.college !== null && action.college !== "" ? { ...state, college:action.college, collegeName:action.collegeName, major:action.major, majorName:action.majorName}:{ ...state, major:action.major, majorName:action.majorName};
        default:
            return state
    }
}

export default selectFlagData
