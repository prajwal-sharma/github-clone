import { useEffect, useContext } from "react";
import GithubContext from "../../context/github/GithubContext";
import { useParams,Link } from "react-router-dom";
import Spinner from  '../layout/Spinner'
import {FaCodepen, FaStore, FaUserFriends, FaUsers} from 'react-icons/fa' 

function User() {
    
    const {getUser , user, loading} = useContext(GithubContext)
    const params = useParams()
    useEffect(()=>{
          
        getUser(params.login)

    },[])

    if(loading){
        return <Spinner></Spinner>
    }

    return <div>{user.login}</div>
}

export default User;