export const getAllUserData = (data) => {
    return dispach =>{
        dispach(setAllDataToLocalStorage(data));
    } 
};

export const setLogin = () => {
    return dispach =>{
        dispach(setDataToLocalStorage());
    } 
}

export const setAllDataToLocalStorage = (data) => {
    localStorage.setItem("allUsers", JSON.stringify(data)); // save all data to localStorage we can skip it because no need
    return { type: "ALL_USERS", value: data};
}

export const setDataToLocalStorage = () => {
    localStorage.setItem("isLogin", true); // setting data to localStorage
    return { type: 'USER_LOGIN', value: true};
}

export const logOut = () => {
    return { type: 'USER_LOGOUT'};
}

