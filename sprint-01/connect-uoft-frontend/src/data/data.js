// here is where the hardcoded data would live
// write it here and imported where it needs to be used,
// keeping in mind how data would actually get passed when we have a backenduse

// for example: (user and posting objects will probably be more complicated later)
export const users = [
    {
        id: 0,
        username: "admin",
        password: "admin",  // change to more secure method later
        name: "Kimmy",
        email: "kimmyadmin@mail.utoronto.ca",
        bio: "Hi I'm Kimmy",
        courses: ["CSC309"],
        isAdmin: true,
        postings: [0,1], // the posts that this user has made
        groups: [2], // postings that this user is a member of (not sure if want to overlap or not
        applying: [] // posting that this user is currently applying for (and has not gotten in)
    },
    {
        id: 1,
        username: "user",
        password: "user",
        name: "Timmy",
        email: "timmyuser@mail.utoronto.ca",
        bio: "Hi I'm Timmy",
        courses: ["CSC309"],
        isAdmin: false,
        postings: [2],
        groups: [0],
        applying: [1],
    },
]

export const postings = [
    {
        id: 0,
        creator: 0, // id of the user who created the post
        title: "Posting 0",
        desc: "this is about posting 0",
        endDate: "2020-11-30",
        capacity: 3,
        tags: ["csc309"],
        members: [1], // ids of the members of the post
        applicants: [], // ids if applicants to post
    },
    {
        id: 1,
        creator: 0,
        title: "Posting 1",
        desc: "this is about posting 1",
        endDate: "2020-11-30",
        capacity: 2,
        tags: ["art"],
        members: [0],
        applicants: [1],
    },
    {
        id: 2,
        creator: 1,
        title: "Posting 2",
        desc: "this is about posting 2",
        endDate: "2020-11-30",
        capacity: 4,
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