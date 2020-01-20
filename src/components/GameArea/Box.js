import React from 'react';
import s from './style.css';

const Box = props => <div className={s.box} {...props}>{props.data.value}</div>;
export default Box;