const initState = {
    user: {
       victory: 0,
       defeat: 0,
       draw: 0 
    },
    computer: {
        victory: 0,
        defeat: 0,
        draw: 0
    }
}


export default function scoreReducer (state = initState, action) {
    switch(action.type) {
        case 'setScores': return {...state, ...action.payload};
        default: return state;
    }
}