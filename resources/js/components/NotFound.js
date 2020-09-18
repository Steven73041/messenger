import React from "react";
import {Link} from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="notFound">
            Nothing was found here, testing routing 404
            <div>
                <Link to={"/"}>Home</Link>
            </div>
        </div>
    )
};
export default NotFound;
