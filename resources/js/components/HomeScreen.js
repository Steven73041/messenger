import React from 'react';
import Sidebar from "./Sidebar";
import Posts from "./Posts/Posts";

const HomeScreen = () => {
    return (
        <div className="homeScreen row">
            <Sidebar />
            <div className={"col-sm-8"}>
                <Posts />
            </div>
        </div>
    );
};
export default HomeScreen;
