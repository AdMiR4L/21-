
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
import React, {useState} from "react";
function Home(props) {

    return (

        <div className="App">
            <Landing/>
            <Cubes/>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="row">
                            <TopPlayers/>
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
