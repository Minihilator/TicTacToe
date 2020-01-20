import React from 'react';
import { connect } from 'react-redux';
import s from './style.css';

function Scores (props) {
    return (
        <div className={s.scores}>
            <div className={props.game.isUserStep ? `${s.scoresBlock} ${s.scoresBlock__active}` : s.scoresBlock}>
                <div className={s.scoresBlock__header}>User ( <span>X</span> )</div>
                <p>Побед: <span>{props.scores.user.victory}</span></p>
                <p>Поражений: <span>{props.scores.user.defeat}</span></p>
                <p>Ничьих: <span>{props.scores.user.draw}</span></p>
            </div>
            <div className={!props.game.isUserStep ? `${s.scoresBlock} ${s.scoresBlock__active}` : s.scoresBlock}>
                <div className={s.scoresBlock__header}>Computer ( <span>O</span> )</div>
                <p>Побед: <span>{props.scores.computer.victory}</span></p>
                <p>Поражений: <span>{props.scores.computer.defeat}</span></p>
                <p>Ничьих: <span>{props.scores.computer.draw}</span></p>
            </div>
        </div>
    );
}

export default connect(
    state => ({scores: state.scores, game: state.gameBoard}),
)(Scores);