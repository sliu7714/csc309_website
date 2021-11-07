// here is where the hardcoded data would live
// write it here and imported where it needs to be used,
// keeping in mind how data would actually get passed when we have a backenduse

// for example: (user and posting objects will probably be more complicated later)


export const groups = [
    {
        id:0,
        members:[1]
    },
    {
        id:1
    },
    {
        id:2
    },
]
export const users = [
    {
        id: 0,
        username: "admin",
        password: "admin",  // change to more secure method later
        name: "Kimmy",
        bio: "Hi I'm Kimmy",
        email: "kimmyAdmin@mail.utoronto.ca",
        isAdmin: true,
        courses: [['CSC309', 'Monday'], ['CSC343', 'Tuesday'], ['CSC309', 'Wednesday']],
        postings: [0,1], // the posts that this user has made
        groups: [2], // postings that this user is a member of (not sure if want to overlap or not
        applying: [] // posting that this user is currently applying for (and has not gotten in)
    },
    {
        id: 1,
        username: "user",
        password: "user",
        name: "Timmy",
        bio: "Hi I'm Timmy",
        email: "timmyUser@mail.utoronto.ca",
        isAdmin: false,
        courses: [['CSC309', 'Monday']],
        postings: [2],
        groups: [0],
        applying: [1],
    },
]

export const postings = [
    {
        id: 0,
        creator: 1, // id of the user who created the post
        title: "CSC309 Study Session",
        desc: "this is about posting 0",
        tags: ["csc309"],
        members: [0, 1], // ids of the members of the post
        applicants: [], // ids if applicants to post
    },
    {
        id: 1,
        creator: 1,
        title: "CSC309 Meet Up",
        desc: "this is about posting 1",
        tags: ["art"],
        members: [1],
        applicants: [1],
    },
    {
        id: 2,
        creator: 1,
        title: "Posting 2",
        desc: "this is about posting 2",
        tags: ["csc369"],
        members: [0],
        applicants: [],
    },


]


export const tags = [
    {
        name: "csc309",
        category: "courses",
    },
    {
        name: "csc301",
        category: "courses",
    },
    {
        name: "csc369",
        category: "courses",
    },
    {
        name: "gym",
        category: "interests",
    },
    {
        name: "art",
        category: "interests",
    },
    {
        name: "movies",
        category: "interests",
    },

]