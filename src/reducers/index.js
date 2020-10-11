import { combineReducers } from 'redux'
import menu from './menu'
import voteMenu  from './vote/voteMenu'
import selectAll  from './selectForm/selectAll'
import selectCollege  from './selectForm/selectCollege'
import selectFlagData  from './selectForm/selectFlagData'
import voteCandidate  from './vote/voteCandidate'
import voteCandidateCollege  from './vote/voteCandidateCollege'
import votePledge  from './vote/votePledge'

export default combineReducers({
    menu,
    voteMenu,
    selectAll,
    selectCollege,
    selectFlagData,
    voteCandidate,
    voteCandidateCollege,
    votePledge,
})