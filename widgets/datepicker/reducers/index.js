import * as ActionType from '../actions';
import Calendar from './calendar_reducer';
import {combineReducers} from 'redux'


let Reducer = combineReducers({
    calendar: Calendar
});


export default Reducer;