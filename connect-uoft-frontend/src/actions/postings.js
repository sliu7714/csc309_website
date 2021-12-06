// environment configutations
import ENV from './../config.js'
import {postings} from "../data/data";
const BASE_API_URL = ENV.apiBaseUrl


export const getPostings = (setPosting) => {
    const url = `${BASE_API_URL}/api/postings`;

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
            if(json){
                setPosting(postings);
            }
        })
        .catch(error => {
            console.log(error);
        });
};


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
            console.log('created post')
        })
        .catch(error => {
            console.log("error creating post:", error);
        });
};
              
export const deletePosting = (postID) => { //DONE
    // the URL for the request
    const url = `${BASE_API_URL}/api/postings`;

    // The data we are going to send in our request
    const requestBody = {
        posting_id : postID
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
};           

export const applyPost = (postID, applicantInfo) => { //DONE
    // the URL for the request
    const url = `${BASE_API_URL}/api/postings`;

    const requestBody = {
        posting_id : postID,
        applicant : applicantInfo
    }

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "patch",
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
};

export const reportPost = (postID) => { // DONE
    // the URL for the request
    const url = `${BASE_API_URL}/api/postings/report`;

    const requestBody = {
        posting_id : postID
    }

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "patch",
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
};


export const getReportedPost = (setPosting) => { //DONE
    // the URL for the request
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
};

export const updateApplicantPost = (requestBody, setPosting) => {
    // the URL for the request
    const url = `${BASE_API_URL}/api/postings/applicant`;

    if (datum.newStatus == true) {}

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
};

export const getUserPosts = () => { //Creator DONE

    const url = `${BASE_API_URL}/api/postings/user`;

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
            console.log(error);
        });
};

export const getPostID = (postID, setPosting) => { //DONE

    const url = `${BASE_API_URL}/api/postings/post`;

    const requestBody = {
        posting_id: postID
    }

    const request = new Request(url, {
        method: "get",
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
            console.log(error);
        });
};

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
            console.log(error);
        });
};
