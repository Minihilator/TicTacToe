import { combineReducers } from 'redux';
import gameBoardReducer from './gameBoardReducer';
import scoreReducer from './scoreReducer';

const rootReducers =  combineReducers({
    gameBoard: gameBoardReducer,
    scores: scoreReducer
});

export default rootReducers;