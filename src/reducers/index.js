import { combineReducers } from 'redux'
import menu from './menu'
// import login from './login'
import voteMenu  from './vote/voteMenu'
import selectAll  from './selectForm/selectAll'
import selectCollege  from './selectForm/selectCollege'
import selectFlagData  from './selectForm/selectFlagData'
import voteCandidate  from './vote/voteCandidate'
import voteDataCollege  from './vote/voteDataCollege'
import votePledge  from './vote/votePledge'
import voteData  from './vote/voteData'

export default combineReducers({
    menu,
    // login,
    voteMenu,
    selectAll,
    selectCollege,
    selectFlagData,
    voteCandidate,
    voteDataCollege,
    votePledge,
    voteData,
})