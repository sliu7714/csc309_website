// environment configurations
import ENV from './../config.js'
const BASE_API_URL = ENV.apiBaseUrl

// search posts by tags
export const SearchPostings = (tags, setPostings) =>{
    const url = `${BASE_API_URL}/api/postings/search`;

    const requestBody = {
        tags: tags,
    }

    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(requestBody),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
        .then(res => {
            if(!res.ok){
                console.log("Could not search postings, status code:", res.status)
                return;
            }
            return res.json();
        })
        .then(postingList => {
            if(postingList){
                setPostings(postingList);
            }
        })
        .catch(error => {
            console.log("error with getting search results :",error);
        });
}

// return the posts that the current logged in user has created
// assumes there is a current user logged in
export const getUserCreatedPostings = (setPostings) =>{
    const url = `${BASE_API_URL}/api/postings/created`;

    fetch(url)
        .then(res => {
            if(!res.ok){
                console.log("Could not get postings, status code:", res.status)
                // alert("Sorry there was a problem getting your postings")
                return;
            }
            return res.json();
        })
        .then(postingList => {
            if(postingList){
                setPostings(postingList);
            }
        })
        .catch(error => {
            console.log("error with getting user posts:",error);
        });
}

// return the posts that the current logged in user is a member of (not created)
// assumes there is a current user logged in
export const getUserMemberPostings = (setPostings) =>{
    const url = `${BASE_API_URL}/api/postings/member`;

    fetch(url)
        .then(res => {
            if(!res.ok){
                console.log("Could not get postings, status code:", res.status)
                // alert("Sorry there was a problem getting the groups that you are a member of")
                return;
            }
            return res.json();
        })
        .then(postingList => {
            if(postingList){
                setPostings(postingList);
            }
        })
        .catch(error => {
            console.log("error with getting user member posts:", error);
        });
}

// create a posting
export const addPosting = (postingInfo) => {
    const url = `${BASE_API_URL}/api/postings`;

    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(postingInfo),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
        .then(function (res) {
            if(!res.ok){
                console.log("Could not create posting, status code:", res.status)
                alert("Sorry there was a problem creating this post")
                return;
            }
            // created post
            console.log('Created post')
        })
        .catch(error => {
            console.log("error creating post:", error);
        });
}


// leave a comment on a posting
export const commentPost = (content, postID) => {

    const url = `${BASE_API_URL}/api/postings/comment`;

    const requestBody = {
        content: content,
        postingID: postID
    }

    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(requestBody),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
        .then(function (res) {
            if(!res.ok){
                console.log("Could not create comment, status code:", res.status)
                alert("Sorry there was problem a commenting on this post")
                return;
            }
            // created comment
            console.log('comment created')
        })
        .catch(error => {
            console.log("error commenting on post:", error);
        });
}


// update a specific post with postingInfo
export const updatePost = (postingInfo, postID) => {
    const url = `${BASE_API_URL}/api/postings`;

    const postInfo = {
        posting: postingInfo,
        postingID: postID
    }

    const request = new Request(url, {
        method: "put",
        body: JSON.stringify(postInfo),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
        .then(function (res) {
            if(!res.ok){
                console.log("Could not edit posting, status code:", res.status)
                alert("Sorry there was a problem editing this post")
                return;
            }
            // updated post
            console.log('updated post')
        })
        .catch(error => {
            console.log("error editing post:", error);
        });
}
              
// deletes the posting given by postID
export const deletePost = (postID) => {
    // the URL for the request
    const url = `${BASE_API_URL}/api/postings`;

    // The data we are going to send in our request
    const requestBody = {
        postingID : postID
    }

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "delete",
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
                // If student was added successfully, tell the user.
                alert("Deleted posting successfully")
            } else {
                // If server couldn't add the student, tell the user.
                alert("Could not delete posting")
            }
        })
        .catch(error => {
            console.log(error);
        });
}        

// apply to a posting
export const applyPost = (postID, message) => { //DONE
    const url = `${BASE_API_URL}/api/postings/apply`;

    const requestBody = {
        postingID : postID,
        message : message
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
                // If student was added successfully, tell the user.
                alert("Applied to posting successfully")
            } else {
                // If server couldn't add the student, tell the user.
                alert("Could not apply to posting")
            }
        })
        .catch(error => {
            console.log(error);
        });
}

