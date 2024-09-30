
import './Game.css';
import CubeIcon from "../assets/icons/cube.svg";
import GoalIcon from '../assets/icons/goal.svg';
import EmptyIcon from '../assets/empty.svg';
import ScenarioIcon from '../assets/scenario.svg';
import React, {useEffect, useState} from "react";
import Avatar from "../assets/avatar.png";
import LevelIcon from "../assets/icons/level.svg";
import Paying from "../assets/paying.svg";
import Sadad from "../assets/pay-s.svg";
import ZarinPal from "../assets/zarinpal.svg";
import Gift from "../assets/gift.svg";
import FAQImage from "../assets/faq.png";
import Breadcrumb from "../layouts/Breadcrumb";
import axios from "axios";
import {json, Link, useParams} from 'react-router-dom';
import Modal from "react-bootstrap/Modal";
import ConvertToShamsiDate from "./ConverToShamsiDate";
import toast from "react-hot-toast";
import Skeleton from "./Skeleton";
import FAQ from "../layouts/FAQ";

function Game(props) {
    const { id } = useParams();
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.authToken}
    const [game, setGame] = useState();
    const [reserves, setReserves] = useState();
    const [unavailable, setUnavailable] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedChairs, setSelectedChairs] = useState([]);
    const [showReserveModal, setShowReserveModal] = useState(false);
    const [showScenarioModal, setShowScenarioModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [godInput, setGodInput] = useState({name : null, id : null});
    const [scenariosInput, setScenariosInput] = useState({});
    const [showScenariosInput, setShowScenariosInput] = useState(false);
    const [scenarios, setScenarios] = useState();

    const [priceInput, setPriceInput] = useState();
    const [gradeInput, setGradeInput] = useState("");
    const [userSearchResults, setUserSearchResults] = useState([]);
    const [userSearchLoading, setUserSearchLoading] = useState(false);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [showGradeInput, setShowGradeInput] = useState(false);
    const [sendDataLoading, setSendDataLoading] = useState(false);
    const [showLogModal, setShowLogModal] = useState(false);
    const [logLoading, setLogLoading] = useState(false);
    const [logs, setLogs] = useState({});

    // Game Setting Modal
    const [showGameSettingModal, setShowGameSettingModal] = useState(false);
    const [selectedCharacters, setSelectedCharacters] = useState({});
    const [chosableCharacters, setChosableCharacters] = useState({});
    const [showReservedUserSelectCharacter, setShowReservedUserSelectCharacter] = useState({});
    const [usersCharacter, setUsersCharacter] = useState([]);



    // Game Score Modal
    const [showGameScoresModal, setShowGameScoresModal] = useState(false);
    const [usersGameScore, setUsersGameScore] = useState([]);
    const [showMVPDropDown, setShowMVPDropDown] = useState(false);
    const [MVPInput, setMVPInput] = useState();
    const [winSide, setWinSide] = useState([false, false, false]);
    const [confirmPopUp, setConfirmPopUp] = useState(false);
    const [noPaymentLoading, setNoPaymentLoading] = useState(false);
    const [userReserveIdForRemoving, setUserReserveIdForRemoving] = useState();
    const [tableChairCount, setTableChairCount] = useState();

    const chooseWinSide = (index) => {
        if (index === 2) {
            // Toggle the third item
            setWinSide(prevState => {
                const newSelection = [...prevState];
                newSelection[index] = !prevState[index];
                return newSelection;
            });
        } else {
            // For the first two items, allow only one to be selected
            setWinSide(prevState => {
                const newSelection = [false, false, ...prevState.slice(2)];
                newSelection[index] = true;
                return newSelection;
            });
        }
    };

    function payWithZarinPal(){
        setSendDataLoading(true)
            axios.post(process.env.REACT_APP_API+'game/payment/attempt',
                {
                    game_id : game.id ?? null,
                    chair_no : selectedChairs ? JSON.stringify(selectedChairs) : null,
                    amount : selectedChairs.length ?? null,
                }, {headers : headers})
                .then((response) => {
                    if (response.data.status === 100) {
                         window.location.href = `https://www.zarinpal.com/pg/StartPay/${response.data.authority}`;
                    }
                    else {
                        console.log(response.data)
                        toast.error(response.data)
                    }
                })
                .catch((error) =>{
                    if (error.response.data.message)
                        toast.error(error.response.data.message)
                    else
                    toast.error("پاسخی از بانک دریافت نشد، لطفا دوباره تلاش کنید")
                    setSendDataLoading(false);
            });
    }


    const [scenarioMafiaCount, setScenarioMafiaCount] = useState();
    const [scenarioCitizenCount, setScenarioCitizenCount] = useState();


    const counter = (type, symbol) => {
        if (type === 'mafia') {
            setScenarioMafiaCount(prevCount => symbol === '+' ? prevCount + 1 : Math.max(prevCount - 1, 0));
        } else if (type === 'citizen') {
            setScenarioCitizenCount(prevCount => symbol === '+' ? prevCount + 1 : Math.max(prevCount - 1, 0));
        }
    };

    const [showCharacterDescription, setShowCharacterDescription] = useState([]);
    const toggleDescription = (id) => {
        setShowCharacterDescription(prevState => {
            // If the currently clicked character's description is true, set all to false
            const isActive = prevState[id];
            const newState = Object.keys(prevState).reduce((acc, key) => {
                acc[key] = false; // Default all to false
                return acc;
            }, {});
            if (!isActive) {
                newState[id] = true;
            }
            return newState;
        });
    };
    const toggleSelectCharacterForUser = (index) => {
        setShowReservedUserSelectCharacter(prevState => {
            // If the currently clicked character's description is true, set all to false
            const isActive = prevState[index];
            const newState = Object.keys(prevState).reduce((acc, key) => {
                acc[key] = false; // Default all to false
                return acc;
            }, {});
            if (!isActive) {
                newState[index] = true;
            }
            return newState;
        });
    };



    function userScoreCounter(userID, symbol){
        setUsersGameScore(prevScores => {
            // Find the current score for the specific user
            const currentScore = prevScores[userID] || 0;

            // Update the score based on the symbol, with a max of 10 and min of 0
            const updatedScore = symbol === '+'
                ? Math.min(currentScore + 1, 10) // Increment but don't exceed 10
                : Math.max(currentScore - 1, 0); // Decrement but don't go below 0

            // Return a new state object with the updated score
            return {
                ...prevScores,        // Spread the previous state
                [userID]: updatedScore // Update the score for the specific user
            };
        });
    }
    function getGame() {
        axios.get( process.env.REACT_APP_API + "games/"+id)
            .then(response => {
                setGame(response.data.game)
                setReserves(response.data.reserves)
                if (Array.isArray(response.data.reserves) && response.data.reserves.length) {
                    response.data.reserves.forEach(item => {
                        setUsersGameScore(prevState => ({
                            ...prevState,
                            [item.user_id]: 0,
                        }));
                    });
                }
                setUnavailable(response.data.unavailable);
                setPriceInput(response.data.game.price);
                setGodInput(response.data.game.god_id ? response.data.game.god.name : "");
                setGradeInput(response.data.game.grade);
                setScenarios(response.data.scenarios);
                setMVPInput(response.data.game.mvp);
                if (response.data.game.game_scenario){
                    const citizen = response.data.game.scenario.characters.find(obj => obj.id === 16);
                    const mafia = response.data.game.scenario.characters.find(obj => obj.id === 5);
                    setScenarioCitizenCount(citizen ? citizen.pivot.count : "");
                    setScenarioMafiaCount(mafia ? mafia.pivot.count : 0);
                    setSelectedCharacters(response.data.game.scenario.characters)
                    if (response.data.game.game_characters){
                        //setChosableCharacters(JSON.parse(response.data.game.game_characters))
                        setSelectedCharacters(JSON.parse(response.data.game.game_characters))
                        const citizen = JSON.parse(response.data.game.game_characters).find(obj => obj.id === 16);
                        const mafia = JSON.parse(response.data.game.game_characters).find(obj => obj.id === 5);
                        setScenarioCitizenCount(citizen ? citizen.count : "");
                        setScenarioMafiaCount(mafia ? mafia.count : 0);
                    }
                    else{
                        setChosableCharacters(response.data.game.scenario.characters.map((character, index) => {
                            return {
                                ...character,
                                count: character.pivot.count
                            };
                        }))
                    }
                    // console.log(response.data.reserves)
                    setScenariosInput(response.data.game.scenario)
                    setShowCharacterDescription(
                        response.data.game.scenario.characters.reduce((acc, character) => {
                            acc[character.id] = false;
                            return acc;
                        }, {})
                    );
                    if (response.data.reserved)
                        setShowReservedUserSelectCharacter(response.data.reserved.map((index) => false))
                }
                if (response.data.game.god_id)
                    setGodInput(response.data.game.god)
                if (response.data.histories)
                    setUsersCharacter(response.data.histories)
                if (response.data.game.history)
                    response.data.game.history.forEach(user => {
                        setUsersGameScore(prevState => ({
                            ...prevState,
                            [user.user_id]: user.score,
                        }));
                    });
                if (response.data.game.win_side !== undefined && response.data.game.win_side !== null) {
                    const newWinSide = [false, false, false];
                    // Check if win_side is an array
                    if (Array.isArray(response.data.game.win_side)) {
                        // Update the relevant indices in the newWinSide array to true
                        response.data.game.win_side.forEach(side => {
                            if (side >= 0 && side < newWinSide.length) {
                                newWinSide[side] = true;
                            }
                        });
                    } else {
                        // If win_side is a single value, update the relevant index to true
                        if (response.data.game.win_side >= 0 && response.data.game.win_side < newWinSide.length) {
                            newWinSide[response.data.game.win_side] = true;
                        }
                    }
                    // Set the state with the updated array
                    setWinSide(newWinSide);
                }
                if (localStorage.authToken && localStorage.getItem("userDetails"))
                    setTimeout(() => getUserVisitLog(response.data.game.id), 500)
                setIsLoading(false)
            })
            .catch(error => {
                console.log(error)
            });


    }

    function editGame() {
        setSendDataLoading(true);

        axios.post(process.env.REACT_APP_API+'game/edit',
            {
                    game_id : game.id ?? null,
                    god_id : godInput.id ?? null,
                    grades : gradeInput ?? null,
                    price : priceInput ?? null,
                    game_scenario : scenariosInput.id ?? null,
                }, {headers : headers})
            .then((response) => {
                toast.success(response.data);
                setShowEditModal(false);
                setTimeout(() => {getGame()}, 500)
                setSendDataLoading(false)
            })
            .catch((error) =>{

                setSendDataLoading(false)
            });
        }



    function removeUserFromGame(id) {


        setSendDataLoading(true);
        axios.post(process.env.REACT_APP_API+'game/user/remove',
            {
                reserve_id : userReserveIdForRemoving,
            }, {headers : headers})
            .then((response) => {
                toast.success(response.data);
                setTimeout(() => {getGame()}, 500)
                setSendDataLoading(false)
                setConfirmPopUp(false)
            })
            .catch((error) =>{

                setSendDataLoading(false)
        });
    }


    function changeGameCharacters() {
       const temp = selectedCharacters.map((character) => {
           return {
               ...character,
               count: character.id === 16
                   ? scenarioCitizenCount
                   : character.id === 5
                       ? scenarioMafiaCount
                       : character.pivot.count
           };
       });
       const minus = temp.find(character => character.id === 5) ? 2 : 1;
        setSendDataLoading(true)
        // console.log("TEMP LE",temp.length)
        // console.log("MAFIA",scenarioMafiaCount)
        // console.log("CITIZEN",scenarioCitizenCount)
        axios.post(process.env.REACT_APP_API+'game/change/characters',
            {
                game_id : game.id ?? null,
                capacity : temp.length - minus + scenarioMafiaCount + scenarioCitizenCount,
                characters : JSON.stringify(temp),
            }, {headers : headers})
            .then((response) => {
                toast.success(response.data);
                setShowEditModal(false);
                setTimeout(() => {getGame()}, 500)
                setSendDataLoading(false)
            })
            .catch((error) =>{

                setSendDataLoading(false)
            });
    }


    function changeGrade(grade){
        let temp = ""
        if (gradeInput.includes(grade))
            temp = gradeInput.split("-").filter(item => item !== grade).join("-");
        else
            temp = gradeInput.split("-").concat(grade).join("-")
        setGradeInput(temp);
    }
    function searchUser(value) {
        setGodInput({name : value})
        setUserSearchLoading(true)
        setTimeout(() =>{
            if (value.length > 3){
                axios.post(process.env.REACT_APP_API+'find/user', {username : value})
                    .then((response) => {
                        console.log(response);
                        setUserSearchResults(response.data)
                        setUserSearchLoading(false);
                        setTimeout(() => { setShowSearchResults(true)}, 500)
                    })
                    .catch((error) =>{

                    });
            }
        }, 500)
    }

    function handleChairClick (index){
        console.log(selectedChairs)
        setSelectedChairs((prevSelectedChairs) => {
            if (prevSelectedChairs.includes(index)) {
                // Remove chair from selected list if already selected
                return prevSelectedChairs.filter(chair => chair !== index);
            } else {
                // Add chair to selected list if not selected
                return [...prevSelectedChairs, index];
            }

        });
    }

    // function selectCharacters (index){
    //     console.log(selectedCharacters)
    //     setSelectedCharacters((prevSelectedCharacters) => {
    //         if (prevSelectedCharacters.includes(index))
    //             return prevSelectedCharacters.filter(character => character !== index);
    //          else
    //             return [...prevSelectedCharacters, index];
    //     });
    // }

    function selectCharacters(character) {
        setSelectedCharacters((prevSelectedCharacters) => {
            if (prevSelectedCharacters.some(selectedCharacter => selectedCharacter.id === character.id)) {
                // If the character is already selected, remove it from the selectedCharacters array
                return prevSelectedCharacters.filter(selectedCharacter => selectedCharacter.id !== character.id);
            } else {
                // If the character is not selected, add it to the selectedCharacters array
                return [...prevSelectedCharacters, character];
            }
        });
    }


    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    function shuffleCharacters() {
        setUsersCharacter([]);
        setChosableCharacters(
            selectedCharacters.map((character) => {
                return {
                    ...character,
                    count: character.id === 16
                        ? scenarioCitizenCount
                        : character.id === 5
                            ? scenarioMafiaCount
                            : character.pivot.count
                };
            })
        );

        shuffle(chosableCharacters)
        let lastAssignedRole = null
        reserves.forEach(reserve => {
            for (let i = 0; i < chosableCharacters.length; i++) {
                if (chosableCharacters[i].count > 0 && chosableCharacters[i].id !== lastAssignedRole) {
                    // setUsersCharacter(prevState => [
                    //     ...prevState, // Spread the previous state (array of assigned roles)
                    //     {
                    //         user_id: reserve.user_id, // Add the new role assignment
                    //         role: chosableCharacters[i].name
                    //     }
                    // ]);
                    setUsersCharacter(prevState => ({
                        ...prevState,  // Spread the previous state to keep existing mappings
                        [reserve.user_id]: chosableCharacters[i].id  // Assign role id to the user id
                    }));
                    lastAssignedRole = chosableCharacters[i].id;
                    chosableCharacters[i].count--;  // Decrease the count as it is assigned
                    break;  // Move to the next user after assigning a role
                }
            }
        });
    }

    function changeUserCharacters(character, user, index) {
        if (Object.keys(usersCharacter).length) {
            // Update existing user-character mapping
            setUsersCharacter(prevState => ({
                ...prevState,
                [user]: character  // Use [user] to set the key dynamically
            }));
        } else {
            // Add the first user-character mapping
            setUsersCharacter({
                [user]: character  // Use [user] to set the key dynamically
            });
        }
        toggleSelectCharacterForUser(index)
    }


    function noPaymentReserveAttempt () {

        const data = {
            game_id : id,
            chair_no : JSON.stringify(selectedChairs),}
        console.log(data)
        setNoPaymentLoading(true)
        axios.post(process.env.REACT_APP_API+'game/reserve/attempt', data ,{
            headers: headers
        })
            .then((response) => {
                console.log("Reserve Detail ->", response);
                toast.success(response.data)
                setNoPaymentLoading(false)
                setTimeout(() =>{getGame()}, 500)
                setShowReserveModal(false)
                setSelectedChairs([])
            })
            .catch((error) =>{
                //console.log(this.state.registerRequest)
                if (error.response && error.response.data.message)
                    toast.error( error.response.data.message)
                else if (error.response.data)
                    toast.error( error.response.data)
                else
                    toast.error(" خطا، لطفا دوباره تلاش کنید")
                setNoPaymentLoading(false)
            });
    }


    function saveUsersCharacter (){
        setSendDataLoading(true);
        axios.post(process.env.REACT_APP_API+'game/setting',
            {
                users_character : usersCharacter ?? null,
                game_id : game.id ?? null,
                game_scenario : game.game_scenario ?? null,
            }, {headers : headers})
            .then((response) => {
                toast.success(response.data);
                setShowEditModal(false);
                setTimeout(() => {getGame()}, 500)
                setSendDataLoading(false)
            })
            .catch((error) =>{
                setSendDataLoading(false)
            });
    }


    function saveUsersScore (){
        setSendDataLoading(true);
        axios.post(process.env.REACT_APP_API+'game/scores',
            {
                scores : usersGameScore ?? null,
                game_id : game.id ?? null,
                mvp : MVPInput ?? null,
                side : winSide ?? null,
            }, {headers : headers})
            .then((response) => {
                toast.success(response.data);
                setShowGameScoresModal(false);
                setTimeout(() => {getGame()}, 500)
                setSendDataLoading(false)
            })
            .catch((error) =>{
                setSendDataLoading(false)
            });
    }



    function sendUsersCharacter() {
        setSendDataLoading(true);
        axios.post(process.env.REACT_APP_API+'game/send/characters',
            {
                userCharacters : usersCharacter ?? null,
                game_id : game.id ?? null,
            }, {headers : headers})
            .then((response) => {
                toast.success(response.data);
                setShowGameScoresModal(false);
                setTimeout(() => {getGame()}, 500)
                setSendDataLoading(false)
                console.log(response)
            })
            .catch((error) =>{
                toast.error("لطفا قبل از ارسال نقش اطلاعات را ذخیره کنید")
                setSendDataLoading(false)
            });
    }

    function userVisitLog() {
        setLogLoading(true);
        axios.post(process.env.REACT_APP_API+'game/roles/visit',
            {
                game_id : game.id ?? null,
            }, {headers : headers})
            .then((response) => {
                setLogLoading(false)
                setTimeout(() => getUserVisitLog(game.id), 500)

            })
            .catch((error) =>{
              console.log(error)
                setLogLoading(false)
            });
    }
    function getUserVisitLog(id) {
        setLogLoading(true);
        axios.get(process.env.REACT_APP_API+'game/visit/logs',
            {
               params : {
                   game_id : id,
               },
               headers : headers
            })
            .then((response) => {
                setLogLoading(false)
                setLogs(response.data)
            })
            .catch((error) =>{
                console.log(error)
                setLogLoading(false)
            });
    }



    // const assignRandomCharacterToReservedUsers = () => {
    //     if (selectedCharacters.length > 0) {
    //         const newAssignments = {};
    //         reserves.forEach(reserve => {
    //             const randomIndex = Math.floor(Math.random() * selectedCharacters.length);
    //             const randomCharacter = selectedCharacters[randomIndex];
    //             newAssignments[reserve.user.id] = randomCharacter.id;
    //         });
    //         setUsersCharacter(prevState => ({
    //             ...prevState,
    //             ...newAssignments
    //         }));
    //         console.log('Assigned random characters to reserved users:', newAssignments);
    //     } else {
    //         console.log("No characters are available to assign.");
    //     }
    // };


    useEffect(() => {
        getGame()
        document.title = '21+ Game Reservation'
        window.scrollTo(0, 0);
        //console.log(game.god)
    }, []);



    return (

        <div className="container">
            {confirmPopUp ?
                <div className="confirm-popup-container">
                    <div className="confirm-popup">
                        <div className="message">
                            آیا از حذف کاربر اطمینان دارید؟
                            <div className="user">{reserves.find(obj => obj.id === userReserveIdForRemoving).user.name+" "+reserves.find(obj => obj.id === userReserveIdForRemoving).user.family}</div>
                        </div>
                        <ul className="confirm">
                            <li className="item" onClick={() => setConfirmPopUp(false)}>خـیــر</li>
                            <li className="item danger" onClick={() => removeUserFromGame()}>بـلــه</li>
                        </ul>
                    </div>
                </div>

                : null
            }

            {!isLoading?
                <>
                    <Modal show={showReserveModal} onHide={() => setShowReserveModal(!showReserveModal)} centered className="cube-info-modal custom-modal">
                        <Modal.Header>
                            <Modal.Title>
                                <span> برنامه مافیا سالن</span>
                                <span  className="ml-auto">  {game.salon === "1" ? "اول" :
                                    game.salon === "2" ? "دوم"
                                        : "سوم"}</span>
                            </Modal.Title>
                            <svg onClick={() => setShowReserveModal(!showReserveModal)}
                                 className="modal-cross-icon" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 211 211">
                                <path
                                    d="M105.5,0C47.23,0,0,47.23,0,105.5s47.23,105.5,105.5,105.5,105.5-47.23,105.5-105.5C210.93,47.26,163.74.07,105.5,0ZM146.18,132.63c3.81,3.68,3.92,9.75.24,13.56-3.68,3.81-9.75,3.92-13.56.24-.08-.08-.16-.16-.24-.24l-27.12-27.13-27.12,27.13c-3.81,3.68-9.88,3.57-13.56-.24-3.59-3.72-3.59-9.61,0-13.33l27.12-27.13-27.12-27.13c-3.81-3.68-3.92-9.75-.24-13.56,3.68-3.81,9.75-3.92,13.56-.24.08.08.16.16.24.24l27.12,27.13,27.12-27.13c3.68-3.81,9.75-3.92,13.56-.24,3.81,3.68,3.92,9.75.24,13.56-.08.08-.16.16-.24.24l-27.12,27.13,27.12,27.13Z"/>
                            </svg>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="modal-mafi">
                                <div className="info modal-mafia-info">
                                    <div className="d-flex justify-content-between align-items-center w-100">
                                        <ul className="mafia-info">
                                            <li className="item">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480">
                                                    <path
                                                        d="M479.82,144h-95.82c-35.35,0-64-28.65-64-64V0h-192C57.3,0,0,57.3,0,128v224c0,70.7,57.3,128,128,128h224c70.7,0,128-57.3,128-128v-203.14c0-1.62-.06-3.25-.18-4.86ZM216,336h-96c-8.84,0-16-7.16-16-16s7.16-16,16-16h96c8.84,0,16,7.16,16,16s-7.16,16-16,16ZM360,240H120c-8.84,0-16-7.16-16-16s7.16-16,16-16h240c8.84,0,16,7.16,16,16s-7.16,16-16,16Z"/>
                                                    <path
                                                        d="M384,112h84.32c-2.51-3.57-5.41-6.9-8.65-9.93l-90.92-84.86c-4.99-4.66-10.66-8.46-16.75-11.28v74.06c0,17.67,14.33,32,32,32Z"/>
                                                </svg>
                                                <span className="attr">سناریو </span>
                                                <span></span>
                                                <span className="val">
                                         {game.game_scenario ?
                                             game.scenario.name
                                             :
                                             "در انتظار"
                                         }
                                    </span>
                                                {game.game_scenario ?
                                                    <svg onClick={() => setShowScenarioModal(true)} className="q-mark"
                                                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                        <path
                                                            d="M256.8,0C114.8-.4-.4,114.8,0,256.8c.4,140.4,117.5,255.2,257.9,255.2h254.1v-254.1C512,117.5,397.2.4,256.8,0ZM278.8,386.4c-6.7,5.9-15,8.9-25,8.9s-18.3-3-25-8.9-10-13.5-10-22.7,3.3-16.8,10-22.7,15-8.9,25-8.9,18.3,3,25,8.9,10,13.5,10,22.7-3.4,16.7-10,22.7ZM338,219.1c-4.1,8.5-10.7,17.2-19.8,26l-21.5,20c-6.1,5.9-10.4,11.9-12.7,18.1-2.4,6.2-3.7,14-3.9,23.5h-53.6c0-18.2,2.1-32.6,6.2-43.1,4.2-10.7,11.1-20.1,20-27.4,9.2-7.7,16.3-14.8,21.1-21.2,4.7-6.1,7.2-13.6,7.2-21.2,0-18.8-8.1-28.3-24.3-28.3-7-.2-13.7,2.8-18.1,8.2-4.6,5.5-7.1,12.9-7.3,22.3h-63.2c.3-25,8.1-44.4,23.6-58.3s37.2-20.9,65.1-20.9,49.4,6.4,64.7,19.3,22.9,31.1,22.9,54.8c-.1,9.7-2.2,19.4-6.4,28.2Z"/>
                                                    </svg>
                                                    : null}

                                            </li>
                                            <li className="item">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60.62 60.62">
                                                    <path
                                                        d="M30.31,0C13.57,0,0,13.57,0,30.31s13.57,30.31,30.31,30.31,30.31-13.57,30.31-30.31c0-16.74-13.57-30.31-30.31-30.31h0ZM40.52,40.52c-1.08,1.08-2.82,1.08-3.9,0l-8.26-8.26c-.52-.52-.81-1.22-.81-1.95V13.78c0-1.52,1.23-2.76,2.75-2.76s2.76,1.23,2.76,2.75h0v15.39l7.46,7.46c1.08,1.08,1.08,2.82,0,3.9h0Z"/>
                                                </svg>
                                                <span className="attr">زمان</span>
                                                <span className="val price">{game.clock.split('-')[0]}</span>
                                                <span className="notice pl-1">الی</span>
                                                <span className="val price">{game.clock.split('-')[1]}</span>
                                            </li>
                                        </ul>
                                        <ul className="mafia-info left">
                                            <li className="item">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.1 23.07">
                                                    <path
                                                        d="M10.76.8l-2.94,5.96-6.58.96c-.79.11-1.33.85-1.22,1.63.05.31.19.6.42.82l4.77,4.64-1.13,6.55c-.13.78.39,1.53,1.18,1.66.31.05.63,0,.91-.15l5.89-3.09,5.89,3.09c.7.37,1.58.1,1.95-.61.15-.28.2-.6.14-.91l-1.12-6.55,4.76-4.64c.57-.56.58-1.47.02-2.04-.22-.23-.51-.37-.82-.42l-6.58-.96L13.34.8c-.35-.71-1.22-1.01-1.93-.65-.28.14-.51.37-.65.65Z"/>
                                                </svg>
                                                <span className="attr  d-inline-block">سطح بازی</span>
                                                <span></span>
                                                <span
                                                    className="val d-inline-block">{["A", "B", "C", "D", "21"].every(substring => gradeInput.indexOf(substring) !== -1) ? "آزاد" :
                                                    <div className="grade-required">{gradeInput}</div>}</span>
                                            </li>
                                            <li className="item">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60.17 60.17">
                                                    <path
                                                        d="M51.57,60.17h6.45c1.19,0,2.15-.96,2.15-2.15v-6.45c0-1.19-.96-2.15-2.15-2.15s-2.15.96-2.15,2.15v4.3h-4.3c-1.19,0-2.15.96-2.15,2.15s.96,2.15,2.15,2.15ZM8.6,55.87h-4.3v-4.3c0-1.19-.96-2.15-2.15-2.15s-2.15.96-2.15,2.15v6.45c0,1.19.96,2.15,2.15,2.15h6.45c1.19,0,2.15-.96,2.15-2.15s-.96-2.15-2.15-2.15ZM10.74,51.57h38.68c1.19,0,2.15-.96,2.15-2.15,0-5.96-2.61-9.74-4.97-11.51-1.32-.98-2.63-1.39-3.62-1.39-2.28,0-3.99.65-5.7,1.47-1.91.92-3.81,2.11-7.19,2.11-3.55,0-5.84-1.19-7.81-2.12-1.77-.84-3.36-1.47-5.09-1.47-1,0-2.35.45-3.68,1.51-2.36,1.88-4.92,5.8-4.92,11.38,0,1.19.96,2.15,2.15,2.15ZM42.57,25.79h-25.69c.97,2.27,2.28,4.42,3.85,6.16,2.51,2.81,5.65,4.58,9,4.58s6.49-1.77,9-4.58c1.56-1.75,2.88-3.89,3.84-6.16h0ZM6.45,23.64h47.27c1.19,0,2.15-.96,2.15-2.15s-.96-2.15-2.15-2.15H6.45c-1.19,0-2.15.96-2.15,2.15s.96,2.15,2.15,2.15ZM15.04,17.19h29.36c-.14-8.35-6.69-15.04-14.68-15.04s-14.54,6.69-14.68,15.04ZM8.6,0H2.15C.96,0,0,.96,0,2.15v6.45c0,1.19.96,2.15,2.15,2.15s2.15-.96,2.15-2.15v-4.3h4.3c1.19,0,2.15-.96,2.15-2.15s-.96-2.15-2.15-2.15ZM51.57,4.3h4.3v4.3c0,1.19.96,2.15,2.15,2.15s2.15-.96,2.15-2.15V2.15c0-1.19-.96-2.15-2.15-2.15h-6.45c-1.19,0-2.15.96-2.15,2.15s.96,2.15,2.15,2.15Z"/>
                                                </svg>
                                                <span className="attr">شناسه رویداد</span>
                                                <span className="val price">{game.id}#</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="modal-divide-head">صندلی های انتخاب شده</div>

                                <ul className="selected-chairs extra-chairs">
                                    {selectedChairs.map((item) => {
                                        return <li key={item} className="item" onClick={() => {
                                            handleChairClick(item);
                                            if (selectedChairs.length <= 1) setShowReserveModal(false)
                                        }}>
                                            <div className="chair-container">
                                                <div className="tag">REMOVE</div>
                                                <div
                                                    className="chair">
                                          <span className="number">
                                            #<span className="key">{item}</span>
                                          </span>
                                                    <svg
                                                        className="chair-icon"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 31.53 42.55"
                                                    >
                                                        <path
                                                            className="seat"
                                                            d="M30.95,25.68h0c-.72-1.03-1.91-1.61-3.16-1.54-.28,0-.53.03-.77.09l-.8.18,1.73-6.72c.71-2.74-.55-5.57-3.07-6.87-5.71-3.02-12.53-3.02-18.24,0-2.51,1.3-3.78,4.13-3.07,6.87l1.73,6.7-.79-.17c-.35-.07-.71-.1-1.06-.09C1.54,24.14,0,25.69,0,27.6c0,.45.09.88.26,1.3,1.35,3.3,3.66,6.03,6.7,7.89l.46.29-3.03,4.11c-.13.18-.19.41-.15.64s.16.43.35.56c.38.28.92.2,1.2-.18l3.2-4.34.36.15c2.03.84,4.17,1.26,6.36,1.26h.04c2.25,0,4.39-.42,6.42-1.26l.36-.15,3.21,4.34c.14.18.34.3.57.33.23.03.46-.03.64-.17.38-.28.46-.82.18-1.2l-3.03-4.1.46-.28c3.04-1.87,5.35-4.6,6.7-7.89.44-1.06.31-2.26-.32-3.21ZM5.26,17.26c-.51-1.96.38-3.97,2.18-4.9,5.21-2.77,11.43-2.77,16.65,0,1.8.92,2.69,2.94,2.18,4.9l-2.42,9.37-.15.11c-2.37,1.65-5.15,2.47-7.93,2.47-2.78,0-5.56-.82-7.93-2.47l-.15-.11-2.42-9.37ZM29.67,28.24c-2.31,5.65-7.76,9.31-13.86,9.31h-.02c-6.17,0-11.61-3.65-13.93-9.3-.17-.42-.17-.89,0-1.31s.51-.75.93-.92c.21-.09.39-.14.65-.13.59-.09,1.25.16,1.68.67,1.69,2.13,5.72,4.4,10.63,4.4s8.95-2.27,10.62-4.39c.32-.42.82-.68,1.37-.68.62-.1,1.32.18,1.74.74.34.49.4,1.09.19,1.62Z"
                                                        />
                                                        <g>
                                                            <path className="mark"
                                                                  d="M6.56,9.2c0,.38,0,.77.06,1.15l.17,1.03c.46,1.91,1.53,3.63,3.05,4.89.06.06.17.11.23.17.53.41,1.11.76,1.72,1.04l.34.17c.5.23,1.02.41,1.55.52.29.06.52.12.8.17.42.05.84.07,1.26.06,5.08,0,9.2-4.12,9.2-9.19C24.95,4.12,20.83,0,15.75,0,10.67,0,6.56,4.12,6.56,9.19c0,0,0,0,0,0"></path>
                                                            <path className="check"
                                                                  d="M11.79,11.78c-.35.37-.35.95,0,1.32.16.17.39.28.63.29.24,0,.47-.11.63-.29l2.7-2.65,2.64,2.64c.31.35.84.38,1.18.08.03-.02.05-.05.08-.08.35-.37.35-.95,0-1.32l-2.64-2.64,2.64-2.64c.37-.37.36-.96,0-1.32s-.96-.36-1.32,0h0l-2.64,2.64-2.59-2.64c-.35-.38-.94-.41-1.32-.07-.38.35-.41.94-.07,1.32.02.02.05.05.07.07l2.64,2.64-2.64,2.64Z"></path>
                                                        </g>
                                                    </svg>
                                                </div>
                                            </div>
                                        </li>
                                    })
                                    }
                                </ul>
                                <ul className="invoice">
                                    <li className="fee">

                                        <div className="attr">
                                            <svg className="invoice-icon" xmlns="http://www.w3.org/2000/svg"
                                                 viewBox="0 0 512 351.33">
                                                <path
                                                    d="M497,126.4c8.28,0,15-6.72,15-15v-37.44c0-46.31-27.65-73.96-73.96-73.96h-86.7v47.13c-.74,19.88-29.27,19.87-30,0V0H73.96C27.65,0,0,27.65,0,73.97v37.44c0,8.28,6.72,15,15,15,65.28,2.48,65.25,96.07,0,98.53-8.28,0-15,6.72-15,15v37.44c0,46.31,27.65,73.96,73.96,73.96h247.37v-47.13c.74-19.88,29.27-19.87,30,0v47.13h86.7c46.31,0,73.96-27.65,73.96-73.96v-37.44c0-8.28-6.72-15-15-15-65.27-2.48-65.25-96.07,0-98.53h0ZM351.33,239.93c-.74,19.88-29.27,19.87-30,0v-32.13c.74-19.88,29.27-19.87,30,0v32.13ZM351.33,143.53c-.74,19.88-29.27,19.87-30,0v-32.13c.74-19.88,29.27-19.87,30,0v32.13Z"/>
                                            </svg>
                                            قیمت هر تیکت
                                        </div>
                                        <span className="val">{new Intl.NumberFormat('en-US').format(game.price)}</span>
                                        <span className="notice pr-1">تومان</span>
                                    </li>


                                    <li className="total">
                                        <div className="attr">مجموع پـرداختی</div>
                                        <span
                                            className="val price">{new Intl.NumberFormat('en-US').format(game.price * selectedChairs.length)}</span>
                                        <span className="notice pr-2">تومان</span>
                                    </li>
                                </ul>

                                {game.price === 0 ?
                                    <div className="payment-method">
                                        <a href="/" className="item">
                                            <div className="img-container">
                                                <img src={Gift} alt="paying"/>
                                            </div>
                                            <div className="content">
                                   <span className="head">
                                      ثبت نام رایگان
                                   </span>
                                                <span className="notice">
                                       شرکت در این رویداد رایگان است!
                                   </span>
                                            </div>
                                            <div className="arr">
                                                <i className="fa-light fa-circle-arrow-left"></i>
                                            </div>
                                        </a>
                                    </div>
                                    :
                                    <ul className="payment-method">
                                        {/* <li className="item">

                                        <div className="img-container">
                                            <img src={Sadad} alt="sadad"/>
                                        </div>
                                        <div className="content">
                                       <span className="head">
                                           پرداخت آنلاین بانک ملی
                                       </span>
                                                        <span className="notice">
                                           پرداخت توسط درگاه  آنلاین سداد، بانک ملی انجام میشود
                                       </span>
                                        </div>
                                        <div className="arr">
                                            <i className="fa-light fa-circle-arrow-left"></i>
                                        </div>

                                </li>*/}


                                        <li className="item" onClick={() => payWithZarinPal()}>

                                            <div className="img-container mt-0">
                                                <img src={ZarinPal} alt="zarinpal"/>
                                            </div>
                                            <div className="content">
                                       <span className="head">
                                           پرداخت با درگاه واسط زرین پال
                                       </span>
                                                <span className="notice">
                                           پرداخت توسط درگاه واسط زرین پال انجام میشود
                                       </span>
                                            </div>
                                            <div className="arr">
                                                {sendDataLoading ?
                                                    <div className="spinner-container">
                                                        <div className="spinner"></div>
                                                    </div> : null}
                                            </div>

                                        </li>

                                        <li className="item" onClick={() => noPaymentReserveAttempt()}>
                                            <div className="img-container">
                                                <img src={Paying} alt="paying"/>
                                            </div>
                                            <div className="content">
                                               <span className="head">
                                                   پرداخت حضوری
                                               </span>
                                                <span className="notice">
                                               پرداخت توسط شما هنگام ورود به مجموعه انجام خواهد شد
                                           </span>
                                            </div>
                                            {/*<div className="arr">*/}
                                            {/*    <i className="fa-light fa-circle-arrow-left"></i>*/}
                                            {/*</div>*/}
                                            <div className="arr">
                                                {noPaymentLoading ?
                                                    <div className="spinner-container">
                                                        <div className="spinner"></div>
                                                    </div> : null}
                                            </div>
                                        </li>
                                    </ul>
                                }


                            </div>

                        </Modal.Body>

                        <Modal.Footer>
                            <div className="content">
                                <span> لطفا قبل از اقدام به پرداخت </span>
                                <Link className="color-primary" to="/">قوانین و مقررات</Link>
                                <span>را مطالعه فرمایید</span>
                            </div>
                        </Modal.Footer>
                    </Modal>
                    {game.game_scenario?
                        <Modal show={showScenarioModal} onHide={() => setShowScenarioModal(false)} centered className="scenario-modal full-screen-modal-bellow-md">
                            <Modal.Header>
                                <Modal.Title>
                                    سـنــاریـو
                                    {game.scenario.name}
                                </Modal.Title>
                                <svg onClick={() => setShowScenarioModal(false)}
                                     className="modal-cross-icon" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 211 211">
                                    <path
                                        d="M105.5,0C47.23,0,0,47.23,0,105.5s47.23,105.5,105.5,105.5,105.5-47.23,105.5-105.5C210.93,47.26,163.74.07,105.5,0ZM146.18,132.63c3.81,3.68,3.92,9.75.24,13.56-3.68,3.81-9.75,3.92-13.56.24-.08-.08-.16-.16-.24-.24l-27.12-27.13-27.12,27.13c-3.81,3.68-9.88,3.57-13.56-.24-3.59-3.72-3.59-9.61,0-13.33l27.12-27.13-27.12-27.13c-3.81-3.68-3.92-9.75-.24-13.56,3.68-3.81,9.75-3.92,13.56-.24.08.08.16.16.24.24l27.12,27.13,27.12-27.13c3.68-3.81,9.75-3.92,13.56-.24,3.81,3.68,3.92,9.75.24,13.56-.08.08-.16.16-.24.24l-27.12,27.13,27.12,27.13Z"/>
                                </svg>

                            </Modal.Header>
                            <Modal.Body>
                                <div className="scenario-content">
                                    <ul className="scenario-characters">
                                        <li className="head positive">
                                            نقش های مثبت این سناریو
                                        </li>
                                        {game.scenario.characters.map((character, index) => (
                                            character.side === 1 ?
                                                <li key={index}  onClick={() => toggleDescription(character.id)} className="item">
                                                    <div className="img-container">
                                                        {character.pivot.count > 1 ?
                                                            <span className="count">
                                                        {character.pivot.count}
                                                                <span className="notice">X</span></span>
                                                            : null}
                                                        <div className="img">
                                                            <img src={character.photo_id ? character.photo_id : Avatar}
                                                                 alt={character.name}/>
                                                        </div>
                                                    </div>
                                                    <div className="name">
                                                        {character.name}
                                                        {showCharacterDescription[character.id]?
                                                            <span className="circle"></span>
                                                            :null}
                                                    </div>
                                                    {showCharacterDescription[character.id] ?
                                                        <div className="description">
                                                            {character.description}
                                                        </div>:null
                                                    }
                                                </li>
                                                : null
                                        ))}
                                        <li className="head negative">
                                            نقش های منفی این سناریو
                                        </li>
                                        {game.scenario.characters.map((character, index) => (
                                            character.side === 0 ?
                                                <li onClick={() => toggleDescription(character.id)} key={index} className="item">
                                                    <div className="img-container">
                                                        {character.pivot.count > 1 ?
                                                            <span className="count">
                                                        {character.pivot.count}
                                                                <span className="notice">X</span></span>
                                                            : null}
                                                        <div className="img">
                                                            <img src={character.photo_id ? character.photo_id : Avatar}
                                                                 alt={character.name}/>
                                                        </div>
                                                    </div>
                                                    <div className="name">
                                                        {character.name}
                                                        {showCharacterDescription[character.id]?
                                                            <span className="circle"></span>
                                                            :null}
                                                    </div>
                                                    {showCharacterDescription[character.id] ?
                                                        <div className="description">
                                                            {character.description}
                                                        </div>:null
                                                    }
                                                </li>
                                                : null
                                        ))}

                                    </ul>
                                </div>


                            </Modal.Body>


                        </Modal>
                    :null}
                    <Modal show={showGameScoresModal} onHide={() => setShowGameScoresModal(false)} centered className="game-score-modal full-screen-modal-bellow-md">
                        <Modal.Header>
                            <Modal.Title>
                                پنل امتیازات بازی
                            </Modal.Title>
                            <svg onClick={() => setShowGameScoresModal(false)}
                                 className="modal-cross-icon" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 211 211">
                                <path
                                    d="M105.5,0C47.23,0,0,47.23,0,105.5s47.23,105.5,105.5,105.5,105.5-47.23,105.5-105.5C210.93,47.26,163.74.07,105.5,0ZM146.18,132.63c3.81,3.68,3.92,9.75.24,13.56-3.68,3.81-9.75,3.92-13.56.24-.08-.08-.16-.16-.24-.24l-27.12-27.13-27.12,27.13c-3.81,3.68-9.88,3.57-13.56-.24-3.59-3.72-3.59-9.61,0-13.33l27.12-27.13-27.12-27.13c-3.81-3.68-3.92-9.75-.24-13.56,3.68-3.81,9.75-3.92,13.56-.24.08.08.16.16.24.24l27.12,27.13,27.12-27.13c3.68-3.81,9.75-3.92,13.56-.24,3.81,3.68,3.92,9.75.24,13.56-.08.08-.16.16-.24.24l-27.12,27.13,27.12,27.13Z"/>
                            </svg>

                        </Modal.Header>
                        <Modal.Body>
                            <div className="sec-container">
                                <div className="head">
                                    ساید برنده بازی
                                </div>
                                <ul className="win-side">
                                    <li
                                        onClick={() => chooseWinSide(0)}
                                        className={`item ${winSide[0]  ? 'selected' : ''}`}>مــافــیــا</li>
                                    {game.scenario_id && game.scenario.characters.find(obj => obj.side === 2) ?
                                        <li onClick={() => chooseWinSide(2)}
                                            className={`item ${winSide[2]  ? 'selected' : ''}`}>مـسـتــقــل</li>
                                        :null}
                                    <li onClick={() => chooseWinSide(1)}
                                        className={`item ${winSide[1]  ? 'selected' : ''}`}>شـــهـــــر</li>
                                </ul>
                            </div>
                            <div className="sec-container">
                                <div className="head">
                                    بهترین بازیکن
                                    <span className="notice mr-2">(MVP)</span>
                                </div>
                                <div onClick={() => setShowMVPDropDown(!showMVPDropDown)} className="input-control">
                                    {MVPInput && reserves.find(obj => obj.user_id === MVPInput)?
                                        reserves.find(obj => obj.user_id === MVPInput).user.name+" "+reserves.find(obj => obj.user_id === MVPInput).user.family
                                        : " انتخاب بهترین بازیکن"}
                                    <svg className={showMVPDropDown ? "active angle-icon" : "angle-icon"}
                                         xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 512 512">
                                        <path
                                            d="M256,0C114.84,0,0,114.84,0,256s114.84,256,256,256,256-114.84,256-256S397.16,0,256,0ZM335.08,271.08l-106.67,106.67c-4,4.01-9.42,6.26-15.08,6.25-5.66,0-11.09-2.24-15.08-6.25-8.34-8.34-8.34-21.82,0-30.17l91.58-91.58-91.58-91.58c-8.34-8.34-8.34-21.82,0-30.16s21.82-8.34,30.16,0l106.67,106.67c8.34,8.34,8.34,21.82,0,30.17h0Z"/>
                                    </svg>
                                </div>
                                {showMVPDropDown ?
                                    <ul className="custom-select-input">
                                        {reserves.map((item, index) => (
                                            <li
                                                key={index}
                                                className="item"
                                                onClick={() => {
                                                    setMVPInput(item.user.id);
                                                    setShowMVPDropDown(!showMVPDropDown);
                                                }}
                                            >{item.user.name + " " + item.user.family}
                                            </li>
                                        ))}
                                    </ul> : null}
                            </div>
                            <div className="sec-container">
                                <div className="head">
                                    امتیازات کاربران
                                </div>
                                <ul className="user-scores">
                                    {reserves.map((item, index) => (
                                        <li className="item" key={index}>
                                            <div className="avatar">
                                                {item.user.avatar ?
                                                    <img src={item.user.avatar} alt={item.user.name}/> :
                                                    <img src={Avatar} alt={item.user.name}/>
                                                }
                                            </div>
                                            <div className="name">{item.user.name + " " + item.user.family}</div>
                                            <div className="counter">
                                           <span onClick={() => userScoreCounter(item.user.id, "-")}
                                                 className="count-btn">
                                                <svg className="counter-icon" xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 512 512">
                                                  <path
                                                      d="M257,0C116.39,0,0,114.39,0,255s116.39,257,257,257,255-116.39,255-257S397.61,0,257,0ZM392,285H120c-16.54,0-30-13.46-30-30s13.46-30,30-30h272c16.53,0,30,13.46,30,30s-13.47,30-30,30Z"/>
                                                </svg>
                                           </span>
                                                <div className="count">{usersGameScore[item.user.id]}</div>
                                                <span onClick={() => userScoreCounter(item.user.id, "+")}
                                                      className="count-btn">
                                            <svg className="counter-icon" xmlns="http://www.w3.org/2000/svg"
                                                 viewBox="0 0 512 512">
                                                <path
                                                    d="M257,0C116.39,0,0,114.39,0,255s116.39,257,257,257,255-116.39,255-257S397.61,0,257,0ZM392,285h-106v106c0,16.53-13.46,30-30,30s-30-13.47-30-30v-106h-106c-16.54,0-30-13.46-30-30s13.46-30,30-30h106v-106c0-16.54,13.46-30,30-30s30,13.46,30,30v106h106c16.53,0,30,13.46,30,30s-13.47,30-30,30Z"/>
                                            </svg>
                                        </span>
                                            </div>
                                        </li>
                                    ))
                                    }
                                </ul>
                            </div>

                            <li className="secondary-btn twin-buttons" onClick={() => setShowGameScoresModal(false)}>انصراف</li>
                            {sendDataLoading ?
                                <li className="primary-btn twin-buttons">
                                    <div className="loader-container">
                                        <div className="loader">
                                        </div>
                                    </div>
                                </li>
                                :
                                <li className="primary-btn twin-buttons " onClick={() => saveUsersScore()}>
                                    ذخیره نتیجه
                                </li>
                            }
                        </Modal.Body>


                    </Modal>
                    <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered className="edit-game-modal custom-modal">
                        <Modal.Header>
                            <Modal.Title>
                                ویرایش این بازی
                            </Modal.Title>
                            <svg onClick={() => setShowEditModal(false)}
                                 className="modal-cross-icon" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 211 211">
                                <path
                                    d="M105.5,0C47.23,0,0,47.23,0,105.5s47.23,105.5,105.5,105.5,105.5-47.23,105.5-105.5C210.93,47.26,163.74.07,105.5,0ZM146.18,132.63c3.81,3.68,3.92,9.75.24,13.56-3.68,3.81-9.75,3.92-13.56.24-.08-.08-.16-.16-.24-.24l-27.12-27.13-27.12,27.13c-3.81,3.68-9.88,3.57-13.56-.24-3.59-3.72-3.59-9.61,0-13.33l27.12-27.13-27.12-27.13c-3.81-3.68-3.92-9.75-.24-13.56,3.68-3.81,9.75-3.92,13.56-.24.08.08.16.16.24.24l27.12,27.13,27.12-27.13c3.68-3.81,9.75-3.92,13.56-.24,3.81,3.68,3.92,9.75.24,13.56-.08.08-.16.16-.24.24l-27.12,27.13,27.12,27.13Z"/>
                            </svg>

                        </Modal.Header>
                        <Modal.Body>
                            <ul className="edit">
                                <li>
                                    <div className="head">
                                        انتخاب سناریو این بازی
                                    </div>
                                    <div className="input-control"
                                         onClick={() => setShowScenariosInput(!showScenariosInput)}>
                                        {scenariosInput.name ? scenariosInput.name : "لطفا سناریو این بازی را انتخاب کنید"}
                                        <svg className={showScenariosInput ? "active angle-icon" : "angle-icon"}
                                             xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 512 512">
                                            <path
                                                d="M256,0C114.84,0,0,114.84,0,256s114.84,256,256,256,256-114.84,256-256S397.16,0,256,0ZM335.08,271.08l-106.67,106.67c-4,4.01-9.42,6.26-15.08,6.25-5.66,0-11.09-2.24-15.08-6.25-8.34-8.34-8.34-21.82,0-30.17l91.58-91.58-91.58-91.58c-8.34-8.34-8.34-21.82,0-30.16s21.82-8.34,30.16,0l106.67,106.67c8.34,8.34,8.34,21.82,0,30.17h0Z"/>
                                        </svg>
                                    </div>
                                    {showScenariosInput ?
                                        <ul className="custom-select-input">
                                            {scenarios.map((scenario, index) => (
                                                <li
                                                    key={index}
                                                    className="item"
                                                    onClick={() => {
                                                        setScenariosInput({id: scenario.id, name: scenario.name});
                                                        setShowScenariosInput(!showScenariosInput);
                                                    }}
                                                >{scenario.name}
                                                </li>
                                            ))}
                                        </ul>
                                        : null}
                                </li>
                                <li className="position-relative">
                                    <div className="head">
                                        گرداننده این رویداد
                                    </div>
                                    {userSearchLoading ?
                                        <div className="spinner-container">
                                            <div className="spinner"></div>
                                        </div> : null}
                                    {godInput.family ?
                                        <div className="level">
                                            Lv.
                                            <span className="lvl">{godInput.level}</span>
                                            <div className="icon-container">
                                                <img src={LevelIcon} alt="Level"/>
                                            </div>

                                        </div>
                                        : null}
                                    <input
                                        id="god"
                                        className="input-control"
                                        type="text"
                                        placeholder="نام یا نام کاربری یا شماره همراه"
                                        value={godInput.family ? godInput.name + " " + godInput.family : godInput.name}
                                        onChange={(e) => searchUser(e.target.value)}/>
                                    {showSearchResults ? (
                                        <ul className="custom-select-input user-select-input">
                                            {userSearchResults.map((user, index) => (
                                                <li
                                                    key={user.id} // Assuming each user has a unique ID
                                                    className="item"
                                                    onClick={() => {
                                                        setGodInput(user);
                                                        setShowSearchResults(!showSearchResults);
                                                    }}
                                                >
                                                    <ul className="users">
                                                        <li className="user-item">
                                                            <svg className="user-icons"
                                                                 xmlns="http://www.w3.org/2000/svg"
                                                                 viewBox="0 0 384 512">
                                                                <path
                                                                    d="M384,512h-42.67v-107.58c-.04-34.82-28.26-63.05-63.08-63.08H105.75c-34.82.04-63.05,28.26-63.08,63.08v107.58H0v-107.58c.07-58.37,47.37-105.68,105.75-105.75h172.5c58.37.07,105.68,47.37,105.75,105.75v107.58ZM192,256c-70.69,0-128-57.31-128-128S121.31,0,192,0s128,57.31,128,128c-.07,70.66-57.34,127.93-128,128ZM192,42.67c-47.13,0-85.33,38.21-85.33,85.33s38.21,85.33,85.33,85.33,85.33-38.21,85.33-85.33-38.21-85.33-85.33-85.33Z"/>
                                                            </svg>
                                                            {user.name + " " + user.family}
                                                        </li>

                                                        <li className="user-item">

                                                            <svg className="user-icons"
                                                                 xmlns="http://www.w3.org/2000/svg"
                                                                 viewBox="0 0 341.33 512">
                                                                <path
                                                                    d="M234.67,512H106.67c-58.82,0-106.67-47.85-106.67-106.67V106.67C0,47.85,47.85,0,106.67,0h128c58.82,0,106.67,47.85,106.67,106.67v298.67c0,58.82-47.85,106.67-106.67,106.67ZM106.67,42.67c-35.29,0-64,28.71-64,64v298.67c0,35.29,28.71,64,64,64h128c35.29,0,64-28.71,64-64V106.67c0-35.29-28.71-64-64-64H106.67ZM213.33,405.33c0-11.78-9.55-21.33-21.33-21.33h-42.67c-11.78,0-21.33,9.55-21.33,21.33s9.55,21.33,21.33,21.33h42.67c11.78,0,21.33-9.55,21.33-21.33Z"/>
                                                            </svg>
                                                            {user.phone}
                                                        </li>
                                                    </ul>

                                                </li>
                                            ))}
                                            {userSearchResults.length <= 0 ?
                                                <li className="item">کاربری یافت نشد!</li>
                                                : null}
                                        </ul>
                                    ) : null}
                                </li>
                                <li>
                                    <div className="head">
                                        قیمت هـر تیکت
                                    </div>
                                    <input
                                        className="input-control"
                                        type="text"
                                        placeholder="قیمت هر تیکت"
                                        value={priceInput}
                                        onChange={(e) => setPriceInput(e.target.value)}/>
                                </li>
                                <li>
                                    <div className="head">
                                        سطوح مجاز به بازی
                                    </div>
                                    <div onClick={() => setShowGradeInput(!showGradeInput)}
                                         className="input-control">{["A", "B", "C", "D", "21"].every(substring => gradeInput.indexOf(substring) !== -1) ? "بدون محدودیت" : gradeInput}</div>
                                    {showGradeInput ?
                                        <ul className="custom-select-input grade-select-input">
                                            <li onClick={() => changeGrade("21")} className="item">
                                            <span
                                                className={gradeInput.includes("21") ? "custom-check-box selected-grade" : "custom-check-box"}>
                                                <svg className="check-icon" xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 512 369.61">
                                                  <path
                                                      d="M165.32,369.61c-14.53,0-28.47-5.77-38.74-16.06L9.45,236.47c-12.6-12.61-12.6-33.04,0-45.65,12.61-12.6,33.04-12.6,45.65,0l110.22,110.22L456.9,9.45c12.61-12.6,33.04-12.6,45.65,0,12.6,12.61,12.6,33.04,0,45.65L204.06,353.55c-10.27,10.29-24.21,16.06-38.74,16.06h0Z"/>
                                                </svg>
                                            </span>
                                                <span className="grade">21</span>
                                            </li>
                                            <li onClick={() => changeGrade("A")} className="item">
                                            <span
                                                className={gradeInput.includes("A") ? "custom-check-box selected-grade" : "custom-check-box"}>
                                                <svg className="check-icon" xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 512 369.61">
                                                  <path
                                                      d="M165.32,369.61c-14.53,0-28.47-5.77-38.74-16.06L9.45,236.47c-12.6-12.61-12.6-33.04,0-45.65,12.61-12.6,33.04-12.6,45.65,0l110.22,110.22L456.9,9.45c12.61-12.6,33.04-12.6,45.65,0,12.6,12.61,12.6,33.04,0,45.65L204.06,353.55c-10.27,10.29-24.21,16.06-38.74,16.06h0Z"/>
                                                </svg>
                                            </span>
                                                <span className="grade">A</span>
                                            </li>
                                            <li onClick={() => changeGrade("B")} className="item">
                                            <span
                                                className={gradeInput.includes("B") ? "custom-check-box selected-grade" : "custom-check-box"}>
                                                <svg className="check-icon" xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 512 369.61">
                                                  <path
                                                      d="M165.32,369.61c-14.53,0-28.47-5.77-38.74-16.06L9.45,236.47c-12.6-12.61-12.6-33.04,0-45.65,12.61-12.6,33.04-12.6,45.65,0l110.22,110.22L456.9,9.45c12.61-12.6,33.04-12.6,45.65,0,12.6,12.61,12.6,33.04,0,45.65L204.06,353.55c-10.27,10.29-24.21,16.06-38.74,16.06h0Z"/>
                                                </svg>
                                            </span>
                                                <span className="grade">B</span>
                                            </li>
                                            <li onClick={() => changeGrade("C")} className="item">
                                            <span
                                                className={gradeInput.includes("C") ? "custom-check-box selected-grade" : "custom-check-box"}>
                                                <svg className="check-icon" xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 512 369.61">
                                                  <path
                                                      d="M165.32,369.61c-14.53,0-28.47-5.77-38.74-16.06L9.45,236.47c-12.6-12.61-12.6-33.04,0-45.65,12.61-12.6,33.04-12.6,45.65,0l110.22,110.22L456.9,9.45c12.61-12.6,33.04-12.6,45.65,0,12.6,12.61,12.6,33.04,0,45.65L204.06,353.55c-10.27,10.29-24.21,16.06-38.74,16.06h0Z"/>
                                                </svg>
                                            </span>
                                                <span className="grade">C</span>
                                            </li>
                                            <li onClick={() => changeGrade("D")} className="item">
                                            <span
                                                className={gradeInput.includes("D") ? "custom-check-box selected-grade" : "custom-check-box"}>
                                                <svg className="check-icon" xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 512 369.61">
                                                  <path
                                                      d="M165.32,369.61c-14.53,0-28.47-5.77-38.74-16.06L9.45,236.47c-12.6-12.61-12.6-33.04,0-45.65,12.61-12.6,33.04-12.6,45.65,0l110.22,110.22L456.9,9.45c12.61-12.6,33.04-12.6,45.65,0,12.6,12.61,12.6,33.04,0,45.65L204.06,353.55c-10.27,10.29-24.21,16.06-38.74,16.06h0Z"/>
                                                </svg>
                                            </span>
                                                <span className="grade">D</span>
                                            </li>
                                        </ul>
                                        : null}
                                </li>

                                <li className="secondary-btn twin-buttons" onClick={() => setShowEditModal(false)}>انصراف</li>
                                {sendDataLoading ?
                                    <li className="primary-btn twin-buttons">
                                        <div className="loader-container">
                                            <div className="loader">
                                            </div>
                                        </div>
                                    </li>
                                    :
                                    <li className="primary-btn twin-buttons " onClick={() => editGame()}>
                                        ویرایش بازی
                                    </li>
                                }

                            </ul>

                        </Modal.Body>

                    </Modal>
                    <Modal show={showGameSettingModal} onHide={() => setShowGameSettingModal(false)} centered className="game-setting-modal  full-screen-modal-bellow-md">
                        <Modal.Header>
                            <Modal.Title>
                                تنظیمات این بازی
                            </Modal.Title>
                            <svg onClick={() => {setShowGameSettingModal(false); setConfirmPopUp(false)}}
                                 className="modal-cross-icon" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 211 211">
                                <path
                                    d="M105.5,0C47.23,0,0,47.23,0,105.5s47.23,105.5,105.5,105.5,105.5-47.23,105.5-105.5C210.93,47.26,163.74.07,105.5,0ZM146.18,132.63c3.81,3.68,3.92,9.75.24,13.56-3.68,3.81-9.75,3.92-13.56.24-.08-.08-.16-.16-.24-.24l-27.12-27.13-27.12,27.13c-3.81,3.68-9.88,3.57-13.56-.24-3.59-3.72-3.59-9.61,0-13.33l27.12-27.13-27.12-27.13c-3.81-3.68-3.92-9.75-.24-13.56,3.68-3.81,9.75-3.92,13.56-.24.08.08.16.16.24.24l27.12,27.13,27.12-27.13c3.68-3.81,9.75-3.92,13.56-.24,3.81,3.68,3.92,9.75.24,13.56-.08.08-.16.16-.24.24l-27.12,27.13,27.12,27.13Z"/>
                            </svg>

                        </Modal.Header>
                        <Modal.Body className="prevent-select">
                            <div className="head game-modal-head">
                                انتخاب کارکتر های موجود در این بازی
                            </div>
                            {game.game_scenario ?
                                <ul className="edit choose-character-panel">
                                    {game.scenario.characters.find(obj => obj.id === 16) ?
                                        <li className={`item common-roles ${selectedCharacters.some(obj => obj.id === 16) ? 'selected' : ''}`}>
                                            <div className="name"
                                                 onClick={() => selectCharacters(game.scenario.characters.find(obj => obj.id === 16))}>
                                                {game.scenario.characters.find(obj => obj.id === 16).name}
                                            </div>
                                            <div className="counter">
                                                <svg onClick={() => counter("citizen", "-")} className="counter-icon"
                                                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                    <path
                                                        d="M257,0C116.39,0,0,114.39,0,255s116.39,257,257,257,255-116.39,255-257S397.61,0,257,0ZM392,285H120c-16.54,0-30-13.46-30-30s13.46-30,30-30h272c16.53,0,30,13.46,30,30s-13.47,30-30,30Z"/>
                                                </svg>
                                                <div className="count">{scenarioCitizenCount}</div>
                                                <svg onClick={() => counter("citizen", "+")} className="counter-icon"
                                                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                    <path
                                                        d="M257,0C116.39,0,0,114.39,0,255s116.39,257,257,257,255-116.39,255-257S397.61,0,257,0ZM392,285h-106v106c0,16.53-13.46,30-30,30s-30-13.47-30-30v-106h-106c-16.54,0-30-13.46-30-30s13.46-30,30-30h106v-106c0-16.54,13.46-30,30-30s30,13.46,30,30v106h106c16.53,0,30,13.46,30,30s-13.47,30-30,30Z"/>
                                                </svg>
                                            </div>
                                        </li> : null
                                    }
                                    {game.scenario.characters.find(obj => obj.id === 5) ?
                                        <li className={`item common-roles ${selectedCharacters.some(obj => obj.id === 5) ? 'selected' : ''}`}>
                                            <div className="name"
                                                 onClick={() => selectCharacters(game.scenario.characters.find(obj => obj.id === 5))}>
                                                {game.scenario.characters.find(obj => obj.id === 5).name}
                                            </div>
                                            <div className="counter">

                                                <svg onClick={() => counter("mafia", "-")} className="counter-icon"
                                                     xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 512 512">
                                                    <path
                                                        d="M257,0C116.39,0,0,114.39,0,255s116.39,257,257,257,255-116.39,255-257S397.61,0,257,0ZM392,285H120c-16.54,0-30-13.46-30-30s13.46-30,30-30h272c16.53,0,30,13.46,30,30s-13.47,30-30,30Z"/>
                                                </svg>

                                                <div className="count">{scenarioMafiaCount}</div>

                                                <svg onClick={() => counter("mafia", "+")} className="counter-icon"
                                                     xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 512 512">
                                                    <path
                                                        d="M257,0C116.39,0,0,114.39,0,255s116.39,257,257,257,255-116.39,255-257S397.61,0,257,0ZM392,285h-106v106c0,16.53-13.46,30-30,30s-30-13.47-30-30v-106h-106c-16.54,0-30-13.46-30-30s13.46-30,30-30h106v-106c0-16.54,13.46-30,30-30s30,13.46,30,30v106h106c16.53,0,30,13.46,30,30s-13.47,30-30,30Z"/>
                                                </svg>

                                            </div>
                                        </li> : null
                                    }
                                    {game.scenario.characters.map((character, index) => {
                                        if (character.id !== 16 && character.id !== 5)
                                            return (
                                                <li key={index} onClick={() => selectCharacters(character)}
                                                    className={`item ${selectedCharacters.some(obj => obj.id === character.id) ? 'selected' : ''}`}>
                                                    <div className="name">
                                                        {character.name}
                                                    </div>
                                                </li>
                                            )

                                    })}

                                    {/*<li className="secondary-btn twin-buttons" onClick={() => setShowEditModal(false)}>انصراف</li>*/}
                                    {/*{sendDataLoading ?*/}
                                    {/*    <li className="primary-btn twin-buttons">*/}
                                    {/*        <div className="loader-container">*/}
                                    {/*            <div className="loader">*/}
                                    {/*            </div>*/}
                                    {/*        </div>*/}
                                    {/*    </li>*/}
                                    {/*    :*/}
                                    {/*    <li className="primary-btn twin-buttons " onClick={() => changeGameCharacters()}>*/}
                                    {/*        ذخیره نقش ها*/}
                                    {/*    </li>*/}
                                    {/*}*/}
                                    <li className="w-100 mb-3 mr-2 ml-2">
                                        <div className="secondary-btn twin-buttons" onClick={() => setShowGameSettingModal(false)}>انصراف</div>
                                        {sendDataLoading ?
                                            <div className="primary-btn twin-buttons">
                                                <div className="loader-container">
                                                    <div className="loader">
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <div className="primary-btn twin-buttons " onClick={() => changeGameCharacters()}>
                                                ذخیره نقش ها
                                            </div>
                                        }
                                    </li>
                                </ul>
                                :
                                <div className="empty">
                                    <img src={ScenarioIcon} loading={"lazy"} alt="scenario"/>
                                    <div className="text">سناریو بازی را انتخاب کنید</div>
                                </div>
                            }
                            <ul className="users">
                                <li>
                                    <div className="head">
                                        بازیکنان این رویداد
                                    </div>
                                </li>
                                {Object(reserves).length ?
                                    reserves.map((reserve, index) => (
                                        <li className="user" key={index}>
                                            {!reserve.order_id ?
                                                <div className="payment-type">
                                                    نـقـدی
                                                </div> :
                                                <div className="payment-type active">
                                                    آنلاین
                                                </div>
                                            }
                                            <div className="name">
                                                <svg onClick={() => {
                                                    setConfirmPopUp(true)
                                                    setUserReserveIdForRemoving(reserve.id)
                                                }}
                                                     className="user-delete" xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 211 211">
                                                    <path
                                                        d="M105.5,0C47.23,0,0,47.23,0,105.5s47.23,105.5,105.5,105.5,105.5-47.23,105.5-105.5C210.93,47.26,163.74.07,105.5,0ZM146.18,132.63c3.81,3.68,3.92,9.75.24,13.56-3.68,3.81-9.75,3.92-13.56.24-.08-.08-.16-.16-.24-.24l-27.12-27.13-27.12,27.13c-3.81,3.68-9.88,3.57-13.56-.24-3.59-3.72-3.59-9.61,0-13.33l27.12-27.13-27.12-27.13c-3.81-3.68-3.92-9.75-.24-13.56,3.68-3.81,9.75-3.92,13.56-.24.08.08.16.16.24.24l27.12,27.13,27.12-27.13c3.68-3.81,9.75-3.92,13.56-.24,3.81,3.68,3.92,9.75.24,13.56-.08.08-.16.16-.24.24l-27.12,27.13,27.12,27.13Z"/>
                                                </svg>
                                                {reserve.user.name + " " + reserve.user.family}
                                                <div className="user-selected-chair-container">
                                                    {
                                                        JSON.parse(reserve.chair_no).length > 1 ?
                                                            JSON.parse(reserve.chair_no).map((chair, index) => {
                                                                return <div key={index} className="chair-reserved-numbers">
                                                                    {chair}
                                                                </div>
                                                            })

                                                            :
                                                            <div className="chair-reserved-numbers">
                                                                {JSON.parse(reserve.chair_no)}
                                                            </div>
                                                    }
                                                </div>

                                            </div>

                                            <ul className="user-character ">
                                                <li onClick={() => toggleSelectCharacterForUser(index)}
                                                    style={{paddingRight : 30}}
                                                    className="character input-control">
                                                    {usersCharacter.hasOwnProperty(reserve.user.id) && Object(selectedCharacters).length && selectedCharacters.find(obj => obj.id === usersCharacter[reserve.user.id]) ?
                                                        selectedCharacters.find(obj => obj.id === usersCharacter[reserve.user.id]).name
                                                        : " انتخاب کارکتر"
                                                    }
                                                    <svg
                                                        className={showReservedUserSelectCharacter[index] ? "active angle-icon" : "angle-icon"}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 512 512">
                                                        <path
                                                            d="M256,0C114.84,0,0,114.84,0,256s114.84,256,256,256,256-114.84,256-256S397.16,0,256,0ZM335.08,271.08l-106.67,106.67c-4,4.01-9.42,6.26-15.08,6.25-5.66,0-11.09-2.24-15.08-6.25-8.34-8.34-8.34-21.82,0-30.17l91.58-91.58-91.58-91.58c-8.34-8.34-8.34-21.82,0-30.16s21.82-8.34,30.16,0l106.67,106.67c8.34,8.34,8.34,21.82,0,30.17h0Z"/>
                                                    </svg>
                                                </li>
                                                {showReservedUserSelectCharacter[index] ?
                                                    <ul className="custom-select-input">
                                                        {selectedCharacters.map((character) => (
                                                            <li onClick={() => changeUserCharacters(character.id, reserve.user.id, index)}
                                                                key={character.id} className="character item">
                                                                {character.name}
                                                            </li>
                                                        ))}
                                                    </ul> : null}
                                            </ul>
                                        </li>
                                    )) :
                                    <li className="empty">
                                        <img loading={"lazy"} src={EmptyIcon} alt="svg"/>
                                        <div className="text">هنوز کاربری ثبت نام نکرده</div>
                                    </li>}
                            </ul>

                            {game.scenario && Object(reserves).length?
                                <ul className="access-buttons">
                                    <li className="primary-btn twin-btn" onClick={() => shuffleCharacters()}>
                                        <svg className="game-setting-icons" xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 511.93 451.77">
                                            <path
                                                d="M392.77,138.36v35.97c0,11.78,9.56,21.33,21.34,21.33,5.66,0,11.08-2.25,15.08-6.25l76.5-76.5c8.33-8.33,8.33-21.83,0-30.17L429.18,6.25c-8.33-8.33-21.84-8.33-30.17,0-4,4-6.24,9.42-6.25,15.08v51.2c-71.47,15.62-119.47,59.33-160.21,104.77-46.63-51.39-102.91-100.35-193.58-109.63-2.34-.35-4.69-.63-7.04-.83C14.26,66.87-.04,81.22,0,98.9c.03,16.54,12.67,30.33,29.14,31.81,73.9,6.4,117.33,46.06,161.05,95.1-43.65,49.07-87.19,88.87-161.11,95.19-17.58,1.81-30.37,17.53-28.56,35.11,1.66,16.16,15.17,28.51,31.42,28.72.81,0,1.56,0,2.37-.17,111.55-9.49,171.48-78.76,224.79-140.48,40.77-47.15,77.74-88.75,133.67-105.81h0Z"/>
                                            <path
                                                d="M429.18,262.25c-8.33-8.33-21.84-8.33-30.17,0-4,4-6.24,9.42-6.25,15.08v36.27c-27.38-8.66-52.52-23.22-73.64-42.67-13.09-11.18-32.75-9.68-43.99,3.35l-.53.6c-11.47,13.29-10,33.36,3.28,44.83.08.07.16.13.24.2,32.49,29.33,71.96,49.83,114.65,59.52v51.01c0,11.78,9.56,21.33,21.34,21.33,5.66,0,11.08-2.25,15.08-6.25l76.5-76.5c8.33-8.33,8.33-21.83,0-30.17l-76.5-76.61Z"/>
                                        </svg>
                                        تقسیم نقش
                                    </li>
                                    {sendDataLoading ?
                                        <span className="primary-btn twin-btn">
                                   <div className="loader-container">
                                       <div className="loader">
                                       </div>
                                   </div>
                                </span>
                                        :
                                        <li className="primary-btn twin-btn" onClick={() => saveUsersCharacter()}>
                                            <svg className="game-setting-icons" xmlns="http://www.w3.org/2000/svg"
                                                 viewBox="0 0 512.04 512.08">
                                                <path
                                                    d="M0,154.32c0-7.51,3.93-14.44,10.35-18.28L220.74,9.81c21.7-13.08,48.85-13.08,70.55,0l210.37,126.23c10.1,6.07,13.36,19.18,7.29,29.28-1.8,2.99-4.3,5.49-7.29,7.29l-210.37,126.23c-21.7,13.05-48.83,13.05-70.53,0L10.35,172.63C3.93,168.77,0,161.83,0,154.34v-.02ZM490.67,405.41h-42.67v-42.67c0-11.78-9.55-21.33-21.33-21.33s-21.33,9.55-21.33,21.33v42.67h-42.67c-11.78,0-21.33,9.55-21.33,21.33s9.55,21.33,21.33,21.33h42.67v42.67c0,11.78,9.55,21.33,21.33,21.33s21.33-9.55,21.33-21.33v-42.67h42.67c11.78,0,21.33-9.55,21.33-21.33s-9.55-21.33-21.33-21.33ZM266.99,467.58L32.32,326.78c-10.1-6.06-23.21-2.79-29.27,7.32-6.06,10.1-2.79,23.21,7.32,29.27l234.67,140.8c10.1,6.06,23.2,2.79,29.26-7.31,6.06-10.1,2.79-23.2-7.31-29.26v-.02ZM479.7,229.35l-223.68,134.21L32.32,229.35c-10.1-6.06-23.21-2.79-29.27,7.32s-2.79,23.21,7.32,29.27l234.67,140.8c6.76,4.06,15.21,4.06,21.97,0l234.67-140.8c10.1-6.06,13.38-19.17,7.32-29.27s-19.17-13.38-29.27-7.32h-.02Z"/>
                                            </svg>
                                            ذخیره تنظیمات
                                        </li>
                                    }
                                    <li className="primary-btn mt-2" onClick={() => sendUsersCharacter()}>
                                        <svg className="game-setting-icons" xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 512 469.33">
                                            <path
                                                d="M511.02,96.9l-179.58,179.58c-41.69,41.59-109.18,41.59-150.87,0L.98,96.9c-.3,3.37-.98,6.42-.98,9.77v256c.07,58.88,47.79,106.6,106.67,106.67h298.67c58.88-.07,106.6-47.79,106.67-106.67V106.67c0-3.35-.68-6.4-.98-9.77Z"/>
                                            <path
                                                d="M301.27,246.31L496.13,51.43C476.93,19.6,442.51.1,405.33,0H106.67C69.49.1,35.07,19.6,15.87,51.43l194.86,194.88c25.03,24.93,65.51,24.93,90.54,0h0Z"/>
                                        </svg>
                                        ارسال نقش ها
                                    </li>
                                </ul>
                                : null}

                        </Modal.Body>

                    </Modal>
                </>
                :null}



            <div className="space-50"></div>
            <div className="d-none d-md-block">
                <Breadcrumb tag={game ? " شناسه "+game.id : null} name="رویداد مافیا" location="/"/>
            </div>
            <div className="space-25"></div>
            {!isLoading ?
                <div className="row">
                    <div className="col-lg-6">
                        <div className="section-top mt-0">
                            <div className="section-header ">
                                <h3 className="head">
                                   <span> برنامه مافیا سالن</span>
                                  <span>  {game.salon === "1" ? "اول" :
                                      game.salon === "2" ? "دوم"
                                          : "سوم"}</span>
                                </h3>
                                <div className="cube-num">
                                    <img src={CubeIcon} alt="cube"/>
                                    <div className="cube">CUBE</div>
                                    <div className="tag">#{game.salon}</div>
                                </div>
                                <h4 className="notice mb-0  mt-3 mt-md-0">
                                    تاریخ

                                    <ConvertToShamsiDate gregorianDate={game.created_at} name={1}/>
                                    ، شما میتوانید با کلیک بر روی صندلی ها، یک یا چند جایگاه رزرو کنید
                                </h4>
                            </div>
                        </div>

                        <div className="game-page-info">
                            <div className="d-flex justify-content-between align-items-center">
                                <ul className="mafia-info">
                                    <li className="item">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480">
                                            <path
                                                d="M479.82,144h-95.82c-35.35,0-64-28.65-64-64V0h-192C57.3,0,0,57.3,0,128v224c0,70.7,57.3,128,128,128h224c70.7,0,128-57.3,128-128v-203.14c0-1.62-.06-3.25-.18-4.86ZM216,336h-96c-8.84,0-16-7.16-16-16s7.16-16,16-16h96c8.84,0,16,7.16,16,16s-7.16,16-16,16ZM360,240H120c-8.84,0-16-7.16-16-16s7.16-16,16-16h240c8.84,0,16,7.16,16,16s-7.16,16-16,16Z"/>
                                            <path
                                                d="M384,112h84.32c-2.51-3.57-5.41-6.9-8.65-9.93l-90.92-84.86c-4.99-4.66-10.66-8.46-16.75-11.28v74.06c0,17.67,14.33,32,32,32Z"/>
                                        </svg>
                                        <span className="attr">سناریو </span>
                                        <span></span>
                                        <span className="val">
                                         {game.game_scenario ?
                                             game.scenario.name
                                             :
                                             "در انتظار"
                                         }
                                    </span>
                                        {game.game_scenario ?
                                            <svg onClick={() => setShowScenarioModal(true)} className="q-mark"
                                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                <path
                                                    d="M256.8,0C114.8-.4-.4,114.8,0,256.8c.4,140.4,117.5,255.2,257.9,255.2h254.1v-254.1C512,117.5,397.2.4,256.8,0ZM278.8,386.4c-6.7,5.9-15,8.9-25,8.9s-18.3-3-25-8.9-10-13.5-10-22.7,3.3-16.8,10-22.7,15-8.9,25-8.9,18.3,3,25,8.9,10,13.5,10,22.7-3.4,16.7-10,22.7ZM338,219.1c-4.1,8.5-10.7,17.2-19.8,26l-21.5,20c-6.1,5.9-10.4,11.9-12.7,18.1-2.4,6.2-3.7,14-3.9,23.5h-53.6c0-18.2,2.1-32.6,6.2-43.1,4.2-10.7,11.1-20.1,20-27.4,9.2-7.7,16.3-14.8,21.1-21.2,4.7-6.1,7.2-13.6,7.2-21.2,0-18.8-8.1-28.3-24.3-28.3-7-.2-13.7,2.8-18.1,8.2-4.6,5.5-7.1,12.9-7.3,22.3h-63.2c.3-25,8.1-44.4,23.6-58.3s37.2-20.9,65.1-20.9,49.4,6.4,64.7,19.3,22.9,31.1,22.9,54.8c-.1,9.7-2.2,19.4-6.4,28.2Z"/>
                                            </svg>
                                            : null}

                                    </li>
                                    <li className="item">

                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.06 23.06">
                                            <path
                                                d="M21.49,18.87h-3.67c-2.31,0-4.19-1.88-4.19-4.19s1.88-4.19,4.19-4.19h3.67c.29,0,.52-.23.52-.52h0v-1.57c0-1.1-.85-1.99-1.93-2.08l-3.01-5.26c-.28-.49-.73-.83-1.27-.98-.54-.14-1.1-.07-1.58.21L3.91,6.29h-1.81c-1.16,0-2.1.94-2.1,2.1v12.58c0,1.16.94,2.1,2.1,2.1h17.82c1.16,0,2.1-.94,2.1-2.1v-1.57c0-.29-.23-.52-.52-.52h0,0ZM17.73,4.3l1.14,1.99h-4.57l3.43-1.99ZM5.99,6.29L14.76,1.19c.24-.14.51-.18.78-.1.27.07.49.24.63.49h0s-8.1,4.72-8.1,4.72c0,0-2.07,0-2.07,0Z"/>
                                            <path
                                                d="M21.49,11.53h-3.67c-1.73,0-3.15,1.41-3.15,3.15s1.41,3.15,3.15,3.15h3.67c.87,0,1.57-.71,1.57-1.57v-3.15c0-.87-.71-1.57-1.57-1.57h0ZM17.82,15.73c-.58,0-1.05-.47-1.05-1.05s.47-1.05,1.05-1.05,1.05.47,1.05,1.05c0,.58-.47,1.05-1.05,1.05Z"/>
                                        </svg>
                                        <span className="attr">قیمت</span>
                                        <span
                                            className="val price">{new Intl.NumberFormat('en-US').format(game.price)}</span>
                                        <span className="notice">تومان</span>
                                    </li>
                                </ul>
                                <ul className="mafia-info left">
                                    <li className="item">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.1 23.07">
                                            <path
                                                d="M10.76.8l-2.94,5.96-6.58.96c-.79.11-1.33.85-1.22,1.63.05.31.19.6.42.82l4.77,4.64-1.13,6.55c-.13.78.39,1.53,1.18,1.66.31.05.63,0,.91-.15l5.89-3.09,5.89,3.09c.7.37,1.58.1,1.95-.61.15-.28.2-.6.14-.91l-1.12-6.55,4.76-4.64c.57-.56.58-1.47.02-2.04-.22-.23-.51-.37-.82-.42l-6.58-.96L13.34.8c-.35-.71-1.22-1.01-1.93-.65-.28.14-.51.37-.65.65Z"/>
                                        </svg>
                                        <span className="attr  d-inline-block">سطح بازی</span>
                                        <span></span>
                                        <span
                                            className="val d-inline-block">{["A", "B", "C", "D", "21"].every(substring => gradeInput.indexOf(substring) !== -1) ? "آزاد" :
                                            <div className="grade-required">{gradeInput}</div>}</span>
                                    </li>
                                    <li className="item">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60.17 60.17">
                                            <path
                                                d="M51.57,60.17h6.45c1.19,0,2.15-.96,2.15-2.15v-6.45c0-1.19-.96-2.15-2.15-2.15s-2.15.96-2.15,2.15v4.3h-4.3c-1.19,0-2.15.96-2.15,2.15s.96,2.15,2.15,2.15ZM8.6,55.87h-4.3v-4.3c0-1.19-.96-2.15-2.15-2.15s-2.15.96-2.15,2.15v6.45c0,1.19.96,2.15,2.15,2.15h6.45c1.19,0,2.15-.96,2.15-2.15s-.96-2.15-2.15-2.15ZM10.74,51.57h38.68c1.19,0,2.15-.96,2.15-2.15,0-5.96-2.61-9.74-4.97-11.51-1.32-.98-2.63-1.39-3.62-1.39-2.28,0-3.99.65-5.7,1.47-1.91.92-3.81,2.11-7.19,2.11-3.55,0-5.84-1.19-7.81-2.12-1.77-.84-3.36-1.47-5.09-1.47-1,0-2.35.45-3.68,1.51-2.36,1.88-4.92,5.8-4.92,11.38,0,1.19.96,2.15,2.15,2.15ZM42.57,25.79h-25.69c.97,2.27,2.28,4.42,3.85,6.16,2.51,2.81,5.65,4.58,9,4.58s6.49-1.77,9-4.58c1.56-1.75,2.88-3.89,3.84-6.16h0ZM6.45,23.64h47.27c1.19,0,2.15-.96,2.15-2.15s-.96-2.15-2.15-2.15H6.45c-1.19,0-2.15.96-2.15,2.15s.96,2.15,2.15,2.15ZM15.04,17.19h29.36c-.14-8.35-6.69-15.04-14.68-15.04s-14.54,6.69-14.68,15.04ZM8.6,0H2.15C.96,0,0,.96,0,2.15v6.45c0,1.19.96,2.15,2.15,2.15s2.15-.96,2.15-2.15v-4.3h4.3c1.19,0,2.15-.96,2.15-2.15s-.96-2.15-2.15-2.15ZM51.57,4.3h4.3v4.3c0,1.19.96,2.15,2.15,2.15s2.15-.96,2.15-2.15V2.15c0-1.19-.96-2.15-2.15-2.15h-6.45c-1.19,0-2.15.96-2.15,2.15s.96,2.15,2.15,2.15Z"/>
                                        </svg>
                                        <span className="attr">شناسه رویداد</span>
                                        <span className="val price">{game.id}#</span>
                                    </li>
                                </ul>
                            </div>
                            {game.god_id !== null ?
                                <div className="god">
                                    <div className="avatar">
                                        <div className="img-container">
                                            {
                                                game.god.avatar ?
                                                    <img src={game.god.avatar} alt={game.god.name}/>
                                                    :
                                                    <img src={Avatar}  alt={game.god.name}/>
                                            }
                                        </div>
                                    </div>
                                    <ul className="player-info">
                                        <li className="tag">
                                            گرداننده این رویداد
                                        </li>
                                        <li className="head">
                                            <div className="name">
                                                {game.god.name + " " + game.god.family}
                                            </div>
                                            <div className="level">
                                                Lv.
                                                <span className="lvl">{game.god.level}</span>
                                                <div className="icon-container">
                                                    <img src={LevelIcon} alt="Level"/>
                                                </div>

                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                :
                                <div className="god">
                                    <div className="avatar">
                                        <div className="img-container">
                                            <img src={Avatar} alt="avatar"/>
                                        </div>
                                    </div>
                                    <ul className="player-info">
                                        <li className="tag">
                                            گرداننده این رویداد
                                        </li>
                                        <li className="head">
                                            <div className="name">
                                                هنوز مشخص نشده است
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            }

                            {localStorage.getItem("authToken") && localStorage.getItem("userDetails") && (JSON.parse(localStorage.userDetails).id === 1 || JSON.parse(localStorage.userDetails).id === 17) ?
                            <div className="logs" onClick={() =>setShowLogModal(true)}>
                                <svg className="log-icon" xmlns="http://www.w3.org/2000/svg" version="1.1"
                                     viewBox="0 0 512 512">
                                    <g>
                                        <switch>
                                            <g>
                                                <path d="M475.2 333.2c-12.4-6-27.4-.7-33.4 11.7-16.6 34.5-42.4 63.7-74.7 84.5C334 450.7 295.6 462 256 462c-113.6 0-206-92.4-206-206S142.4 50 256 50c39.6 0 78 11.3 111.2 32.5 32.3 20.7 58.1 50 74.7 84.5 6 12.4 20.9 17.7 33.4 11.7 12.4-6 17.7-20.9 11.7-33.4-20.6-42.9-52.6-79.2-92.8-104.9C353 14 305.2 0 256 0 187.6 0 123.3 26.6 75 75 26.6 123.3 0 187.6 0 256s26.6 132.7 75 181c48.4 48.4 112.6 75 181 75 49.2 0 97-14 138.2-40.5 40.1-25.8 72.2-62.1 92.8-104.9 5.9-12.5.7-27.4-11.8-33.4z">
                                                </path>
                                                <path
                                    d="M269.3 353.3c4.9 4.9 11.3 7.3 17.7 7.3s12.8-2.4 17.7-7.3l62.9-62.9c9.2-9.2 14.2-21.4 14.2-34.3s-5.1-25.2-14.2-34.3l-62.9-62.9c-9.8-9.8-25.6-9.8-35.4 0s-9.8 25.6 0 35.4l36.9 36.9H164.1c-13.8 0-25 11.2-25 25s11.2 25 25 25h142.2l-36.9 36.9c-9.8 9.6-9.8 25.4-.1 35.2z"></path>
                                            </g>
                                        </switch>
                                    </g>
                                </svg>
                            </div>
                                :null}

                            {!logLoading && localStorage.getItem("authToken") && JSON.parse(localStorage.userDetails) && (JSON.parse(localStorage.userDetails).id === 1 || JSON.parse(localStorage.userDetails).id === 17) ?
                                <Modal
                                    show={showLogModal}
                                    onHide={() => setShowLogModal(!showLogModal)}
                                    centered
                                    className="question-modal logg-modal custom-modal"
                                >
                                    <Modal.Header>
                                        <Modal.Title>
                                            <div className="question-mark">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.5 15.73">
                                                    <path
                                                        d="M4.76,6.83c.16.13.31.31.45.53.14.22.25.47.35.75.1.28.17.58.23.89.05.32.08.64.08.96v1.24h-2.18v-1.24c0-.36-.08-.71-.23-1.04-.15-.33-.37-.62-.65-.88-.12-.11-.25-.22-.39-.33-.14-.11-.28-.22-.42-.33-.18-.14-.35-.28-.52-.42-.17-.14-.33-.28-.48-.42-.35-.33-.6-.73-.76-1.2-.16-.47-.24-.96-.24-1.49s.13-1.06.39-1.53c.26-.47.59-.88,1-1.22.41-.35.88-.62,1.39-.81.51-.19,1.03-.29,1.55-.29.67,0,1.26.1,1.79.31.52.21.96.51,1.32.9.36.39.63.86.81,1.41.16.5.25,1.06.25,1.67v.18h-2.18c0-.42-.05-.78-.16-1.08s-.25-.53-.43-.71-.39-.3-.63-.38c-.24-.08-.49-.12-.76-.12-.29,0-.56.04-.8.12-.25.08-.46.2-.64.35s-.32.32-.42.53c-.1.2-.15.42-.15.66,0,.36.07.69.21.99.14.3.35.56.62.77l1.61,1.23ZM4.8,15.73l-1.63-1.66,1.69-1.68,1.64,1.68-1.7,1.66Z"/>
                                                </svg>
                                            </div>
                                            آخرین بازدید نقش ها
                                        </Modal.Title>
                                        <svg onClick={() => setShowLogModal(!showLogModal)}
                                             className="modal-cross-icon" xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 211 211">
                                            <path
                                                d="M105.5,0C47.23,0,0,47.23,0,105.5s47.23,105.5,105.5,105.5,105.5-47.23,105.5-105.5C210.93,47.26,163.74.07,105.5,0ZM146.18,132.63c3.81,3.68,3.92,9.75.24,13.56-3.68,3.81-9.75,3.92-13.56.24-.08-.08-.16-.16-.24-.24l-27.12-27.13-27.12,27.13c-3.81,3.68-9.88,3.57-13.56-.24-3.59-3.72-3.59-9.61,0-13.33l27.12-27.13-27.12-27.13c-3.81-3.68-3.92-9.75-.24-13.56,3.68-3.81,9.75-3.92,13.56-.24.08.08.16.16.24.24l27.12,27.13,27.12-27.13c3.68-3.81,9.75-3.92,13.56-.24,3.81,3.68,3.92,9.75.24,13.56-.08.08-.16.16-.24.24l-27.12,27.13,27.12,27.13Z"/>
                                        </svg>

                                    </Modal.Header>
                                    <Modal.Body>
                                        <ul className="log-content">
                                            {!logLoading && logs.length?
                                                logs.map((log, index) => {
                                                    return <li key={index} className="logs-container">

                                                                <div className="name">
                                                                    {log.user.name + " " + log.user.family}
                                                                </div>
                                                                <div className="date ">
                                                                    <ConvertToShamsiDate log={1}
                                                                                         gregorianDate={log.created_at}/>
                                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                                         version="1.1"
                                                                         className="ml-0 mr-2"
                                                                         viewBox="0 0 24 24">
                                                                        <g>
                                                                            <path
                                                                                d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0Zm4 13h-4a1 1 0 0 1-1-1V6a1 1 0 1 1 2 0v5h3a1 1 0 1 1 0 2Z"></path>
                                                                        </g>
                                                                    </svg>

                                                                </div>

                                                    </li>
                                                })
                                                :
                                                <li className="empty">
                                                    <img loading={"lazy"} src={EmptyIcon} alt="svg"/>
                                                    <div className="text">هنوز بازدیدی انجام نشده</div>
                                                </li>}
                                        </ul>

                                    </Modal.Body>

                                </Modal>
                                : null}


                            {/*<ul className="mafia-info">
                                <li className="item">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496.94 359.23">
                                        <path
                                            d="M491.14,270.08c-13.48-12.2-48.04-8.73-105.34-3.01l-10.84,1.05,25.15-221.06c.08-.23.08-.53.08-.83C400.19,2.26,272.11,0,246.44,0S92.76,2.26,92.76,46.23v.83l25.15,221.14c-34.67-4.08-96.38-12.41-111.96,1.58-3.84,3.54-5.95,8.21-5.95,13.63,0,39.68,118.44,75.82,248.47,75.82s248.47-36.14,248.47-75.82c0-5.27-1.96-9.94-5.8-13.33ZM356.59,281.83c-.23.45-.53.9-.98,1.36-7,6.93-46.68,15.81-109.18,15.81-66.64,0-107.44-10.16-110.08-16.94,0-.3,0-.6-.08-.9l-4.59-25.6c72.51,17.32,149.61,17.24,229.57-.3-.08.77-4.75,27.35-4.67,26.58h0Z"/>
                                    </svg>
                                    <span className="attr">سناریو </span>
                                    <span></span>
                                    <span className="val">شماره یک</span>
                                    <span>?</span>
                                </li>
                                <li className="item">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60.62 60.62">
                                        <path
                                            d="M30.31,0C13.57,0,0,13.57,0,30.31s13.57,30.31,30.31,30.31,30.31-13.57,30.31-30.31c0-16.74-13.57-30.31-30.31-30.31h0ZM40.52,40.52c-1.08,1.08-2.82,1.08-3.9,0l-8.26-8.26c-.52-.52-.81-1.22-.81-1.95V13.78c0-1.52,1.23-2.76,2.75-2.76s2.76,1.23,2.76,2.75h0v15.39l7.46,7.46c1.08,1.08,1.08,2.82,0,3.9h0Z"/>
                                    </svg>
                                    <span className="attr">زمان</span>
                                    <span className="val price">16</span>
                                    <span className="notice">الی</span>
                                    <span className="val price">18</span>
                                </li>
                            </ul>*/}


                        </div>

                        {localStorage.authToken && localStorage.userDetails && JSON.parse(localStorage.userDetails).role === "Admin" || localStorage.authToken && localStorage.userDetails && JSON.parse(localStorage.userDetails).id === game.god_id ?
                            <ul className="admin-access">
                                <li className="edit-btn" onClick={() => setShowEditModal(true)}>
                                    <svg className="edit-icon" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 512.01 512">
                                        <path
                                            d="M304,0H58.67C26.24,0,0,26.24,0,58.67v330.67c0,32.43,26.24,58.67,58.67,58.67h157.44l4.69-26.24c2.13-11.95,7.68-22.61,16.21-31.36l125.65-125.44V58.67c0-32.43-26.24-58.67-58.67-58.67ZM85.33,85.33h85.33c11.73,0,21.33,9.6,21.33,21.33s-9.6,21.33-21.33,21.33h-85.33c-11.73,0-21.33-9.6-21.33-21.33s9.6-21.33,21.33-21.33ZM192,298.67h-106.67c-11.73,0-21.33-9.6-21.33-21.33s9.6-21.33,21.33-21.33h106.67c11.73,0,21.33,9.6,21.33,21.33s-9.6,21.33-21.33,21.33ZM277.33,213.33H85.33c-11.73,0-21.33-9.6-21.33-21.33s9.6-21.33,21.33-21.33h192c11.73,0,21.33,9.6,21.33,21.33s-9.6,21.33-21.33,21.33ZM267.26,512c-8.81.02-15.98-7.1-16-15.92,0-.97.08-1.93.25-2.88l11.31-64.11c.57-3.23,2.12-6.21,4.44-8.53l158.4-158.38c19.46-19.5,38.57-14.23,49.02-3.78l26.39,26.39c14.58,14.58,14.58,38.22,0,52.8,0,0,0,0,0,0l-158.4,158.4c-2.31,2.33-5.3,3.88-8.53,4.44l-64.11,11.31c-.91.17-1.84.26-2.77.26ZM331.37,484.69h.21-.21Z"/>
                                    </svg>
                                    ویـرایـش
                                </li>
                                <li onClick={() => {
                                    setShowGameSettingModal(!showGameSettingModal)
                                    userVisitLog()
                                }} className="edit-btn">
                                    <svg className="edit-icon" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 473.02 473.02">
                                        <path
                                            d="M132.35,226.66h41.98c4.29-26.94,25.4-48.08,52.33-52.43v-41.88c-49.77,4.63-89.58,44.44-94.31,94.31ZM246.36,298.69v41.98c49.86-4.73,89.68-44.44,94.41-94.31h-41.98c-4.34,26.93-25.49,48.03-52.43,52.33ZM246.36,132.35v41.88c26.97,4.3,48.12,25.45,52.43,52.43h41.98c-4.73-49.86-44.54-89.68-94.41-94.31h0ZM174.33,246.36h-41.98c4.73,49.86,44.54,89.58,94.31,94.31v-41.98c-26.9-4.34-47.99-25.43-52.33-52.33Z"/>
                                        <path
                                            d="M464.84,202.71l-46.81-7.98c-4.53-20.2-12.42-39.32-23.55-56.96l27.4-38.93c2.79-3.9,2.33-9.25-1.08-12.61l-34-34c-3.39-3.37-8.7-3.83-12.61-1.08l-38.93,27.4c-17.51-11.02-36.77-18.99-56.96-23.55l-7.98-46.81c-.8-4.71-4.88-8.17-9.66-8.18h-48.19c-4.73,0-8.87,3.45-9.66,8.18l-8.08,46.81c-20.15,4.58-39.37,12.55-56.86,23.55l-38.93-27.4c-3.91-2.74-9.23-2.29-12.61,1.08l-34,34c-3.41,3.37-3.87,8.71-1.08,12.61l27.4,38.93c-11.05,17.51-19.05,36.77-23.65,56.96l-46.71,7.98c-4.73.79-8.28,4.93-8.28,9.76v48.09c0,4.73,3.55,8.87,8.28,9.66l46.71,8.08c4.63,20.1,12.52,39.22,23.65,56.86l-27.4,38.93c-2.76,3.94-2.37,9.26,1.08,12.61l34,34c3.35,3.45,8.67,3.94,12.61,1.08l38.93-27.4c17.64,11.14,36.76,19.02,56.86,23.65l8.08,46.81c.79,4.73,4.93,8.18,9.66,8.18h48.19c4.73,0,8.87-3.45,9.66-8.18l7.98-46.81c20.19-4.6,39.45-12.6,56.96-23.65l38.93,27.4c3.94,2.86,9.26,2.37,12.61-1.08l34-34c3.45-3.35,3.84-8.67,1.08-12.61l-27.4-38.93c11.14-17.64,19.02-36.76,23.55-56.86l46.81-8.08c4.73-.79,8.18-4.93,8.18-9.66v-48.09c.02-4.81-3.44-8.94-8.18-9.76h0ZM360.87,236.71c-.1,68.39-55.68,123.97-124.07,124.17h-.49c-68.39-.2-123.97-55.78-124.17-124.17v-.49c.2-68.39,55.78-123.97,124.17-124.07.1,0,.2-.1.2-.1.1,0,.2.1.3.1,68.39.1,123.97,55.68,124.07,124.07,0,.1.1.2.1.3s-.1.1-.1.2h0Z"/>
                                    </svg>
                                    تنظیمـات
                                </li>
                                <li className="edit-btn" onClick={() => setShowGameScoresModal(!showGameScoresModal)}>
                                    <svg className="edit-icon" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 512 471.75">
                                        <path
                                            d="M445.04,246.25c12.77,0,25.05-3.69,35.87-10.96,17.94-12.13,30.4-34.13,30.88-57.01.56-11.63,0-23.95-1.7-37.68-.96-7.85-7.87-13.94-16.79-13.05-15.23,1.96-30.84,9.19-43.86,20.51-.61-5.06-1.42-10.09-2.43-15.08,14.44-7.15,25.6-18.64,31.37-32.97,8.36-20.07,5.74-44.85-6.87-64.69-7.02-11.06-14.57-21.21-22.44-30.2-5.46-6.23-14.9-6.87-21.15-1.41-13.56,11.85-22.7,29.05-26.44,49.88-3.38,19.99-.75,36.85,6.8,55.12,31.39,74.58,2.56,159.86-62.75,201.52-4.62,2.88-8.27,6.87-10.78,11.51h-63.77v-61.28l52.79,27.41c5.05,2.62,11.14,2.16,15.73-1.19,4.6-3.34,6.91-8.99,5.98-14.59l-12.52-75.35,54.42-53.6c4.04-3.98,5.49-9.91,3.73-15.31-1.76-5.4-6.41-9.35-12.03-10.21l-75.18-11.32-34.26-75.75c-4.86-10.75-22.47-10.75-27.33,0l-34.26,75.75-75.18,11.32c-5.62.86-10.27,4.81-12.03,10.21-1.75,5.4-.31,11.32,3.73,15.31l54.42,53.6-12.52,75.35c-.94,5.6,1.38,11.26,5.98,14.59,4.6,3.34,10.69,3.8,15.73,1.19l52.79-27.41v61.28h-64.24c-5.55-9.31-14.04-13.53-21.99-19.75-42.13-34.07-63.47-83.14-63.47-130.25,0-59.89,27.65-69.4,19.47-118.33-3.73-20.67-12.86-37.85-26.41-49.7-6.2-5.45-15.72-4.83-21.15,1.41-7.92,9.05-15.48,19.22-22.44,30.19-12.61,19.83-15.26,44.62-6.96,64.54,5.83,14.47,17.02,25.98,31.47,33.14-1.01,5-1.82,10.03-2.43,15.09-13.06-11.34-28.94-18.57-44.15-20.53-3.95-.43-7.97.59-11.12,3.05-3.15,2.45-5.19,6.06-5.67,10.02-1.68,13.74-2.23,26.07-1.71,37.41.63,23.72,13.53,45.78,31.31,57.38,10.41,7.18,22.73,10.85,35.61,10.85,3,0,6.05-.36,9.1-.77,1.9,4.63,3.8,9.26,6.04,13.73-13.49-1.74-30.37-1.32-46.9,6.88-7.62,3.78-10.52,13.06-6.62,20.43,5.26,10,11.53,21.56,18.98,31.65,12.71,18.55,33.6,31.3,58.29,31.3,14.93,0,29.29-5.72,41.13-15.99,1.84,1.31,3.56,2.6,3.87,3.23v105h-15c-8.29,0-15,6.71-15,15s6.71,15,15,15h240c8.29,0,15-6.71,15-15s-6.71-15-15-15h-15v-103.39c.18-.93.57-1.8.57-2.77,1.17-.75,2.18-1.66,3.33-2.43,31.21,27.53,75.39,19.08,100.01-14.87,7.03-10.71,13.9-20.9,19.2-32.42,3.4-7.37.31-16.11-6.97-19.72-13.69-6.78-29.23-8.77-47.17-6.57,2.32-4.62,4.62-9.25,6.57-14.05,2.85.36,5.69.71,8.5.71h0ZM286,411.75h-60c-8.29,0-15-6.71-15-15s6.71-15,15-15h60c8.29,0,15,6.71,15,15s-6.71,15-15,15Z"/>
                                    </svg>
                                     امتیازات
                                </li>
                            </ul> : null
                        }

                        <ul className="extra-chairs">
                            {Array.from({length: game.extra_capacity}).map((_, index) => {
                                const chairNumber = index + 15;

                                const isReserved = reserves.some((obj) => {
                                    const chairArray = JSON.parse(obj.chair_no); // Convert the chair_no string to an array
                                    //return obj.status === true && chairArray.includes(chairNumber);
                                    return chairArray.includes(chairNumber);
                                });
                                if (isReserved)
                                    return (
                                        <li key={chairNumber} className="item">
                                            <div className="chair-container">
                                                <div className="tag">EXTRA</div>
                                                <div className="chair unavailable">
                                          <span className="number">
                                            #<span className="key">{chairNumber}</span>
                                          </span>


                                                    <svg className="chair-icon unavailable"
                                                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.52 42.55">
                                                        <path className="seat"
                                                              d="M30.95,25.68h0c-.72-1.03-1.91-1.61-3.16-1.54-.28,0-.53.03-.77.09l-.8.18,1.73-6.72c.71-2.74-.55-5.57-3.07-6.87-5.71-3.02-12.53-3.02-18.24,0-2.51,1.3-3.78,4.13-3.07,6.87l1.73,6.7-.79-.17c-.35-.07-.71-.1-1.06-.09-1.91.01-3.45,1.56-3.45,3.47,0,.45.09.88.26,1.3,1.35,3.3,3.66,6.03,6.7,7.89l.46.29-3.03,4.11c-.13.18-.19.41-.15.64s.16.43.35.56c.38.28.92.2,1.2-.18l3.2-4.34.36.15c2.03.84,4.17,1.26,6.36,1.26h.04c2.25,0,4.39-.42,6.42-1.26l.36-.15,3.21,4.34c.14.18.34.3.57.33.23.03.46-.03.64-.17.38-.28.46-.82.18-1.2l-3.03-4.1.46-.28c3.04-1.87,5.35-4.6,6.7-7.89.44-1.06.31-2.26-.32-3.21h.01ZM5.26,17.26c-.51-1.96.38-3.97,2.18-4.9,5.21-2.77,11.43-2.77,16.65,0,1.8.92,2.69,2.94,2.18,4.9l-2.42,9.37-.15.11c-2.37,1.65-5.15,2.47-7.93,2.47s-5.56-.82-7.93-2.47l-.15-.11-2.42-9.37h-.01ZM29.67,28.24c-2.31,5.65-7.76,9.31-13.86,9.31h-.02c-6.17,0-11.61-3.65-13.93-9.3-.17-.42-.17-.89,0-1.31.17-.42.51-.75.93-.92.21-.09.39-.14.65-.13.59-.09,1.25.16,1.68.67,1.69,2.13,5.72,4.4,10.63,4.4s8.95-2.27,10.62-4.39c.32-.42.82-.68,1.37-.68.62-.1,1.32.18,1.74.74.34.49.4,1.09.19,1.62h0Z"/>
                                                        <g>
                                                            <path className="mark"
                                                                  d="M6.56,9.2c0,.38,0,.77.06,1.15l.17,1.03c.46,1.91,1.53,3.63,3.05,4.89.06.06.17.11.23.17.53.41,1.11.76,1.72,1.04l.34.17c.5.23,1.02.41,1.55.52.29.06.52.12.8.17.42.05.84.07,1.26.06,5.08,0,9.2-4.12,9.2-9.19C24.95,4.12,20.83,0,15.75,0,10.67,0,6.56,4.12,6.56,9.19c0,0,0,0,0,0"/>
                                                            <path className="check"
                                                                  d="M11.79,11.78c-.35.37-.35.95,0,1.32.16.17.39.28.63.29.24,0,.47-.11.63-.29l2.7-2.65,2.64,2.64c.31.35.84.38,1.18.08.03-.02.05-.05.08-.08.35-.37.35-.95,0-1.32l-2.64-2.64,2.64-2.64c.37-.37.36-.96,0-1.32s-.96-.36-1.32,0h0l-2.64,2.64-2.59-2.64c-.35-.38-.94-.41-1.32-.07-.38.35-.41.94-.07,1.32.02.02.05.05.07.07l2.64,2.64-2.64,2.64Z"/>
                                                        </g>
                                                    </svg>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                return (
                                    <li key={chairNumber} className="item">
                                        <div className="chair-container" onClick={() => handleChairClick(chairNumber)}>
                                            <div className="tag">EXTRA</div>
                                            <div
                                                className={`chair ${selectedChairs.includes(chairNumber) ? 'selected' : ''}`}>
                                          <span className="number">
                                            #<span className="key">{chairNumber}</span>
                                          </span>
                                                <svg
                                                    className={`chair-icon ${selectedChairs.includes(chairNumber) ? 'selected' : 'available'}`}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 31.53 42.55"
                                                >
                                                    <path
                                                        className="seat"
                                                        d="M30.95,25.68h0c-.72-1.03-1.91-1.61-3.16-1.54-.28,0-.53.03-.77.09l-.8.18,1.73-6.72c.71-2.74-.55-5.57-3.07-6.87-5.71-3.02-12.53-3.02-18.24,0-2.51,1.3-3.78,4.13-3.07,6.87l1.73,6.7-.79-.17c-.35-.07-.71-.1-1.06-.09C1.54,24.14,0,25.69,0,27.6c0,.45.09.88.26,1.3,1.35,3.3,3.66,6.03,6.7,7.89l.46.29-3.03,4.11c-.13.18-.19.41-.15.64s.16.43.35.56c.38.28.92.2,1.2-.18l3.2-4.34.36.15c2.03.84,4.17,1.26,6.36,1.26h.04c2.25,0,4.39-.42,6.42-1.26l.36-.15,3.21,4.34c.14.18.34.3.57.33.23.03.46-.03.64-.17.38-.28.46-.82.18-1.2l-3.03-4.1.46-.28c3.04-1.87,5.35-4.6,6.7-7.89.44-1.06.31-2.26-.32-3.21ZM5.26,17.26c-.51-1.96.38-3.97,2.18-4.9,5.21-2.77,11.43-2.77,16.65,0,1.8.92,2.69,2.94,2.18,4.9l-2.42,9.37-.15.11c-2.37,1.65-5.15,2.47-7.93,2.47-2.78,0-5.56-.82-7.93-2.47l-.15-.11-2.42-9.37ZM29.67,28.24c-2.31,5.65-7.76,9.31-13.86,9.31h-.02c-6.17,0-11.61-3.65-13.93-9.3-.17-.42-.17-.89,0-1.31s.51-.75.93-.92c.21-.09.39-.14.65-.13.59-.09,1.25.16,1.68.67,1.69,2.13,5.72,4.4,10.63,4.4s8.95-2.27,10.62-4.39c.32-.42.82-.68,1.37-.68.62-.1,1.32.18,1.74.74.34.49.4,1.09.19,1.62Z"
                                                    />
                                                    <g>
                                                        <path
                                                            data-name="Path 2078"
                                                            className="mark"
                                                            d="M24.95,9.19c0,.34-.02.67-.06,1.01-.55,5.05-5.1,8.69-10.14,8.14-5.05-.55-8.69-5.1-8.14-10.14C7.17,3.14,11.71-.5,16.76.06c4.66.51,8.19,4.45,8.19,9.14"
                                                        />
                                                        <path
                                                            data-name="Path 2080"
                                                            className="check"
                                                            d="M14.49,13.4c-1.17-1.17-2.34-2.36-3.52-3.53-.13-.13-.13-.34,0-.47l1.36-1.35c.13-.13.34-.13.47,0l1.93,1.93,4.98-4.98c.13-.13.34-.13.48,0l1.36,1.36c.13.13.13.34,0,.47,0,0,0,0,0,0l-6.58,6.57c-.13.13-.34.13-.47,0,0,0,0,0,0,0"
                                                        />
                                                    </g>
                                                </svg>
                                            </div>
                                        </div>
                                    </li>
                                )

                            })}
                        </ul>
                       <div className="row">
                           <FAQ/>
                       </div>
                        <div className="space-50 d-none d-md-block"></div>
                    </div>
                    <div className="col-lg-6">
                        <div className="row">
                            {game.status !== 0 && localStorage.getItem("userDetails") && reserves.find(obj => obj.user_id === JSON.parse(localStorage.getItem("userDetails")).id)?
                                <div className="col-12">
                                    <div className="god">
                                        <ul className="player-info mt-md-0 show-character-container">
                                            <li className="tag">
                                                <div className="">
                                                    کارکتر شما در بازی :
                                                    <div className="character d-inline-block" style={{fontWeight : 800, paddingRight : 5}}>
                                                        {selectedCharacters.find(obj => obj.id === usersCharacter[JSON.parse(localStorage.getItem("userDetails")).id]).name}
                                                    </div>

                                                </div>
                                            </li>
                                            <li className="head">
                                                <div className="name">
                                                    {JSON.parse(localStorage.getItem("userDetails")).nickname ?
                                                        JSON.parse(localStorage.getItem("userDetails")).nickname
                                                        : "نام کاربری انتخاب نشده"
                                                    }
                                                </div>
                                                <div className="level">
                                                    Lv.
                                                    <span
                                                        className="lvl">{JSON.parse(localStorage.getItem("userDetails")).level}</span>
                                                    <div className="icon-container">
                                                    <img src={LevelIcon} alt="Level"/>
                                                    </div>

                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="space-50"></div>
                                </div>
                                : null}
                            <div className="col-12">
                                <div className="game">
                                    <div className="game-container">
                                        <ul className="chairs right-side">
                                            {
                                                Array.from({length: Math.floor(game.capacity / 2)}).map((_, index) => {
                                                        const chairNumber = index + 1;
                                                        const isReserved = reserves.some((obj) => {
                                                            const chairArray = JSON.parse(obj.chair_no); // Convert the chair_no string to an array
                                                            return chairArray.includes(chairNumber);
                                                        });
                                                        const chair = reserves.find(obj => parseInt(JSON.parse(obj.chair_no)) === chairNumber);
                                                        if (isReserved)
                                                            return (
                                                                <li key={index} className="item">
                                                                    <div className="chair unavailable">
                                                        <span className="number">
                                                             #<span className="key">{chairNumber}</span>
                                                        </span>
                                                                        {chair && chair.user && chair.user.avatar ?
                                                                            <div className="avatar-img-container">
                                                                                <img src={chair.user.avatar}
                                                                                     alt={chair.user.nickname ?? chair.user.name}/>
                                                                            </div>
                                                                            :
                                                                            <svg className="chair-icon unavailable"
                                                                                 xmlns="http://www.w3.org/2000/svg"
                                                                                 viewBox="0 0 31.52 42.55">
                                                                                <path className="seat"
                                                                                      d="M30.95,25.68h0c-.72-1.03-1.91-1.61-3.16-1.54-.28,0-.53.03-.77.09l-.8.18,1.73-6.72c.71-2.74-.55-5.57-3.07-6.87-5.71-3.02-12.53-3.02-18.24,0-2.51,1.3-3.78,4.13-3.07,6.87l1.73,6.7-.79-.17c-.35-.07-.71-.1-1.06-.09-1.91.01-3.45,1.56-3.45,3.47,0,.45.09.88.26,1.3,1.35,3.3,3.66,6.03,6.7,7.89l.46.29-3.03,4.11c-.13.18-.19.41-.15.64s.16.43.35.56c.38.28.92.2,1.2-.18l3.2-4.34.36.15c2.03.84,4.17,1.26,6.36,1.26h.04c2.25,0,4.39-.42,6.42-1.26l.36-.15,3.21,4.34c.14.18.34.3.57.33.23.03.46-.03.64-.17.38-.28.46-.82.18-1.2l-3.03-4.1.46-.28c3.04-1.87,5.35-4.6,6.7-7.89.44-1.06.31-2.26-.32-3.21h.01ZM5.26,17.26c-.51-1.96.38-3.97,2.18-4.9,5.21-2.77,11.43-2.77,16.65,0,1.8.92,2.69,2.94,2.18,4.9l-2.42,9.37-.15.11c-2.37,1.65-5.15,2.47-7.93,2.47s-5.56-.82-7.93-2.47l-.15-.11-2.42-9.37h-.01ZM29.67,28.24c-2.31,5.65-7.76,9.31-13.86,9.31h-.02c-6.17,0-11.61-3.65-13.93-9.3-.17-.42-.17-.89,0-1.31.17-.42.51-.75.93-.92.21-.09.39-.14.65-.13.59-.09,1.25.16,1.68.67,1.69,2.13,5.72,4.4,10.63,4.4s8.95-2.27,10.62-4.39c.32-.42.82-.68,1.37-.68.62-.1,1.32.18,1.74.74.34.49.4,1.09.19,1.62h0Z"/>
                                                                                <g>
                                                                                    <path className="mark"
                                                                                          d="M6.56,9.2c0,.38,0,.77.06,1.15l.17,1.03c.46,1.91,1.53,3.63,3.05,4.89.06.06.17.11.23.17.53.41,1.11.76,1.72,1.04l.34.17c.5.23,1.02.41,1.55.52.29.06.52.12.8.17.42.05.84.07,1.26.06,5.08,0,9.2-4.12,9.2-9.19C24.95,4.12,20.83,0,15.75,0,10.67,0,6.56,4.12,6.56,9.19c0,0,0,0,0,0"/>
                                                                                    <path className="check"
                                                                                          d="M11.79,11.78c-.35.37-.35.95,0,1.32.16.17.39.28.63.29.24,0,.47-.11.63-.29l2.7-2.65,2.64,2.64c.31.35.84.38,1.18.08.03-.02.05-.05.08-.08.35-.37.35-.95,0-1.32l-2.64-2.64,2.64-2.64c.37-.37.36-.96,0-1.32s-.96-.36-1.32,0h0l-2.64,2.64-2.59-2.64c-.35-.38-.94-.41-1.32-.07-.38.35-.41.94-.07,1.32.02.02.05.05.07.07l2.64,2.64-2.64,2.64Z"/>
                                                                                </g>
                                                                            </svg>
                                                                        }

                                                                    </div>
                                                                </li>
                                                            )
                                                        else
                                                            return (
                                                                <li key={index} className="item">
                                                                    <div onClick={() => handleChairClick(chairNumber)}
                                                                         className={`chair ${selectedChairs.includes(chairNumber) ? 'selected' : ''}`}>
                                                        <span className="number">
                                                             #<span className="key">{chairNumber}</span>
                                                        </span>
                                                                        <svg className="chair-icon available"
                                                                             xmlns="http://www.w3.org/2000/svg"
                                                                             viewBox="0 0 31.53 42.55">
                                                                            <path className="seat"
                                                                                  d="M30.95,25.68h0c-.72-1.03-1.91-1.61-3.16-1.54-.28,0-.53.03-.77.09l-.8.18,1.73-6.72c.71-2.74-.55-5.57-3.07-6.87-5.71-3.02-12.53-3.02-18.24,0-2.51,1.3-3.78,4.13-3.07,6.87l1.73,6.7-.79-.17c-.35-.07-.71-.1-1.06-.09C1.54,24.14,0,25.69,0,27.6c0,.45.09.88.26,1.3,1.35,3.3,3.66,6.03,6.7,7.89l.46.29-3.03,4.11c-.13.18-.19.41-.15.64s.16.43.35.56c.38.28.92.2,1.2-.18l3.2-4.34.36.15c2.03.84,4.17,1.26,6.36,1.26h.04c2.25,0,4.39-.42,6.42-1.26l.36-.15,3.21,4.34c.14.18.34.3.57.33.23.03.46-.03.64-.17.38-.28.46-.82.18-1.2l-3.03-4.1.46-.28c3.04-1.87,5.35-4.6,6.7-7.89.44-1.06.31-2.26-.32-3.21ZM5.26,17.26c-.51-1.96.38-3.97,2.18-4.9,5.21-2.77,11.43-2.77,16.65,0,1.8.92,2.69,2.94,2.18,4.9l-2.42,9.37-.15.11c-2.37,1.65-5.15,2.47-7.93,2.47-2.78,0-5.56-.82-7.93-2.47l-.15-.11-2.42-9.37ZM29.67,28.24c-2.31,5.65-7.76,9.31-13.86,9.31h-.02c-6.17,0-11.61-3.65-13.93-9.3-.17-.42-.17-.89,0-1.31s.51-.75.93-.92c.21-.09.39-.14.65-.13.59-.09,1.25.16,1.68.67,1.69,2.13,5.72,4.4,10.63,4.4s8.95-2.27,10.62-4.39c.32-.42.82-.68,1.37-.68.62-.1,1.32.18,1.74.74.34.49.4,1.09.19,1.62Z"/>
                                                                            <g>
                                                                                <path data-name="Path 2078" className="mark"
                                                                                      d="M24.95,9.19c0,.34-.02.67-.06,1.01-.55,5.05-5.1,8.69-10.14,8.14-5.05-.55-8.69-5.1-8.14-10.14C7.17,3.14,11.71-.5,16.76.06c4.66.51,8.19,4.45,8.19,9.14"/>
                                                                                <path data-name="Path 2080" className="check"
                                                                                      d="M14.49,13.4c-1.17-1.17-2.34-2.36-3.52-3.53-.13-.13-.13-.34,0-.47l1.36-1.35c.13-.13.34-.13.47,0l1.93,1.93,4.98-4.98c.13-.13.34-.13.48,0l1.36,1.36c.13.13.13.34,0,.47,0,0,0,0,0,0l-6.58,6.57c-.13.13-.34.13-.47,0,0,0,0,0,0,0"/>
                                                                            </g>
                                                                        </svg>
                                                                    </div>
                                                                </li>
                                                            )
                                                    }
                                                )}

                                        </ul>
                                        <ul className="chairs left-side">
                                            {
                                                Array.from({length: Math.floor(game.capacity / 2)}).map((_, index) => {
                                                        const chairNumber = index + Math.floor(game.capacity / 2)+1;

                                                        const isReserved = reserves.some((obj) => {
                                                            const chairArray = JSON.parse(obj.chair_no); // Convert the chair_no string to an array
                                                            return chairArray.includes(chairNumber);
                                                        });
                                                        const chair = reserves.find(obj => parseInt(JSON.parse(obj.chair_no)) === chairNumber);
                                                        if (isReserved )
                                                            return (
                                                                <li key={index} className="item">
                                                                    <div className="chair unavailable">
                                                        <span className="number">
                                                             #<span className="key">{chairNumber}</span>
                                                        </span>
                                                                        {chair && chair.user && chair.user.avatar ?
                                                                            <div className="avatar-img-container">
                                                                                <img src={chair.user.avatar}
                                                                                     alt={chair.user.nickname ?? chair.user.name}/>
                                                                            </div>
                                                                            :
                                                                            <svg className="chair-icon unavailable"
                                                                                 xmlns="http://www.w3.org/2000/svg"
                                                                                 viewBox="0 0 31.52 42.55">
                                                                                <path className="seat"
                                                                                      d="M30.95,25.68h0c-.72-1.03-1.91-1.61-3.16-1.54-.28,0-.53.03-.77.09l-.8.18,1.73-6.72c.71-2.74-.55-5.57-3.07-6.87-5.71-3.02-12.53-3.02-18.24,0-2.51,1.3-3.78,4.13-3.07,6.87l1.73,6.7-.79-.17c-.35-.07-.71-.1-1.06-.09-1.91.01-3.45,1.56-3.45,3.47,0,.45.09.88.26,1.3,1.35,3.3,3.66,6.03,6.7,7.89l.46.29-3.03,4.11c-.13.18-.19.41-.15.64s.16.43.35.56c.38.28.92.2,1.2-.18l3.2-4.34.36.15c2.03.84,4.17,1.26,6.36,1.26h.04c2.25,0,4.39-.42,6.42-1.26l.36-.15,3.21,4.34c.14.18.34.3.57.33.23.03.46-.03.64-.17.38-.28.46-.82.18-1.2l-3.03-4.1.46-.28c3.04-1.87,5.35-4.6,6.7-7.89.44-1.06.31-2.26-.32-3.21h.01ZM5.26,17.26c-.51-1.96.38-3.97,2.18-4.9,5.21-2.77,11.43-2.77,16.65,0,1.8.92,2.69,2.94,2.18,4.9l-2.42,9.37-.15.11c-2.37,1.65-5.15,2.47-7.93,2.47s-5.56-.82-7.93-2.47l-.15-.11-2.42-9.37h-.01ZM29.67,28.24c-2.31,5.65-7.76,9.31-13.86,9.31h-.02c-6.17,0-11.61-3.65-13.93-9.3-.17-.42-.17-.89,0-1.31.17-.42.51-.75.93-.92.21-.09.39-.14.65-.13.59-.09,1.25.16,1.68.67,1.69,2.13,5.72,4.4,10.63,4.4s8.95-2.27,10.62-4.39c.32-.42.82-.68,1.37-.68.62-.1,1.32.18,1.74.74.34.49.4,1.09.19,1.62h0Z"/>
                                                                                <g>
                                                                                    <path className="mark"
                                                                                          d="M6.56,9.2c0,.38,0,.77.06,1.15l.17,1.03c.46,1.91,1.53,3.63,3.05,4.89.06.06.17.11.23.17.53.41,1.11.76,1.72,1.04l.34.17c.5.23,1.02.41,1.55.52.29.06.52.12.8.17.42.05.84.07,1.26.06,5.08,0,9.2-4.12,9.2-9.19C24.95,4.12,20.83,0,15.75,0,10.67,0,6.56,4.12,6.56,9.19c0,0,0,0,0,0"/>
                                                                                    <path className="check"
                                                                                          d="M11.79,11.78c-.35.37-.35.95,0,1.32.16.17.39.28.63.29.24,0,.47-.11.63-.29l2.7-2.65,2.64,2.64c.31.35.84.38,1.18.08.03-.02.05-.05.08-.08.35-.37.35-.95,0-1.32l-2.64-2.64,2.64-2.64c.37-.37.36-.96,0-1.32s-.96-.36-1.32,0h0l-2.64,2.64-2.59-2.64c-.35-.38-.94-.41-1.32-.07-.38.35-.41.94-.07,1.32.02.02.05.05.07.07l2.64,2.64-2.64,2.64Z"/>
                                                                                </g>
                                                                            </svg>
                                                                        }
                                                                    </div>
                                                                </li>
                                                            )
                                                        else
                                                            return (
                                                                <li key={index} className="item">
                                                                    <div onClick={() => handleChairClick(chairNumber)}
                                                                         className={`chair ${selectedChairs.includes(chairNumber) ? 'selected' : ''}`}>
                                                        <span className="number">
                                                             #<span className="key">{chairNumber}</span>
                                                        </span>
                                                                        <svg className="chair-icon available"
                                                                             xmlns="http://www.w3.org/2000/svg"
                                                                             viewBox="0 0 31.53 42.55">
                                                                            <path className="seat"
                                                                                  d="M30.95,25.68h0c-.72-1.03-1.91-1.61-3.16-1.54-.28,0-.53.03-.77.09l-.8.18,1.73-6.72c.71-2.74-.55-5.57-3.07-6.87-5.71-3.02-12.53-3.02-18.24,0-2.51,1.3-3.78,4.13-3.07,6.87l1.73,6.7-.79-.17c-.35-.07-.71-.1-1.06-.09C1.54,24.14,0,25.69,0,27.6c0,.45.09.88.26,1.3,1.35,3.3,3.66,6.03,6.7,7.89l.46.29-3.03,4.11c-.13.18-.19.41-.15.64s.16.43.35.56c.38.28.92.2,1.2-.18l3.2-4.34.36.15c2.03.84,4.17,1.26,6.36,1.26h.04c2.25,0,4.39-.42,6.42-1.26l.36-.15,3.21,4.34c.14.18.34.3.57.33.23.03.46-.03.64-.17.38-.28.46-.82.18-1.2l-3.03-4.1.46-.28c3.04-1.87,5.35-4.6,6.7-7.89.44-1.06.31-2.26-.32-3.21ZM5.26,17.26c-.51-1.96.38-3.97,2.18-4.9,5.21-2.77,11.43-2.77,16.65,0,1.8.92,2.69,2.94,2.18,4.9l-2.42,9.37-.15.11c-2.37,1.65-5.15,2.47-7.93,2.47-2.78,0-5.56-.82-7.93-2.47l-.15-.11-2.42-9.37ZM29.67,28.24c-2.31,5.65-7.76,9.31-13.86,9.31h-.02c-6.17,0-11.61-3.65-13.93-9.3-.17-.42-.17-.89,0-1.31s.51-.75.93-.92c.21-.09.39-.14.65-.13.59-.09,1.25.16,1.68.67,1.69,2.13,5.72,4.4,10.63,4.4s8.95-2.27,10.62-4.39c.32-.42.82-.68,1.37-.68.62-.1,1.32.18,1.74.74.34.49.4,1.09.19,1.62Z"/>
                                                                            <g>
                                                                                <path data-name="Path 2078" className="mark"
                                                                                      d="M24.95,9.19c0,.34-.02.67-.06,1.01-.55,5.05-5.1,8.69-10.14,8.14-5.05-.55-8.69-5.1-8.14-10.14C7.17,3.14,11.71-.5,16.76.06c4.66.51,8.19,4.45,8.19,9.14"/>
                                                                                <path data-name="Path 2080" className="check"
                                                                                      d="M14.49,13.4c-1.17-1.17-2.34-2.36-3.52-3.53-.13-.13-.13-.34,0-.47l1.36-1.35c.13-.13.34-.13.47,0l1.93,1.93,4.98-4.98c.13-.13.34-.13.48,0l1.36,1.36c.13.13.13.34,0,.47,0,0,0,0,0,0l-6.58,6.57c-.13.13-.34.13-.47,0,0,0,0,0,0,0"/>
                                                                            </g>
                                                                        </svg>
                                                                    </div>
                                                                </li>
                                                            )
                                                    }
                                                )}

                                        </ul>
                                        <ul className="content">
                                            <li className="item date mb-0 mt-0">
                                                <ConvertToShamsiDate gregorianDate={game.created_at}/>
                                            </li>
                                            <li className="item mt-0 ">
                                                <span className="val">{game.clock.split('-')[0]}</span>
                                                <span className="notice">الی</span>
                                                <span className="val">{game.clock.split('-')[1]}</span>
                                                <div className="notice">شـروع و پـایـان</div>
                                                {game.status === 0 ? (
                                                    <div className="status standby">STANDBY</div>
                                                ) : game.status === 1 ? (
                                                    <div className="status live">LIVE</div>
                                                ) : (
                                                    <div className="status ended">ENDED</div>
                                                )}
                                            </li>
                                            <li className="goal">
                                                <div className="img-container">
                                                    <img src={GoalIcon} alt="goal"/>
                                                </div>
                                                <div className="txt">SCENARIO</div>
                                                <div className="xp">
                                                    {/*  <span className="notice">فصل</span>*/}
                                                    {game.game_scenario ?
                                                        game.scenario.name : "هنوز انتخاب نشده"}

                                                </div>
                                            </li>
                                            {
                                                selectedChairs.length ?
                                                    <li className="reserve-btn-container"
                                                        onClick={() => localStorage.getItem("authToken") ? setShowReserveModal(true) : props.setloginModal(true)}>
                                                        <div className="reserve-btn">رزرو جایگاه انتخاب شده</div>
                                                    </li>
                                                    :
                                                    null
                                            }
                                            <li className="tag item mb-5">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 116.25 67.4">
                                                    <g>
                                                        <g>
                                                            <path
                                                                d="M13.67.04l6.85.02c2.27.03,3.41,1.16,3.42,3.38-.01,2.3-1.16,3.45-3.44,3.44l-6.82.02c-4.55-.03-6.82,2.24-6.82,6.82s2.28,6.81,6.84,6.84h6.8c2.28.04,3.42,1.17,3.42,3.38s-1.13,3.42-3.38,3.44h-6.84C4.59,27.36.03,22.8.02,13.69.02,4.58,4.57.02,13.67.04Z"/>
                                                            <path
                                                                d="M32.91,27.38c-.58,0-1.14-.15-1.68-.44-.54-.29-.97-.71-1.27-1.26s-.46-1.12-.46-1.73,1.7-4.31,5.11-11.16c3.41-6.85,5.26-10.54,5.55-11.08.3-.54.72-.96,1.26-1.26.55-.3,1.12-.45,1.71-.45s1.16.15,1.7.45c.54.3.96.72,1.27,1.26.3.54,2.16,4.24,5.59,11.08,3.42,6.85,5.13,10.57,5.13,11.16s-.15,1.18-.46,1.73c-.31.55-.73.97-1.28,1.26-.55.29-1.11.44-1.68.44h-20.49ZM47.82,20.49l-4.68-9.62-4.7,9.62h9.38Z"/>
                                                            <path
                                                                d="M65.78,0l17.29.04c2.13.03,3.2,1.14,3.21,3.31,0,2.32-1.15,3.5-3.45,3.54h-13.62v3.38h13.67c2.26.03,3.39,1.17,3.4,3.42-.03,2.28-1.17,3.42-3.4,3.42l-13.67.02v6.84c-.01,2.24-1.16,3.38-3.44,3.4-2.27,0-3.41-1.1-3.42-3.32V3.45c.01-2.26,1.15-3.41,3.42-3.45Z"/>
                                                            <path
                                                                d="M95.24,0l17.29.04c2.13.03,3.2,1.14,3.21,3.31,0,2.32-1.15,3.5-3.45,3.54h-13.62v13.62h13.59c2.3.01,3.45,1.16,3.45,3.45-.01,2.24-1.14,3.38-3.38,3.4h-17.09c-2.27,0-3.41-1.1-3.42-3.32V3.45c.01-2.26,1.15-3.41,3.42-3.45ZM100.31,13.78c.02-2.28,1.15-3.44,3.38-3.47h6.87c2.28.02,3.43,1.17,3.47,3.43-.05,2.28-1.2,3.42-3.45,3.42h-6.87c-2.26.01-3.39-1.12-3.4-3.38Z"/>
                                                        </g>
                                                        <g>
                                                            <path
                                                                d="M13.67,40.03l6.87-.02c2.23.01,3.36,1.16,3.38,3.45-.02,2.26-1.15,3.37-3.37,3.33l-6.85.03c-1.16,0-2.29.29-3.38.88s-1.94,1.43-2.55,2.53-.92,2.25-.92,3.44.3,2.32.91,3.4c.6,1.08,1.45,1.93,2.54,2.53,1.09.6,2.22.91,3.41.91s2.38-.28,3.6-.85c1.21-.56,2.09-1.44,2.64-2.62h-2.85c-2.3.01-3.46-1.11-3.47-3.35,0-2.28,1.14-3.44,3.42-3.47l6.87.03c2.3.05,3.46,1.2,3.47,3.45,0,2.37-.6,4.64-1.8,6.81-1.2,2.17-2.89,3.86-5.07,5.06-2.18,1.2-4.46,1.8-6.84,1.8s-4.63-.6-6.8-1.8c-2.18-1.2-3.87-2.89-5.07-5.06-1.2-2.17-1.8-4.44-1.8-6.81s.61-4.67,1.83-6.86c1.22-2.19,2.92-3.88,5.1-5.06,2.18-1.18,4.43-1.77,6.74-1.77Z"/>
                                                            <path
                                                                d="M34.23,67.38c-.58,0-1.14-.15-1.68-.44-.54-.29-.97-.71-1.27-1.26-.31-.55-.46-1.12-.46-1.73s1.7-4.31,5.11-11.16c3.41-6.85,5.26-10.54,5.55-11.08.29-.54.72-.96,1.26-1.26.55-.3,1.12-.45,1.71-.45s1.16.15,1.7.45c.54.3.96.72,1.26,1.26.3.54,2.16,4.24,5.59,11.08,3.42,6.85,5.14,10.57,5.14,11.16s-.15,1.18-.46,1.73c-.31.55-.74.97-1.28,1.26-.55.29-1.11.44-1.67.44h-20.49ZM49.13,60.49l-4.68-9.62-4.7,9.62h9.38Z"/>
                                                            <path
                                                                d="M64.96,40.03c1.15.02,2,.31,2.55.87.55.56,3.13,3.13,7.74,7.72,4.56-4.56,7.12-7.13,7.69-7.72.57-.59,1.42-.88,2.55-.88,2.27.01,3.41,1.14,3.42,3.4l.02,20.51c0,2.27-1.15,3.42-3.45,3.45-2.26-.01-3.4-1.16-3.44-3.45v-12.08c-2.29,2.36-3.72,3.83-4.28,4.4-.56.58-1.41.86-2.54.86s-1.93-.3-2.52-.89c-.59-.59-2.02-2.03-4.3-4.31v12.01c-.01,2.26-1.15,3.4-3.42,3.42-2.29.01-3.43-1.13-3.42-3.42v-20.51c0-2.27,1.13-3.4,3.4-3.4Z"/>
                                                            <path
                                                                d="M95.74,40l17.29.04c2.13.03,3.2,1.14,3.21,3.31,0,2.32-1.15,3.5-3.45,3.54h-13.62v13.62h13.59c2.3.01,3.45,1.16,3.45,3.45-.01,2.24-1.14,3.38-3.38,3.4h-17.09c-2.27,0-3.41-1.1-3.42-3.32v-20.59c.01-2.26,1.15-3.41,3.42-3.45ZM100.81,53.77c.02-2.28,1.15-3.44,3.38-3.47h6.87c2.28.02,3.43,1.17,3.47,3.43-.05,2.28-1.2,3.42-3.45,3.42h-6.87c-2.26.01-3.39-1.12-3.4-3.38Z"/>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </li>

                                            {parseInt(game.capacity)  % 2 === 0 ?
                                                <li className="d-flex justify-content-center">
                                                    <div className="game-21-badge">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.18 39.53">
                                                            <g>
                                                                <path
                                                                    d="M3.32,17.74h3.14c.06-.36.12-.71.19-1.06.55-2.41,2.79-4.05,5.26-3.85,1.12.09,2.18.53,3.04,1.26,1.43,1.13,2.06,2.99,1.61,4.76-.4,1.86-1.25,3.59-2.49,5.03-.79.96-1.65,1.87-2.52,2.76-2.11,2.17-4.24,4.31-6.35,6.47-.95.97-1.87,1.95-2.8,2.94-.08.1-.12.22-.12.35.07.53-.16,1.06-.6,1.38-.46.41-1.52,1.51-1.66,1.64,0-.11-.01-.16-.01-.22,0-1.27-.01-2.54,0-3.81.01-.15.08-.29.18-.4,2.18-2.22,4.37-4.44,6.56-6.65,1.47-1.49,2.95-2.98,4.38-4.5,1.08-1.12,1.99-2.4,2.67-3.81.29-.56.48-1.16.58-1.78.25-1.5-.76-2.92-2.26-3.18-.22-.04-.44-.05-.66-.03-1.39.03-2.57,1.04-2.8,2.42-.11.72-.17,1.45-.19,2.18,0,.1,0,.21,0,.32H.81c.02-.28.04-.55.07-.81.1-.98.14-1.98.33-2.93.46-2.51,1.85-4.75,3.89-6.27,3.07-2.33,6.52-3.04,10.17-1.76,3.25,1.04,5.72,3.71,6.5,7.03.25,1.15.29,2.34.11,3.5-.36,2.65-1.42,5.16-3.05,7.28-.89,1.26-1.87,2.45-2.94,3.56-2.38,2.41-4.74,4.82-7.11,7.24-.08.08-.48.51-.48.51,0,0,.88-.02,1.19-.02,1.19,0,2.38-.06,3.57-.07,2.25-.03,4.5-.05,6.75-.07.06,0,.13,0,.21-.01v-2.83h-6.61s.04-.09.07-.13c.63-.64,1.26-1.27,1.89-1.91.13-.14.33-.22.52-.2,2,0,3.99,0,5.99,0h.3v7.34H3.11c.11-.12.17-.19.24-.25,2.48-2.51,4.97-5.01,7.43-7.54,1.53-1.57,3.04-3.16,4.49-4.8,1.58-1.79,2.87-3.83,3.82-6.02.84-1.74.97-3.73.39-5.57-.81-2.72-3.12-4.72-5.93-5.13-2.79-.58-5.68.25-7.74,2.21-1.42,1.27-2.3,3.04-2.46,4.93-.01.15-.01.3-.02.49"/>
                                                                <path
                                                                    d="M31.12,31.07h-7.68V7.47h-6.74c.42-.69.82-1.34,1.22-2,1.06-1.77,2.12-3.55,3.18-5.33C21.18,0,21.27,0,21.4,0h9.72v31.07ZM25.73,5.2v23.56h3.12V2.28s-.04-.02-.06-.02h-6.23c-.07.01-.15.05-.19.11-.54.87-1.07,1.75-1.6,2.63-.03.05-.05.11-.09.19h5.05Z"/>
                                                                <path
                                                                    d="M28.86,37.2v2.33h-2.72v-2.31h-2.31v-2.72h2.31v-2.31h2.72v2.3h2.32v2.73h-2.32Z"/>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </li>
                                                :(reserves.some(obj => {
                                                    const chairNumbers = JSON.parse(obj.chair_no);
                                                    return chairNumbers.includes(parseInt(game.capacity));
                                                }) ? (
                                                        <li className="single-chair-container">
                                                            <div key={game.capacity} className="single-chair unavailable">
                                                                <div className="chair unavailable">
                                                        <span className="number">
                                                             #<span className="key">{game.capacity}</span>
                                                        </span>

                                                                    {reserves.find(obj => parseInt(JSON.parse(obj.chair_no)) === parseInt(game.capacity)).user && reserves.find(obj => parseInt(JSON.parse(obj.chair_no)) === parseInt(game.capacity)).user.avatar ?
                                                                        <div className="avatar-img-container">
                                                                            <img src={reserves.find(obj => parseInt(JSON.parse(obj.chair_no)) === parseInt(game.capacity)).user.avatar}
                                                                                 alt={reserves.find(obj => parseInt(JSON.parse(obj.chair_no)) === parseInt(game.capacity)).user.nickname ?? reserves.find(obj => parseInt(JSON.parse(obj.chair_no)) === parseInt(game.capacity)).user.name}/>
                                                                        </div>
                                                                        :
                                                                        <svg className="chair-icon unavailable"
                                                                             xmlns="http://www.w3.org/2000/svg"
                                                                             viewBox="0 0 31.52 42.55">
                                                                            <path className="seat"
                                                                                  d="M30.95,25.68h0c-.72-1.03-1.91-1.61-3.16-1.54-.28,0-.53.03-.77.09l-.8.18,1.73-6.72c.71-2.74-.55-5.57-3.07-6.87-5.71-3.02-12.53-3.02-18.24,0-2.51,1.3-3.78,4.13-3.07,6.87l1.73,6.7-.79-.17c-.35-.07-.71-.1-1.06-.09-1.91.01-3.45,1.56-3.45,3.47,0,.45.09.88.26,1.3,1.35,3.3,3.66,6.03,6.7,7.89l.46.29-3.03,4.11c-.13.18-.19.41-.15.64s.16.43.35.56c.38.28.92.2,1.2-.18l3.2-4.34.36.15c2.03.84,4.17,1.26,6.36,1.26h.04c2.25,0,4.39-.42,6.42-1.26l.36-.15,3.21,4.34c.14.18.34.3.57.33.23.03.46-.03.64-.17.38-.28.46-.82.18-1.2l-3.03-4.1.46-.28c3.04-1.87,5.35-4.6,6.7-7.89.44-1.06.31-2.26-.32-3.21h.01ZM5.26,17.26c-.51-1.96.38-3.97,2.18-4.9,5.21-2.77,11.43-2.77,16.65,0,1.8.92,2.69,2.94,2.18,4.9l-2.42,9.37-.15.11c-2.37,1.65-5.15,2.47-7.93,2.47s-5.56-.82-7.93-2.47l-.15-.11-2.42-9.37h-.01ZM29.67,28.24c-2.31,5.65-7.76,9.31-13.86,9.31h-.02c-6.17,0-11.61-3.65-13.93-9.3-.17-.42-.17-.89,0-1.31.17-.42.51-.75.93-.92.21-.09.39-.14.65-.13.59-.09,1.25.16,1.68.67,1.69,2.13,5.72,4.4,10.63,4.4s8.95-2.27,10.62-4.39c.32-.42.82-.68,1.37-.68.62-.1,1.32.18,1.74.74.34.49.4,1.09.19,1.62h0Z"/>
                                                                            <g>
                                                                                <path className="mark"
                                                                                      d="M6.56,9.2c0,.38,0,.77.06,1.15l.17,1.03c.46,1.91,1.53,3.63,3.05,4.89.06.06.17.11.23.17.53.41,1.11.76,1.72,1.04l.34.17c.5.23,1.02.41,1.55.52.29.06.52.12.8.17.42.05.84.07,1.26.06,5.08,0,9.2-4.12,9.2-9.19C24.95,4.12,20.83,0,15.75,0,10.67,0,6.56,4.12,6.56,9.19c0,0,0,0,0,0"/>
                                                                                <path className="check"
                                                                                      d="M11.79,11.78c-.35.37-.35.95,0,1.32.16.17.39.28.63.29.24,0,.47-.11.63-.29l2.7-2.65,2.64,2.64c.31.35.84.38,1.18.08.03-.02.05-.05.08-.08.35-.37.35-.95,0-1.32l-2.64-2.64,2.64-2.64c.37-.37.36-.96,0-1.32s-.96-.36-1.32,0h0l-2.64,2.64-2.59-2.64c-.35-.38-.94-.41-1.32-.07-.38.35-.41.94-.07,1.32.02.02.05.05.07.07l2.64,2.64-2.64,2.64Z"/>
                                                                            </g>
                                                                        </svg>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </li>)
                                                    :
                                                    <li
                                                        className="single-chair-container"
                                                        onClick={() => handleChairClick(parseInt(game.capacity))}>
                                                        <div
                                                            className={`single-chair ${selectedChairs.includes(parseInt(game.capacity)) ? 'selected' : ''}`}>
                                                            <div
                                                                className="chair">
                                                        <span className="number">
                                                             #<span className="key">{game.capacity}</span>
                                                        </span>
                                                                <svg className="chair-icon available"
                                                                     xmlns="http://www.w3.org/2000/svg"
                                                                     viewBox="0 0 31.53 42.55">
                                                                    <path className="seat"
                                                                          d="M30.95,25.68h0c-.72-1.03-1.91-1.61-3.16-1.54-.28,0-.53.03-.77.09l-.8.18,1.73-6.72c.71-2.74-.55-5.57-3.07-6.87-5.71-3.02-12.53-3.02-18.24,0-2.51,1.3-3.78,4.13-3.07,6.87l1.73,6.7-.79-.17c-.35-.07-.71-.1-1.06-.09C1.54,24.14,0,25.69,0,27.6c0,.45.09.88.26,1.3,1.35,3.3,3.66,6.03,6.7,7.89l.46.29-3.03,4.11c-.13.18-.19.41-.15.64s.16.43.35.56c.38.28.92.2,1.2-.18l3.2-4.34.36.15c2.03.84,4.17,1.26,6.36,1.26h.04c2.25,0,4.39-.42,6.42-1.26l.36-.15,3.21,4.34c.14.18.34.3.57.33.23.03.46-.03.64-.17.38-.28.46-.82.18-1.2l-3.03-4.1.46-.28c3.04-1.87,5.35-4.6,6.7-7.89.44-1.06.31-2.26-.32-3.21ZM5.26,17.26c-.51-1.96.38-3.97,2.18-4.9,5.21-2.77,11.43-2.77,16.65,0,1.8.92,2.69,2.94,2.18,4.9l-2.42,9.37-.15.11c-2.37,1.65-5.15,2.47-7.93,2.47-2.78,0-5.56-.82-7.93-2.47l-.15-.11-2.42-9.37ZM29.67,28.24c-2.31,5.65-7.76,9.31-13.86,9.31h-.02c-6.17,0-11.61-3.65-13.93-9.3-.17-.42-.17-.89,0-1.31s.51-.75.93-.92c.21-.09.39-.14.65-.13.59-.09,1.25.16,1.68.67,1.69,2.13,5.72,4.4,10.63,4.4s8.95-2.27,10.62-4.39c.32-.42.82-.68,1.37-.68.62-.1,1.32.18,1.74.74.34.49.4,1.09.19,1.62Z"/>
                                                                    <g>
                                                                        <path data-name="Path 2078" className="mark"
                                                                              d="M24.95,9.19c0,.34-.02.67-.06,1.01-.55,5.05-5.1,8.69-10.14,8.14-5.05-.55-8.69-5.1-8.14-10.14C7.17,3.14,11.71-.5,16.76.06c4.66.51,8.19,4.45,8.19,9.14"/>
                                                                        <path data-name="Path 2080"
                                                                              className="check"
                                                                              d="M14.49,13.4c-1.17-1.17-2.34-2.36-3.52-3.53-.13-.13-.13-.34,0-.47l1.36-1.35c.13-.13.34-.13.47,0l1.93,1.93,4.98-4.98c.13-.13.34-.13.48,0l1.36,1.36c.13.13.13.34,0,.47,0,0,0,0,0,0l-6.58,6.57c-.13.13-.34.13-.47,0,0,0,0,0,0,0"/>
                                                                    </g>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </li>)


                                            }

                                        </ul>
                                    </div>
                                </div>
                                <div className="space-50"></div>
                                <div className="space-50"></div>
                                <div className="space-50"></div>
                                <div className="space-50"></div>
                            </div>
                        </div>
                        </div>
                    </div>
                                            :
                                            <div className="row">
                                            <div className="col-lg-6">
                                            <div className="section-top mt-0 ">
                                            <div className="section-header w-100">
                                            <Skeleton width="50%" height="20px"/>
                                            <div className="cube-num">
                                            <img src={CubeIcon} alt="cube"/>
                                <div className="cube">CUBE</div>
                                <div className="tag">
                                    <Skeleton width="80%" height="10px"/>
                                </div>
                            </div>
                            <Skeleton width="80%" height="10px"/>
                        </div>
                    </div>
                    <div className="game-page-info">
                        <ul className="mafia-info w-50">
                            <li className="item d-flex align-items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480">
                                    <path
                                        d="M479.82,144h-95.82c-35.35,0-64-28.65-64-64V0h-192C57.3,0,0,57.3,0,128v224c0,70.7,57.3,128,128,128h224c70.7,0,128-57.3,128-128v-203.14c0-1.62-.06-3.25-.18-4.86ZM216,336h-96c-8.84,0-16-7.16-16-16s7.16-16,16-16h96c8.84,0,16,7.16,16,16s-7.16,16-16,16ZM360,240H120c-8.84,0-16-7.16-16-16s7.16-16,16-16h240c8.84,0,16,7.16,16,16s-7.16,16-16,16Z"/>
                                    <path
                                        d="M384,112h84.32c-2.51-3.57-5.41-6.9-8.65-9.93l-90.92-84.86c-4.99-4.66-10.66-8.46-16.75-11.28v74.06c0,17.67,14.33,32,32,32Z"/>
                                </svg>
                                <Skeleton width="80%" height="15px"/>
                            </li>
                            <li className="item d-flex align-items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.06 23.06">
                                    <path
                                        d="M21.49,18.87h-3.67c-2.31,0-4.19-1.88-4.19-4.19s1.88-4.19,4.19-4.19h3.67c.29,0,.52-.23.52-.52h0v-1.57c0-1.1-.85-1.99-1.93-2.08l-3.01-5.26c-.28-.49-.73-.83-1.27-.98-.54-.14-1.1-.07-1.58.21L3.91,6.29h-1.81c-1.16,0-2.1.94-2.1,2.1v12.58c0,1.16.94,2.1,2.1,2.1h17.82c1.16,0,2.1-.94,2.1-2.1v-1.57c0-.29-.23-.52-.52-.52h0,0ZM17.73,4.3l1.14,1.99h-4.57l3.43-1.99ZM5.99,6.29L14.76,1.19c.24-.14.51-.18.78-.1.27.07.49.24.63.49h0s-8.1,4.72-8.1,4.72c0,0-2.07,0-2.07,0Z"/>
                                        <path
                                            d="M21.49,11.53h-3.67c-1.73,0-3.15,1.41-3.15,3.15s1.41,3.15,3.15,3.15h3.67c.87,0,1.57-.71,1.57-1.57v-3.15c0-.87-.71-1.57-1.57-1.57h0ZM17.82,15.73c-.58,0-1.05-.47-1.05-1.05s.47-1.05,1.05-1.05,1.05.47,1.05,1.05c0,.58-.47,1.05-1.05,1.05Z"/>
                                    </svg>
                                    <Skeleton width="80%" height="15px"/>
                                </li>
                            </ul>
                            <ul className="mafia-info left w-50">
                                <li className="item d-flex align-items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.1 23.07">
                                        <path
                                            d="M10.76.8l-2.94,5.96-6.58.96c-.79.11-1.33.85-1.22,1.63.05.31.19.6.42.82l4.77,4.64-1.13,6.55c-.13.78.39,1.53,1.18,1.66.31.05.63,0,.91-.15l5.89-3.09,5.89,3.09c.7.37,1.58.1,1.95-.61.15-.28.2-.6.14-.91l-1.12-6.55,4.76-4.64c.57-.56.58-1.47.02-2.04-.22-.23-.51-.37-.82-.42l-6.58-.96L13.34.8c-.35-.71-1.22-1.01-1.93-.65-.28.14-.51.37-.65.65Z"/>
                                    </svg>
                                    <Skeleton width="80%" height="15px"/>
                                </li>
                                <li className="item d-flex align-items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60.17 60.17">
                                        <path
                                            d="M51.57,60.17h6.45c1.19,0,2.15-.96,2.15-2.15v-6.45c0-1.19-.96-2.15-2.15-2.15s-2.15.96-2.15,2.15v4.3h-4.3c-1.19,0-2.15.96-2.15,2.15s.96,2.15,2.15,2.15ZM8.6,55.87h-4.3v-4.3c0-1.19-.96-2.15-2.15-2.15s-2.15.96-2.15,2.15v6.45c0,1.19.96,2.15,2.15,2.15h6.45c1.19,0,2.15-.96,2.15-2.15s-.96-2.15-2.15-2.15ZM10.74,51.57h38.68c1.19,0,2.15-.96,2.15-2.15,0-5.96-2.61-9.74-4.97-11.51-1.32-.98-2.63-1.39-3.62-1.39-2.28,0-3.99.65-5.7,1.47-1.91.92-3.81,2.11-7.19,2.11-3.55,0-5.84-1.19-7.81-2.12-1.77-.84-3.36-1.47-5.09-1.47-1,0-2.35.45-3.68,1.51-2.36,1.88-4.92,5.8-4.92,11.38,0,1.19.96,2.15,2.15,2.15ZM42.57,25.79h-25.69c.97,2.27,2.28,4.42,3.85,6.16,2.51,2.81,5.65,4.58,9,4.58s6.49-1.77,9-4.58c1.56-1.75,2.88-3.89,3.84-6.16h0ZM6.45,23.64h47.27c1.19,0,2.15-.96,2.15-2.15s-.96-2.15-2.15-2.15H6.45c-1.19,0-2.15.96-2.15,2.15s.96,2.15,2.15,2.15ZM15.04,17.19h29.36c-.14-8.35-6.69-15.04-14.68-15.04s-14.54,6.69-14.68,15.04ZM8.6,0H2.15C.96,0,0,.96,0,2.15v6.45c0,1.19.96,2.15,2.15,2.15s2.15-.96,2.15-2.15v-4.3h4.3c1.19,0,2.15-.96,2.15-2.15s-.96-2.15-2.15-2.15ZM51.57,4.3h4.3v4.3c0,1.19.96,2.15,2.15,2.15s2.15-.96,2.15-2.15V2.15c0-1.19-.96-2.15-2.15-2.15h-6.45c-1.19,0-2.15.96-2.15,2.15s.96,2.15,2.15,2.15Z"/>
                                    </svg>
                                    <Skeleton width="80%" height="15px"/>
                                </li>
                            </ul>

                            <div className="god">
                                <div className="avatar">
                                    <div className="img-container">
                                        <Skeleton width="100%" height="100%"/>
                                    </div>
                                </div>
                                <ul className="player-info">
                                    <Skeleton width="50%" height="20px"/>
                                    <li className="head">
                                        <Skeleton width="90%" height="10px"/>
                                    </li>
                                </ul>
                            </div>
                        </div>


                        <div className="faq">
                            <div className="text-right mt-5">
                                <Skeleton width="30%" height="20px"/>
                                <Skeleton width="90%" height="10px"/>
                            </div>
                            <ul className="faq">
                                <li className="question">
                                    <div className="question-mark">
                                        <Skeleton width="100%" height="100%"/>
                                    </div>
                                    <div className="content" style={{width: "70%"}}>
                                        <div className="head mt-1">
                                            <Skeleton width="50%" height="15px"/>
                                        </div>
                                        <div className="description">
                                            <Skeleton width="90%" height="10px"/>
                                        </div>
                                    </div>
                                    <div className="angle">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5.82 10.67">
                                            <path
                                                d="M5.33,10.67c-.13,0-.25-.05-.34-.14L.14,5.68c-.19-.19-.19-.5,0-.68,0,0,0,0,0,0L4.99.14c.19-.19.5-.19.69,0s.19.5,0,.69L1.17,5.33l4.51,4.51c.19.19.19.5,0,.69-.09.09-.21.14-.34.14h0Z"/>
                                        </svg>
                                    </div>
                                </li>
                                <li className="question">
                                    <div className="question-mark">
                                        <Skeleton width="100%" height="100%"/>
                                    </div>
                                    <div className="content" style={{width: "70%"}}>
                                        <div className="head mt-1">
                                            <Skeleton width="50%" height="15px"/>
                                        </div>
                                        <div className="description">
                                            <Skeleton width="90%" height="10px"/>
                                        </div>
                                    </div>
                                    <div className="angle">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5.82 10.67">
                                            <path
                                                d="M5.33,10.67c-.13,0-.25-.05-.34-.14L.14,5.68c-.19-.19-.19-.5,0-.68,0,0,0,0,0,0L4.99.14c.19-.19.5-.19.69,0s.19.5,0,.69L1.17,5.33l4.51,4.51c.19.19.19.5,0,.69-.09.09-.21.14-.34.14h0Z"/>
                                        </svg>
                                    </div>
                                </li>
                                <li className="question">
                                    <div className="question-mark">
                                        <Skeleton width="100%" height="100%"/>
                                    </div>
                                    <div className="content" style={{width: "70%"}}>
                                        <div className="head mt-1">
                                            <Skeleton width="50%" height="15px"/>
                                        </div>
                                        <div className="description">
                                            <Skeleton width="90%" height="10px"/>
                                        </div>
                                    </div>
                                    <div className="angle">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5.82 10.67">
                                            <path
                                                d="M5.33,10.67c-.13,0-.25-.05-.34-.14L.14,5.68c-.19-.19-.19-.5,0-.68,0,0,0,0,0,0L4.99.14c.19-.19.5-.19.69,0s.19.5,0,.69L1.17,5.33l4.51,4.51c.19.19.19.5,0,.69-.09.09-.21.14-.34.14h0Z"/>
                                        </svg>
                                    </div>
                                </li>
                            </ul>
                            <ul className="faq-footer">
                                <div className="img-container">
                                    <img loading={"lazy"} src={FAQImage} alt="faq"/>
                                </div>
                                <div className="content w-50">
                                    <div className="head">
                                        <Skeleton width="100%" height="35px"/>
                                    </div>
                                    <Skeleton width="50%" height="15px"/>
                                </div>
                            </ul>
                        </div>
                        <div className="space-50"></div>
                    </div>
                    <div className="col-lg-6">
                        <div className="game">
                            <div className="game-container">
                                <ul className="chairs right-side">
                                    {Array.from({length: 7}).map((_, index) => {
                                            const chairNumber = index + 1;
                                                return (
                                                    <li key={index} className="item">
                                                        <div className="chair unavailable">
                                                        <span className="number" style={{zIndex : "3"}}>
                                                             #<span className="key">{chairNumber}</span>
                                                        </span>
                                                            <svg style={{transform: "translateY(-3px)", zIndex : "2"}}
                                                                 className="chair-icon unavailable position-absolute"
                                                                 xmlns="http://www.w3.org/2000/svg"
                                                                 viewBox="0 0 31.52 42.55">
                                                                <path style={{fill : "rgb(197 197 197)"}} className="seat"
                                                                      d="M30.95,25.68h0c-.72-1.03-1.91-1.61-3.16-1.54-.28,0-.53.03-.77.09l-.8.18,1.73-6.72c.71-2.74-.55-5.57-3.07-6.87-5.71-3.02-12.53-3.02-18.24,0-2.51,1.3-3.78,4.13-3.07,6.87l1.73,6.7-.79-.17c-.35-.07-.71-.1-1.06-.09-1.91.01-3.45,1.56-3.45,3.47,0,.45.09.88.26,1.3,1.35,3.3,3.66,6.03,6.7,7.89l.46.29-3.03,4.11c-.13.18-.19.41-.15.64s.16.43.35.56c.38.28.92.2,1.2-.18l3.2-4.34.36.15c2.03.84,4.17,1.26,6.36,1.26h.04c2.25,0,4.39-.42,6.42-1.26l.36-.15,3.21,4.34c.14.18.34.3.57.33.23.03.46-.03.64-.17.38-.28.46-.82.18-1.2l-3.03-4.1.46-.28c3.04-1.87,5.35-4.6,6.7-7.89.44-1.06.31-2.26-.32-3.21h.01ZM5.26,17.26c-.51-1.96.38-3.97,2.18-4.9,5.21-2.77,11.43-2.77,16.65,0,1.8.92,2.69,2.94,2.18,4.9l-2.42,9.37-.15.11c-2.37,1.65-5.15,2.47-7.93,2.47s-5.56-.82-7.93-2.47l-.15-.11-2.42-9.37h-.01ZM29.67,28.24c-2.31,5.65-7.76,9.31-13.86,9.31h-.02c-6.17,0-11.61-3.65-13.93-9.3-.17-.42-.17-.89,0-1.31.17-.42.51-.75.93-.92.21-.09.39-.14.65-.13.59-.09,1.25.16,1.68.67,1.69,2.13,5.72,4.4,10.63,4.4s8.95-2.27,10.62-4.39c.32-.42.82-.68,1.37-.68.62-.1,1.32.18,1.74.74.34.49.4,1.09.19,1.62h0Z"/>
                                                            </svg>
                                                            <Skeleton width="100%" circle={1} height="100%"/>
                                                        </div>
                                                    </li>
                                                )
                                        }
                                    )}

                                </ul>
                                <ul className="chairs left-side">
                                    {Array.from({length: 7}).map((_, index) => {
                                        const chairNumber = index + 8;
                                        return (
                                            <li key={index} className="item">
                                                <div className="chair unavailable">
                                                        <span className="number" style={{zIndex: "3"}}>
                                                             #<span className="key">{chairNumber}</span>
                                                        </span>
                                                    <svg style={{transform: "translateY(-3px)", zIndex: "2"}}
                                                         className="chair-icon unavailable position-absolute"
                                                         xmlns="http://www.w3.org/2000/svg"
                                                         viewBox="0 0 31.52 42.55">
                                                        <path style={{fill: "rgb(197 197 197)"}} className="seat"
                                                              d="M30.95,25.68h0c-.72-1.03-1.91-1.61-3.16-1.54-.28,0-.53.03-.77.09l-.8.18,1.73-6.72c.71-2.74-.55-5.57-3.07-6.87-5.71-3.02-12.53-3.02-18.24,0-2.51,1.3-3.78,4.13-3.07,6.87l1.73,6.7-.79-.17c-.35-.07-.71-.1-1.06-.09-1.91.01-3.45,1.56-3.45,3.47,0,.45.09.88.26,1.3,1.35,3.3,3.66,6.03,6.7,7.89l.46.29-3.03,4.11c-.13.18-.19.41-.15.64s.16.43.35.56c.38.28.92.2,1.2-.18l3.2-4.34.36.15c2.03.84,4.17,1.26,6.36,1.26h.04c2.25,0,4.39-.42,6.42-1.26l.36-.15,3.21,4.34c.14.18.34.3.57.33.23.03.46-.03.64-.17.38-.28.46-.82.18-1.2l-3.03-4.1.46-.28c3.04-1.87,5.35-4.6,6.7-7.89.44-1.06.31-2.26-.32-3.21h.01ZM5.26,17.26c-.51-1.96.38-3.97,2.18-4.9,5.21-2.77,11.43-2.77,16.65,0,1.8.92,2.69,2.94,2.18,4.9l-2.42,9.37-.15.11c-2.37,1.65-5.15,2.47-7.93,2.47s-5.56-.82-7.93-2.47l-.15-.11-2.42-9.37h-.01ZM29.67,28.24c-2.31,5.65-7.76,9.31-13.86,9.31h-.02c-6.17,0-11.61-3.65-13.93-9.3-.17-.42-.17-.89,0-1.31.17-.42.51-.75.93-.92.21-.09.39-.14.65-.13.59-.09,1.25.16,1.68.67,1.69,2.13,5.72,4.4,10.63,4.4s8.95-2.27,10.62-4.39c.32-.42.82-.68,1.37-.68.62-.1,1.32.18,1.74.74.34.49.4,1.09.19,1.62h0Z"/>
                                                    </svg>
                                                    <Skeleton width="100%" circle={1} height="100%"/>
                                                </div>
                                            </li>
                                        )
                                        }
                                    )}

                                </ul>
                                <ul className="content">
                                    <li style={{backgroundColor: "transparent"}} className="item date mb-0 mt-0">
                                        <Skeleton width="90px" height="30px"/>
                                    </li>
                                    <li className="item mt-0 ">
                                        <span className="val"> <Skeleton width="45px" height="25px"/></span>
                                        <span style={{position: "relative", top: "-10px"}} className="notice">الی</span>
                                        <span className="val"><Skeleton width="45px" height="25px"/></span>
                                        <div className="notice">شـروع و پـایـان</div>
                                        <Skeleton width="30%" height="20px"/>
                                    </li>
                                    <li className="goal">
                                        <div className="img-container">
                                            <img src={GoalIcon} alt="goal"/>
                                        </div>
                                        <div className="txt">SCENARIO</div>
                                        <Skeleton width="50%" height="25px"/>

                                    </li>
                                    {
                                        selectedChairs.length ?
                                            <li className="reserve-btn-container"
                                                onClick={() => localStorage.getItem("authToken") ? setShowReserveModal(true) : props.setloginModal(true)}>
                                                <div className="reserve-btn">رزرو جایگاه انتخاب شده</div>
                                            </li>
                                            :
                                            null
                                    }
                                    <li className="tag item mb-5">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 116.25 67.4">
                                            <g>
                                                <g>
                                                    <path
                                                        d="M13.67.04l6.85.02c2.27.03,3.41,1.16,3.42,3.38-.01,2.3-1.16,3.45-3.44,3.44l-6.82.02c-4.55-.03-6.82,2.24-6.82,6.82s2.28,6.81,6.84,6.84h6.8c2.28.04,3.42,1.17,3.42,3.38s-1.13,3.42-3.38,3.44h-6.84C4.59,27.36.03,22.8.02,13.69.02,4.58,4.57.02,13.67.04Z"/>
                                                    <path
                                                        d="M32.91,27.38c-.58,0-1.14-.15-1.68-.44-.54-.29-.97-.71-1.27-1.26s-.46-1.12-.46-1.73,1.7-4.31,5.11-11.16c3.41-6.85,5.26-10.54,5.55-11.08.3-.54.72-.96,1.26-1.26.55-.3,1.12-.45,1.71-.45s1.16.15,1.7.45c.54.3.96.72,1.27,1.26.3.54,2.16,4.24,5.59,11.08,3.42,6.85,5.13,10.57,5.13,11.16s-.15,1.18-.46,1.73c-.31.55-.73.97-1.28,1.26-.55.29-1.11.44-1.68.44h-20.49ZM47.82,20.49l-4.68-9.62-4.7,9.62h9.38Z"/>
                                                    <path
                                                        d="M65.78,0l17.29.04c2.13.03,3.2,1.14,3.21,3.31,0,2.32-1.15,3.5-3.45,3.54h-13.62v3.38h13.67c2.26.03,3.39,1.17,3.4,3.42-.03,2.28-1.17,3.42-3.4,3.42l-13.67.02v6.84c-.01,2.24-1.16,3.38-3.44,3.4-2.27,0-3.41-1.1-3.42-3.32V3.45c.01-2.26,1.15-3.41,3.42-3.45Z"/>
                                                    <path
                                                        d="M95.24,0l17.29.04c2.13.03,3.2,1.14,3.21,3.31,0,2.32-1.15,3.5-3.45,3.54h-13.62v13.62h13.59c2.3.01,3.45,1.16,3.45,3.45-.01,2.24-1.14,3.38-3.38,3.4h-17.09c-2.27,0-3.41-1.1-3.42-3.32V3.45c.01-2.26,1.15-3.41,3.42-3.45ZM100.31,13.78c.02-2.28,1.15-3.44,3.38-3.47h6.87c2.28.02,3.43,1.17,3.47,3.43-.05,2.28-1.2,3.42-3.45,3.42h-6.87c-2.26.01-3.39-1.12-3.4-3.38Z"/>
                                                </g>
                                                <g>
                                                    <path
                                                        d="M13.67,40.03l6.87-.02c2.23.01,3.36,1.16,3.38,3.45-.02,2.26-1.15,3.37-3.37,3.33l-6.85.03c-1.16,0-2.29.29-3.38.88s-1.94,1.43-2.55,2.53-.92,2.25-.92,3.44.3,2.32.91,3.4c.6,1.08,1.45,1.93,2.54,2.53,1.09.6,2.22.91,3.41.91s2.38-.28,3.6-.85c1.21-.56,2.09-1.44,2.64-2.62h-2.85c-2.3.01-3.46-1.11-3.47-3.35,0-2.28,1.14-3.44,3.42-3.47l6.87.03c2.3.05,3.46,1.2,3.47,3.45,0,2.37-.6,4.64-1.8,6.81-1.2,2.17-2.89,3.86-5.07,5.06-2.18,1.2-4.46,1.8-6.84,1.8s-4.63-.6-6.8-1.8c-2.18-1.2-3.87-2.89-5.07-5.06-1.2-2.17-1.8-4.44-1.8-6.81s.61-4.67,1.83-6.86c1.22-2.19,2.92-3.88,5.1-5.06,2.18-1.18,4.43-1.77,6.74-1.77Z"/>
                                                    <path
                                                        d="M34.23,67.38c-.58,0-1.14-.15-1.68-.44-.54-.29-.97-.71-1.27-1.26-.31-.55-.46-1.12-.46-1.73s1.7-4.31,5.11-11.16c3.41-6.85,5.26-10.54,5.55-11.08.29-.54.72-.96,1.26-1.26.55-.3,1.12-.45,1.71-.45s1.16.15,1.7.45c.54.3.96.72,1.26,1.26.3.54,2.16,4.24,5.59,11.08,3.42,6.85,5.14,10.57,5.14,11.16s-.15,1.18-.46,1.73c-.31.55-.74.97-1.28,1.26-.55.29-1.11.44-1.67.44h-20.49ZM49.13,60.49l-4.68-9.62-4.7,9.62h9.38Z"/>
                                                    <path
                                                        d="M64.96,40.03c1.15.02,2,.31,2.55.87.55.56,3.13,3.13,7.74,7.72,4.56-4.56,7.12-7.13,7.69-7.72.57-.59,1.42-.88,2.55-.88,2.27.01,3.41,1.14,3.42,3.4l.02,20.51c0,2.27-1.15,3.42-3.45,3.45-2.26-.01-3.4-1.16-3.44-3.45v-12.08c-2.29,2.36-3.72,3.83-4.28,4.4-.56.58-1.41.86-2.54.86s-1.93-.3-2.52-.89c-.59-.59-2.02-2.03-4.3-4.31v12.01c-.01,2.26-1.15,3.4-3.42,3.42-2.29.01-3.43-1.13-3.42-3.42v-20.51c0-2.27,1.13-3.4,3.4-3.4Z"/>
                                                    <path
                                                        d="M95.74,40l17.29.04c2.13.03,3.2,1.14,3.21,3.31,0,2.32-1.15,3.5-3.45,3.54h-13.62v13.62h13.59c2.3.01,3.45,1.16,3.45,3.45-.01,2.24-1.14,3.38-3.38,3.4h-17.09c-2.27,0-3.41-1.1-3.42-3.32v-20.59c.01-2.26,1.15-3.41,3.42-3.45ZM100.81,53.77c.02-2.28,1.15-3.44,3.38-3.47h6.87c2.28.02,3.43,1.17,3.47,3.43-.05,2.28-1.2,3.42-3.45,3.42h-6.87c-2.26.01-3.39-1.12-3.4-3.38Z"/>
                                                </g>
                                            </g>
                                        </svg>
                                    </li>
                                    <li className="d-flex justify-content-center">
                                        <div className="game-21-badge">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.18 39.53">
                                                <g>
                                                    <path
                                                        d="M3.32,17.74h3.14c.06-.36.12-.71.19-1.06.55-2.41,2.79-4.05,5.26-3.85,1.12.09,2.18.53,3.04,1.26,1.43,1.13,2.06,2.99,1.61,4.76-.4,1.86-1.25,3.59-2.49,5.03-.79.96-1.65,1.87-2.52,2.76-2.11,2.17-4.24,4.31-6.35,6.47-.95.97-1.87,1.95-2.8,2.94-.08.1-.12.22-.12.35.07.53-.16,1.06-.6,1.38-.46.41-1.52,1.51-1.66,1.64,0-.11-.01-.16-.01-.22,0-1.27-.01-2.54,0-3.81.01-.15.08-.29.18-.4,2.18-2.22,4.37-4.44,6.56-6.65,1.47-1.49,2.95-2.98,4.38-4.5,1.08-1.12,1.99-2.4,2.67-3.81.29-.56.48-1.16.58-1.78.25-1.5-.76-2.92-2.26-3.18-.22-.04-.44-.05-.66-.03-1.39.03-2.57,1.04-2.8,2.42-.11.72-.17,1.45-.19,2.18,0,.1,0,.21,0,.32H.81c.02-.28.04-.55.07-.81.1-.98.14-1.98.33-2.93.46-2.51,1.85-4.75,3.89-6.27,3.07-2.33,6.52-3.04,10.17-1.76,3.25,1.04,5.72,3.71,6.5,7.03.25,1.15.29,2.34.11,3.5-.36,2.65-1.42,5.16-3.05,7.28-.89,1.26-1.87,2.45-2.94,3.56-2.38,2.41-4.74,4.82-7.11,7.24-.08.08-.48.51-.48.51,0,0,.88-.02,1.19-.02,1.19,0,2.38-.06,3.57-.07,2.25-.03,4.5-.05,6.75-.07.06,0,.13,0,.21-.01v-2.83h-6.61s.04-.09.07-.13c.63-.64,1.26-1.27,1.89-1.91.13-.14.33-.22.52-.2,2,0,3.99,0,5.99,0h.3v7.34H3.11c.11-.12.17-.19.24-.25,2.48-2.51,4.97-5.01,7.43-7.54,1.53-1.57,3.04-3.16,4.49-4.8,1.58-1.79,2.87-3.83,3.82-6.02.84-1.74.97-3.73.39-5.57-.81-2.72-3.12-4.72-5.93-5.13-2.79-.58-5.68.25-7.74,2.21-1.42,1.27-2.3,3.04-2.46,4.93-.01.15-.01.3-.02.49"/>
                                                    <path
                                                        d="M31.12,31.07h-7.68V7.47h-6.74c.42-.69.82-1.34,1.22-2,1.06-1.77,2.12-3.55,3.18-5.33C21.18,0,21.27,0,21.4,0h9.72v31.07ZM25.73,5.2v23.56h3.12V2.28s-.04-.02-.06-.02h-6.23c-.07.01-.15.05-.19.11-.54.87-1.07,1.75-1.6,2.63-.03.05-.05.11-.09.19h5.05Z"/>
                                                    <path
                                                        d="M28.86,37.2v2.33h-2.72v-2.31h-2.31v-2.72h2.31v-2.31h2.72v2.3h2.32v2.73h-2.32Z"/>
                                                </g>
                                            </svg>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="space-50"></div>
                        <div className="space-50"></div>
                        <div className="space-50"></div>
                        <div className="space-50"></div>
                    </div>
                </div>
            }
        </div>
    );
}

export default Game;
