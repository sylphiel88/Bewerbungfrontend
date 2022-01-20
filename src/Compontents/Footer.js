import React from "react";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";

function Footer(props) {
    return <div class="footer">
        <Router>
            <Routes>
                <Route exact path="/" element={<Link to="/bewerbungen" onClick={props.handler}><div class="bwliste">bisherige bewerbungen</div></Link>}></Route>
                <Route exact path="/bewerbungen" element={<Link to="/" onClick={props.handler}><div class="bwliste">zurück</div></Link>}></Route>
            </Routes>
        </Router>
    </div>
}

export default Footer