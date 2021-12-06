// environment configutations
import ENV from './../config.js'
const API_HOST = ENV.api_host

export const getPostings = (setPosting, filter=[]) => { //DONE
    // the URL for the request
    const url = `${API_HOST}/api/postings`;

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

export const addPosting = (createPost) => { //DONE
    // the URL for the request
    const url = `${API_HOST}/api/postings`;

    // The data we are going to send in our request

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(createPost),
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

export const deletePosting = (postID) => { //DONE
    // the URL for the request
    const url = `${API_HOST}/api/postings`;

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
    const url = `${API_HOST}/api/postings`;

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
    const url = `${API_HOST}/api/postings/report`;

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
            }
        })
        .catch(error => {
            console.log(error);
        });
};


export const getReportedPost = (setPosting) => { //DONE
    // the URL for the request
    const url = `${API_HOST}/api/postings/report`;

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

export const updateApplicantPost = (datum) => {
    // the URL for the request
    const url = `${API_HOST}/api/postings/applicant`;

    if (datum.newStatus == true) {}

    const request = new Request(url, {
        method: "patch",
        body: JSON.stringify(datum),
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

    const url = `${API_HOST}/api/postings/user`;

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

    const url = `${API_HOST}/api/postings/post`;

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

    const url = `${API_HOST}/api/postings/member`;

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
