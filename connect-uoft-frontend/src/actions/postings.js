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
                alert("Sorry there was a problem getting your postings")
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
                alert("Sorry there was a problem getting the groups that you are a member of")
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

export const commentPost = (content, postID) => {
    const url = `${BASE_API_URL}/api/postings/comment`;

    const commentInfo = {
        content: content,
        postingID: postID
    }

    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(commentInfo),
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
            // created post
            console.log('comment created')
        })
        .catch(error => {
            console.log("error commenting on post:", error);
        });
}

export const updatePost = (postingInfo, postID) => {
    const url = `${BASE_API_URL}/api/postings`;

    const postInfo = {
        posting: postingInfo,
        postingID: postID
    }

    const request = new Request(url, {
        method: "put",
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
            console.log('created post')
        })
        .catch(error => {
            console.log("error creating post:", error);
        });
}
              
// deletes the post given by postID
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

export const getReportedPost = (setPosting) => { //DONE
    const url = `${BASE_API_URL}/api/postings/report`;

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get postings");
            }   
        })
        .then(json => {
            // the resolved promise with the JSON body
            setPosting({ postings: json.postings });
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

// a patch to reject an applicant
export const rejectApplicantPost = (applicantID, postID) =>{
    // the URL for the request
    const url = `${BASE_API_URL}/api/postings/reject`;

    const requestBody = {
        applicantID: applicantID,
        postingID: postID
    }

    const request = new Request(url, {
        method: "patch",
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

export const getMemberPosts = (setPosting) => { //DONE

    const url = `${BASE_API_URL}/api/postings/member`;

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Failed");
            }   
        })
        .then(json => {
            // the resolved promise with the JSON body
            setPosting({ postings: json.postings });
        })
        .catch(error => {
            console.log("error with getting post :", error);

        });
}
