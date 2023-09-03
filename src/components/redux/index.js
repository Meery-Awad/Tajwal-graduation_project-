import { combineReducers } from "redux";
import data from './reducers';
import reminders from "./reducers";
import reducerBuisness from '../../Buisness/reducers/rootReducer'

const stor= combineReducers({
    data:reminders,
    dataB:reducerBuisness
})

export default stor;