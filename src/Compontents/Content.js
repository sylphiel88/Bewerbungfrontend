import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import TheMagic from "./TheMagic";
import BwListe from "./BwListe";

function Content(props) {
    return (
        <Router>
            <div class="content">
                <Routes>
                    <Route path="/bewerbungen" element={<BwListe/>}/>
                    <Route path="/" element={<TheMagic/>}/>
                </Routes>
            </div>
        </Router>
    )
}

export default Content