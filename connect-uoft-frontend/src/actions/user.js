import ENV from "../config";
const BASE_API_URL = ENV.apiBaseUrl

// note: careful with order of parameters

// check if session is valid
export const checkSession = (setIsUserLoggedIn, setIsAdmin) => {
    if(!ENV.useFrontendTestUser){
        fetch(`${BASE_API_URL}/api/user/check-session`)
            .then((res) => {
                if(!res.ok){
                    console.log("check session response code:", res.status)
                    setIsAdmin(false)
                    setIsUserLoggedIn(false)
                    return;
                }
                return res.json()
            })
            .then((sessionInfo) =>{
                // previous then only returns json if response code is 200
                if (sessionInfo){
                    // console.log('session info', sessionInfo)
                    setIsUserLoggedIn(true)
                    setIsAdmin(sessionInfo.isAdmin ? sessionInfo.isAdmin : false)
                }
            })
            .catch((err) => {
                console.log("could not check session:",err)
                setIsUserLoggedIn(false)
            })
    }
    else{
        setIsUserLoggedIn(true)
        setIsAdmin(ENV.frontendTestUserIsAdmin)
    }
}

// logout, delete session
export const logout = (setIsUserLoggedIn, setIsAdmin) => {
    console.log('logout')
    fetch(`${BASE_API_URL}/api/user/logout`)
        .then((res) => {
            if(!res.ok){
                console.log("could not log out:", res.status)
                alert("server issue, could not log out")
                return;
            }
            setIsUserLoggedIn(false)
            setIsAdmin(false)
        })
        .catch((err) => {
            console.log("could not log out, error:", err)
        })
}

// login, create session
export const login = (username, password, setIsIncorrectCredentials, setIsUserLoggedIn, setIsAdmin, setPassword) =>{

    fetch(`${BASE_API_URL}/api/user/login`,{
        method: "post",
        body: JSON.stringify({username, password}),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })
        .then((res) =>{
            if(!res.ok){
                console.log("invalid login: response code ", res.status)
                setIsIncorrectCredentials(true)
                return;
            }
            return res.json()
        })
        .then((responseInfo) =>{
            if (responseInfo){
                // console.log(responseInfo)
                setIsUserLoggedIn(true)
                setIsAdmin(responseInfo.isAdmin ? responseInfo.isAdmin : false)
                setPassword("")
            }
        })
        .catch((err) =>{
            console.log("error with logging in: ", err)
        })
}

// returns true if the email passed in is a valid email format
const validateEmail = (email) =>{
    // RFC 5322 standard email regex from http://emailregex.com/
    return email.match('(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])')
}

// create a account (does not sign in)
export const signup = (username, password, email, setMessage, setPassword, passwordLengthMessage, invalidEmailMessage, nonUniqueUsernameMsg, successSignupMessage, signupErrorMsg) =>{
    setMessage(null)

    if (password.length < 4){
        setMessage(passwordLengthMessage)
        return;
    }
    if (!validateEmail(email)){
        setMessage(invalidEmailMessage)
        return;
    }

    fetch(`${BASE_API_URL}/api/user/create`,{
        method: "post",
        body: JSON.stringify({username, password, email}),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })
        .then((res) =>{
            if(!res.ok){
                console.log("invalid signup, response code: ", res.status)
                setMessage(nonUniqueUsernameMsg)
                return;
            }
            return res.json()
        })
        .then((responseInfo) =>{
            if (responseInfo){
                console.log(responseInfo)
                setMessage(successSignupMessage(username))
                setPassword("")
            }
        })
        .catch((err) =>{
            console.log("error with signing up in: ", err)
            setMessage(signupErrorMsg)
        })
}

// get profile info of the current user logged in
export const getProfileInfo = (setUser) =>{
    fetch(`${BASE_API_URL}/api/user`)
        .then((res) =>{
            if(!res.ok){
                console.log("could not find user ", res.status)
                return;
            }
            return res.json()
        })
        .then((userInfo) =>{
            if (userInfo){
                console.log(userInfo)
                setUser(userInfo)
            }
        })
        .catch((err) =>{
            console.log("error with getting profile info: ", err)
        })
}

// get profile user of another user by id
export const getProfileInfoNotSignedIn = (userID, setUser, setFoundUser) =>{
    fetch(`${BASE_API_URL}/api/user/profile/${userID}`)
        .then((res) =>{
            if(!res.ok){
                console.log("could not find user ", res.status)
                return;
            }
            return res.json()
        })
        .then((userInfo) =>{
            if (userInfo){
                console.log(userInfo)
                setUser(userInfo)
                // set this state variable using the setFoundUser function but only if it is defined
                if (setFoundUser){
                    setFoundUser(true)
                }
            }
        })
        .catch((err) =>{
            console.log("error with getting profile info: ", err)
        })
}

// for editing the profile info of the user signed in
export const setProfileInfo = (name, email, username, password, bio, profileImage, courses) =>{
   
    const url = `${BASE_API_URL}/api/user/modify`;

    if (!validateEmail(email)){
        alert("Enter a valid email")
        return;
    } 
    if (password.length < 4){
        alert("Enter a valid password")
        return;
    }

    let updatedData = {
        name: name,
        email: email,
        username: username,
        password: password,
        bio: bio,
        profileImageIndex: profileImage,
        courses: courses
    }
    
    const request = new Request(url,{
        method: "put",
        body: JSON.stringify(updatedData),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        },
    });
    fetch(request)
       .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // If profile was updated successfully, tell the user.
                alert("Updated profile successfully")
                console.log("updated");
            } else {
                // If server couldn't update the profile, tell the user.
                alert("Could not update profile")
            }
        })
        .catch(error => {
            console.log(error);
        });
}

// get all reported users
export const getReportedUsers = (setUsers) => {

    fetch(`${BASE_API_URL}/api/user/report`)
        .then((res) =>{
            if(!res.ok){
                console.log("could not find reported users ", res.status)
                return;
            }
            return res.json()
        })
        .then((userList) =>{
            if (userList){
                console.log(userList)
                setUsers(userList)
            }
        })
        .catch((err) =>{
            console.log("error with getting reported user info: ", err)
        });
}   

// report a specific user
export const reportUser = (userID) => {

    const url = `${BASE_API_URL}/api/user/report`;
    
    const requestBody = {
        userID : userID
    }

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(requestBody),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                alert("Reported user successfully")
            } else {
                alert("Could not report user")
                console.log("Could not report user", res.status)
            }
        })
        .catch(error => {
            console.log("Could not report user, error:", error);
        });
}

// un-report a specific user
export const unreportUser = (userID) => {
    const url = `${BASE_API_URL}/api/user/unreport`;
    
    const requestBody = {
        userID : userID
    }

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(requestBody),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                alert("un-reported user successfully")
            } else {
                alert("Could not un-report user")
                console.log("Could not un-report user, status:", res.status)
            }
        })
        .catch(error => {
            console.log("Could not un-report user, error:", error);
        });
}

export const deleteUser = (userID) => {
    const url = `${BASE_API_URL}/api/user`;

    const requestBody = {
        userID: userID,
    }

    const request = new Request(url, {
        method: "delete",
        body: JSON.stringify(requestBody),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // If application deleted, tell the user.
                alert("Deleted user successfully")
            } else {
                // If server couldn't delete the application
                alert("Could not delete user")
            }
        })
        .catch(error => {
            console.log(error);
        });
}
