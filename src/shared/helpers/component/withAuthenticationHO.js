import { Navigate } from "react-router-dom";
import { getToken } from "./utils";

const withAuthenticationHO = (ComposedComponent) => {
    const Component = (props) =>{
        if(getToken('HomehubToken')){
           return  <ComposedComponent {...props}/>
        }
        return <Navigate to={"/homehub/login"}/>
    }
    return <Component />
}

export default withAuthenticationHO;