// report specific posting
export const reportPost = (postID) => { // DONE
    const url = `${BASE_API_URL}/api/postings/report`;

    const requestBody = {
        postingID : postID
    }

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "put",
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
                // If student was added successfully, tell the user.
                alert("Reported posting successfully")
            } else {
                // If server couldn't add the student, tell the user.
                alert("Could not report posting")
                console.log("Could not report posting, status code:", res.status)
            }
        })
        .catch(error => {
            console.log(error);
        });
}

// return all reported postings
export const getReportedPost = (setPosting) => { //DONE
    const url = `${BASE_API_URL}/api/postings/report`;

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                // alert("Could not get reported postings");
            }   
        })
        .then(postingsList => {
            // the resolved promise with the JSON body
            if(postingsList){
                setPosting(postingsList);
            }
        })
        .catch(error => {
            console.log(error);
        });
}

// a put to accept an applicant
export const acceptApplicantPost = (applicantID, postID) =>{
    // the URL for the request
    const url = `${BASE_API_URL}/api/postings/accept`;

    const requestBody = {
        applicantID: applicantID,
        postingID: postID
    }

    const request = new Request(url, {
        method: "put",
        body: JSON.stringify(requestBody),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                alert("Updated applicant")
            } else {
                alert("Failed");
            }   
        })
        .catch(error => {
            console.log(error);
        });
}

// a put to reject an applicant
export const rejectApplicantPost = (applicantID, postID) =>{
    // the URL for the request
    const url = `${BASE_API_URL}/api/postings/reject`;

    const requestBody = {
        applicantID: applicantID,
        postingID: postID
    }

    const request = new Request(url, {
        method: "put",
        body: JSON.stringify(requestBody),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                alert("Updated applicant")
            } else {
                alert("Failed");
            }   
        })
        .catch(error => {
            console.log(error);
        });
}

// get a single specific post from postID
export const getPostByID = (postID, setPosting, setFoundPost) => {
    const url = `${BASE_API_URL}/api/postings/get-by-id/${postID}`;

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                console.log("Failed to get post ", postID, " response code: ", res.status)
                return;
            }   
        })
        .then(posting => {
            // the resolved promise with the JSON body
            if(posting){
                setPosting(posting);
                setFoundPost(true)
            }

        })
        .catch(error => {
            console.log("error with getting post :", error);
        });
}

// use the one 'getUserMemberPostings' above
// export const getMemberPosts = (setPosting) => { //DONE
//
//     const url = `${BASE_API_URL}/api/postings/member`;
//
//     fetch(url)
//         .then(res => {
//             if (res.status === 200) {
//                 // return a promise that resolves with the JSON body
//                 return res.json();
//             } else {
//                 alert("Failed");
//             }
//         })
//         .then(json => {
//             // the resolved promise with the JSON body
//             setPosting({ postings: json.postings });
//         })
//         .catch(error => {
//             console.log("error with getting post :", error);
//
//         });
// }

export const getPendingPosts = (setPosting) => { 
    // the URL for the request
    const url = `${BASE_API_URL}/api/postings/pending`;

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                console.log("Could not get pending postings, status:", res.status);
            }   
        })
        .then(posting => {
            // the resolved promise with the JSON body
            if(posting){
                setPosting(posting);
            }
        })
        .catch(error => {
            console.log("Could not get pending postings, error:",error);
        });
}

export const getDeniedPosts = (setPosting) => { 
    // the URL for the request
    const url = `${BASE_API_URL}/api/postings/denied`;

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                console.log("Could not get denied postings, status:", res.status);
            }   
        })
        .then(posting => {
            // the resolved promise with the JSON body
            if(posting){
                setPosting(posting);
            }
        })
        .catch(error => {
            console.log("Could not get denied postings, error:",error);

        });
}

export const unreportPost = (postID) =>{
    // the URL for the request
    const url = `${BASE_API_URL}/api/postings/unreport`;

    const requestBody = {
        postingID: postID
    }

    const request = new Request(url, {
        method: "put",
        body: JSON.stringify(requestBody),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                alert("Unreported post")
            } else {
                alert("Failed");
            }   
        })
        .catch(error => {
            console.log(error);
        });
}

export const deleteApplication = (postID, applicationID) => {
    const url = `${BASE_API_URL}/api/postings/apply`;

    const requestBody = {
        postingID: postID,
        applicationID: applicationID
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
                alert("Deleted application successfully")
            } else {
                // If server couldn't delete the application
                alert("Could not delete application")
            }
        })
        .catch(error => {
            console.log(error);
        });

}