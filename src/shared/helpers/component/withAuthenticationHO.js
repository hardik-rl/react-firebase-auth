import { Navigate } from "react-router-dom";
import { getToken } from "./utils";

const withAuthenticationHO = (ComposedComponent) => {
    const Component = (props) =>{
        if(getToken('AuthToken')){
           return  <ComposedComponent {...props}/>
        }
        return <Navigate to={"auth/login"}/>
    }
    return <Component />
}

export default withAuthenticationHO;