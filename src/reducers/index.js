import { combineReducers } from 'redux'
import menu from './menu'
// import login from './login'
import voteMenu  from './vote/voteMenu'
import selectAll  from './selectForm/selectAll'
import selectCollege  from './selectForm/selectCollege'
import selectFlagData  from './selectForm/selectFlagData'
import voteDataCollege  from './vote/voteDataCollege'
import votePledge  from './vote/votePledge'
import voteData  from './vote/voteData'
import voteTurnOut  from './vote/voteTurnOut'
import voteTurnOutCollege  from './vote/voteTurnOutCollege'
export default combineReducers({
    menu,
    // login,
    voteMenu,
    selectAll,
    selectCollege,
    selectFlagData,
    voteDataCollege,
    votePledge,
    voteData,
    voteTurnOut,
    voteTurnOutCollege,
})