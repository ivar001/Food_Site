import {useRouteError} from "react-router-dom";

const Error = () => {
    const err=useRouteError();
    return(
        <div>
            <h1>Oops!!</h1>
            <h1>Something bad happened</h1>
            <h2>{err.status + " : " +err.status.Text}</h2>
        </div>
    )
}

export default Error;