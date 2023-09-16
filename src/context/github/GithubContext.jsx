import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user : {},
    repos:[],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  //get searched user result
  const searchUsers = async (text) => {
    setLoading();
    const params = new URLSearchParams({
      q: text,
    });
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`);

    const { items } = await response.json();

    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };
  //get a spectific user
  const getUser = async (login) => {
    setLoading();
    
    const response = await fetch(`${GITHUB_URL}/users/${login}`);

    if(response.status===404){
      window.location = '/notfound'
    }
    const data = await response.json();

    dispatch({
      type: "GET_USER",
      payload: data,
    });
  };
  //get user repos
  const getUserRepos = async (login) => {
    setLoading();
    
    const response = await fetch(`${GITHUB_URL}/users/${login}/repos`);

    const data = await response.json();

    dispatch({
      type: "GET_REPOS",
      payload: data,
    });
  };
  
  //set loading

  const setLoading = () =>
    dispatch({
      type: "SET_LOADING",
    });

  // clear users
  const handleClear = ()=>{
    dispatch({
      type: "CLEAR_USERS"
    })
  }

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        repos: state.repos,
        user:state.user,
        searchUsers,
        handleClear,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
