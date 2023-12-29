import { Navigate } from "react-router-dom"
import { getToken } from "./utils"

const withoutAuthenticationHO = (ComposedComponent) => {
    const Component = (props) =>{
        if(getToken('AuthToken')){
           return <Navigate to="/" />
        }
        return <ComposedComponent {...props}/>
    }
    return <Component />
}

export default withoutAuthenticationHO;