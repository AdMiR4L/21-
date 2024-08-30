
import './Game.css';
import CubeIcon from "../assets/icons/cube.svg";
import GoalIcon from '../assets/icons/goal.svg';
import React, {Component} from "react";


function Skeleton(props) {
        if (props.circle)
        return(
            <div style={{width : props.width, height : props.height}} className="c-skeleton-circle"></div>
        )
        else if (props.border)
        return(
            <div style={{width : props.width, height : props.height, borderRadius: "15px"}} className="c-skeleton-line"></div>
        )
        else
        return(
            <div style={{width : props.width, height : props.height}} className="c-skeleton-line"></div>
        )
}

export default Skeleton;
