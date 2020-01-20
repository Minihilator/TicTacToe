import React from 'react';
import GameBoard from './GameBoard';

export default function GameArea (props) {
    return (
        <div id="gameArea"><GameBoard logout={props.logout} /></div>
    );
}