let isLogin = localStorage.getItem("isLogin");

const initialState = {
  isLogin: isLogin || false, // initially isLogin is false
  allUserData: null,
}

const reducer = (state = initialState, action) => {
    const newState = {...state};
    if(action.type == 'ALL_USERS') {
        newState.allUserData = action.value;
    }
    if(action.type == 'USER_LOGIN') {
       newState.isLogin = true
    }
    if(action.type == 'USER_LOGOUT') {
        localStorage.removeItem("isLogin");
        newState.isLogin = false;
     }
    return newState;
}

export default reducer;