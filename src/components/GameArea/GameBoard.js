import React, { useEffect, useState } from 'react';
import Box from './Box';
import Scores from './Scores';
import { connect } from 'react-redux';
import s from './style.css';

const GameBoard = function GameBoard (props) {
    useEffect(() => {
        let check = setTimeout(() => isWin(), 500);
        return () => clearTimeout(check);
    });

    const [isShowText, setIsShowText] = useState(false);
    const [winnerText, setWinnerText] = useState("");
    const [newBoard, setNewBoard] = useState([]);
    const [newScores, setNewScores] = useState([]);
    let boxes = props.store.boxes;
    let isUserStep = props.store.isUserStep;

    //если есть сохраненная игра - получаем новый gameBoard
    if (!newBoard.length || !newScores.length) {
        fetch("http://localhost:8421/api.user.getstate", {
            method: "GET",
            credentials: "include"
        }).then(res => {
            if (res.status !== 200) return console.log("Error getting saves");
            else return res.json();
        }).then(data => {
            setNewBoard([data.gameBoard]);
            setNewScores([data.scores]);
            props.setGameBoard(data.gameBoard);
            props.setScores(data.scores);
        });
    }

    // возвращает стили для линии победителя
    const getLineStyles = () => {
        if (props.linePosition.horizontal) {
            return {
                opacity: 1,
                transform: 'rotate(-90deg)',
                height: '100%',
                top: props.linePosition.y
            }
        }
        else if (props.linePosition.diagonal) {
            return {
                opacity: 1,
                height: '140%',
                transform: props.linePosition.x === '0%' ? 'rotate(-45deg)' : 'rotate(45deg)',
                left: props.linePosition.x
            }
        }
        else if (props.linePosition.vertical){
            return {
                opacity: 1,
                height: '100%',
                left: props.linePosition.x
            }
        }
        else return {};
    }
    
    // проверяет, есть ли победитель и выполняет соответствующие действия
    const isWin = () => {
        let emptyBoxes = boxes.filter(box => box.value === null);
        if (props.store.isUserWin) {
            let scores = {
                user: {...props.scores.user, victory: +props.scores.user.victory + 1},
                computer: {...props.scores.computer, defeat: +props.scores.computer.defeat + 1}
            };
            props.setScores(scores);
            showWinText("You Win!!!");
            saveScores(scores);
        }
        if (props.store.isCompWin) {
            let scores = {
                user: {...props.scores.user, defeat: +props.scores.user.defeat + 1},
                computer: {...props.scores.computer, victory: +props.scores.computer.victory + 1}
            };
            props.setScores(scores);
            showWinText("Computer Win!!!");
            saveScores(scores);
        }
        else {
            if (!emptyBoxes.length && !props.store.isUserWin && !props.store.isCompWin) {
                let scores = {
                    user: {...props.scores.user, draw: +props.scores.user.draw + 1},
                    computer: {...props.scores.computer, draw: +props.scores.computer.draw + 1}
                };
                props.setScores(scores);
                showWinText("Draw!!!");
                saveScores(scores);
            } 
        }
    }
    // ход компьютера
    const compClickHandler = () => {
        if (!props.store.isUserWin || !props.store.isCompWin) {
            let emptyBoxes = [];
            boxes.map((box, index) => box.value === null && emptyBoxes.push(index));
            if (emptyBoxes.length) {
                let rand = Math.floor(Math.random() * emptyBoxes.length);
                setTimeout (() => {
                    props.clickComp(emptyBoxes[rand]);
                }, 1000);
            }
        }
    }
    // определяет, когда ходит компьютер
    !isUserStep && !props.store.isUserWin && !props.store.isCompWin && compClickHandler();

    // ход пользователя
    const userClickHandler = index => {
        if (!props.store.isUserWin || !props.store.isCompWin) {
            isUserStep && props.clickUser(index);
        }
    }

    // текст победителя
    const showWinText = text => {
        setWinnerText(text);
        setTimeout(() => {
            setIsShowText(true);
            props.resetGame();
        }, 500);
        
        setTimeout(() => {
            setIsShowText(false);
            setWinnerText("");
        }, 2000);
    }

    // записывает scores в базу данных при изменении scores
    const saveScores = scores => {
        fetch("http://localhost:8421/api.user.setstate", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({ scores: scores })
        })
        .then(res => {
            res.status !== 200 && console.error("Error updating scores!");
        });
    }

    // сохраняет игру 
    const saveGame = () => {
        let savedState = {gameBoard: props.store, scores: props.scores};
        fetch("http://localhost:8421/api.user.setstate", {
            method: "POST", 
            "credentials": "include",
            body: JSON.stringify(savedState)
        }).then(res => {
            if (res.status !== 200) return console.log('Error saving game');
            setWinnerText("Game is saved!");
            setIsShowText(true);
            setTimeout(() => {
                setIsShowText(false);
                setWinnerText("")
            }, 1000);
        });
    }
    return (
        <div>
            <div className={isShowText ? `${s.winText} ${s.show}` : s.winText}>{winnerText}</div>
            <Scores />
            <div className={s.gameBoard}>
                <div className={s.winLine} style={getLineStyles()}></div>
                {
                    boxes.map((box, index) => {
                        return <Box data={box} key={index} onClick={userClickHandler.bind(this, index)} />
                    })
                }
            </div>
            <div className={s.btnGroup}>
                <button onClick={saveGame} className={s.btnGroup__btn}>Save Game</button>
                <button onClick={props.logout} className={s.btnGroup__btn}>Log Out</button>
            </div>
        </div>
    );
}

export default connect(
    state => ({
        store: state.gameBoard, 
        scores: state.scores,
        linePosition: state.gameBoard.winLinePosition
    }),
    dispatch => ({
        clickUser: index => dispatch({type: 'clickUser', payload: index}),
        clickComp: index => dispatch({type: 'clickComp', payload: index}),
        resetGame: () => dispatch({type: 'reset'}),
        setScores: scores => dispatch({type: "setScores", payload: scores}),
        setGameBoard: newBoard => dispatch({type: "setGameBoard", payload: newBoard})
    })
)(GameBoard);