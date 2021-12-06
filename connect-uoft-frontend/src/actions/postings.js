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

export const reportPost = (postID) => {
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
            if(!res.ok){
                console.log("Could not report posting, status code:", res.status)
                alert("Could not report posting")
                return;
            }
            // reported post
            alert("Reported Post")
            console.log('reported post, id:', postID)
        })
        .catch(error => {
            console.log(error);
        });
};

export const applyPost = (postID, applicantInfo) => {
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
                alert("Added posting successfully")
            } else {
                // If server couldn't add the student, tell the user.
                alert("Could not add posting")
            }
        })
        .catch(error => {
            console.log(error);
        });
};


export const getReportedPost = (setPosting) => {
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

    const request = new Request(url, {
        method: "patch",
        body: JSON.stringify(requestBody),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

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

export const getUserPosts = (userID) => {


}