import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import Main from "./components/main/Main"
import { useState } from "react";

function App() {
    let [link,setLink]=useState("/catalog");

    function linkHandler(event){
        link=event.target.href.replace("http://localhost:5173","");
        setLink(link);
    }

    return (
        <>
            <Header onLinkHandler={linkHandler}/>
            <Main link={link}/>
            <Footer />
        </>
    )
}

export default App
