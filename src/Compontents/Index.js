import React, {useState, useEffect} from "react";
import Header from "./Header"
import Wrapper from "./Wrapper";
import Content from "./Content";
import Footer from "./Footer";


function Index(props){
    const [ reload, setReload ] = useState(false)
    useEffect(()=>{
        if(!reload){
            setReload(true)
        }
    },[reload])

    function handler(){
        setReload(false)
    }
    return <div>{reload&&<Wrapper><Header/><Content/><Footer handler={handler}/></Wrapper>}</div>
}

export default Index