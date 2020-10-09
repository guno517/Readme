import { combineReducers } from 'redux'
import menu from './menu'
import voteMenu  from './vote/voteMenu'
import selectAll  from './selectForm/selectAll'
import selectCollege  from './selectForm/selectCollege'
import selectFlagData  from './selectForm/selectFlagData'

export default combineReducers({
    menu,
    voteMenu,
    selectAll,
    selectCollege,
    selectFlagData,
})