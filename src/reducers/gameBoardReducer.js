const initState = {
    boxes: [
        {value: null}, 
        {value: null}, 
        {value: null}, 
        {value: null}, 
        {value: null}, 
        {value: null},
        {value: null}, 
        {value: null}, 
        {value: null}
    ],
    isUserStep: true,
    isUserWin: false,
    isCompWin: false,
    winLinePosition: {
        horizontal: false,
        vertical: false,
        diagonal: false,
        x: 0,
        y: 0
    }
};

function checkWhoWin(state) {
    let box1 = state.boxes[0].value;
    let box2 = state.boxes[1].value;
    let box3 = state.boxes[2].value;
    let box4 = state.boxes[3].value;
    let box5 = state.boxes[4].value;
    let box6 = state.boxes[5].value;
    let box7 = state.boxes[6].value;
    let box8 = state.boxes[7].value;
    let box9 = state.boxes[8].value;

    if (box1 && box2 && box3 && box1 == box2 && box1 == box3) {
        let linePosition = {...state.winLinePosition, horizontal: true, y: '15%'}
        return box1 === 'x' ? {
            isUserWin: true, 
            winLinePosition: linePosition
        } : {
            isCompWin: true, 
            winLinePosition: linePosition
        };
    }
    if (box4 && box5 && box6 && box4 == box5 && box4 == box6) {
        let linePosition = {...state.winLinePosition, horizontal: true, y: '50%'}
        return box4 === 'x' ? {
            isUserWin: true,
            winLinePosition: linePosition
        } : {
            isCompWin: true,
            winLinePosition: linePosition
        };
    }
    if (box7 && box8 && box9 && box7 == box8 && box7 == box9) {
        let linePosition = {...state.winLinePosition, horizontal: true, y: '85%'}
        return box7 === 'x' ? {
            isUserWin: true,
            winLinePosition: linePosition
        } : {
            isCompWin: true,
            winLinePosition: linePosition
        };
    }
    if (box1 && box4 && box7 && box1 == box4 && box1 == box7) {
        let linePosition = {...state.winLinePosition, vertical: true, x: '15%'}
        return box1 === 'x' ? {
            isUserWin: true,
            winLinePosition: linePosition
        } : {
            isCompWin: true,
            winLinePosition: linePosition
        };
    }
    if (box2 && box5 && box8 && box2 == box5 && box2 == box8) {
        let linePosition = {...state.winLinePosition, vertical: true, x: '50%'}
        return box2 === 'x' ? {
            isUserWin: true,
            winLinePosition: linePosition
        } : {
            isCompWin: true,
            winLinePosition: linePosition
        };
    }
    if (box3 && box6 && box9 && box3 == box6 && box3 == box9) {
        let linePosition = {...state.winLinePosition, vertical: true, x: '85%'}
        return box3 === 'x' ? {
            isUserWin: true,
            winLinePosition: linePosition
        } : {
            isCompWin: true,
            winLinePosition: linePosition
        };
    }
    if (box1 && box5 && box9 && box1 == box5 && box1 == box9) {
        let linePosition = {...state.winLinePosition, diagonal: true, x: '0%'}
        return box1 === 'x' ? {
            isUserWin: true,
            winLinePosition: linePosition
        } : {
            isCompWin: true,
            winLinePosition: linePosition
        };
    }
    if (box3 && box5 && box7 && box3 == box5 && box3 == box7) {
        let linePosition = {...state.winLinePosition, diagonal: true, x: '100%'}
        return box3 === 'x' ? {
            isUserWin: true,
            winLinePosition: linePosition
        } : {
            isCompWin: true,
            winLinePosition: linePosition
        };
    }
    return {};
}

export default function gameBoardReducer (state = initState, action) {
    switch(action.type) {
        case 'clickUser': {
            state.boxes[action.payload] = {...state.boxes[action.payload], value:"x"}
            return {...state, isUserStep: false, ...checkWhoWin(state)}
        };
        case 'clickComp': {
            state.boxes[action.payload] = {...state.boxes[action.payload], value:"o"}
            return {...state, isUserStep: true, ...checkWhoWin(state)}
        };
        case 'setGameBoard': {
            return {...state, ...action.payload}
        }
        case 'reset': {
            let initBoxes = state.boxes.map(box => {return {...box, value: null}});
            return {
                ...state, 
                boxes: initBoxes, 
                isUserStep: true, 
                isUserWin: false, 
                isCompWin: false,
                winLinePosition: {...initState.winLinePosition}
            };
        }
        default: return state;
    }
}
