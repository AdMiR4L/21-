
import '../assets/css/fontiran.css';
import Header from "../layers/Header";
import Landing from "../layouts/Landing";
import Cubes from "../layouts/Cubes";
import TopPlayers from "../layouts/TopPlayers";
import MainSlider from "../layouts/MainSlider";
import Feed from "../layouts/Feed";
import Articles from "../layouts/Articles";
import FAQ from "../layouts/FAQ";
import Footer from "../layers/Footer";
import React, {useEffect, useState} from "react";
import axios from "axios";
function Home(props) {


    const [isLoading, setIsLoading] = useState(true);
    const [leaderBoard, setLeaderBoard] = useState({});
    const [weekChampion, setWeekChampion] = useState([]);
    function leaderBoardApi() {
        axios.get( process.env.REACT_APP_API + "leaderboard")
            .then(response => {
                setLeaderBoard(response.data.players)
                setWeekChampion(response.data.champion)
                console.log(response.data)
                setIsLoading(false)
            });
    }
    useEffect(() => {
        document.title = '21+ SPORT CLUB'
        leaderBoardApi()
    }, []);


    return (

        <div className="App">
            <Landing isLoading={isLoading} weekChampion={weekChampion} />
            <Cubes/>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="row">
                            <TopPlayers isLoading={isLoading} leaderBoard={leaderBoard} />
                            <FAQ/>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="row">
                            <MainSlider/>
                            <Feed/>
                            <Articles/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-25"></div>
        </div>
    );
}

export default Home;
