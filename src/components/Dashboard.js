
import './Game.css';
import CubeIcon from "../assets/icons/cube.svg";
import GoalIcon from '../assets/icons/goal.svg';
import React, {Component} from "react";
import {useLocation} from "react-router-dom";


function Dashboard(){
    const location = useLocation();
    const date = new Date();
    return(
        <div onClick={()=>console.log(date)}>asdasdasdasdsadsadasd</div>
    )
}

export default Dashboard;
