// here is where the hardcoded data would live
// write it here and imported where it needs to be used,
// keeping in mind how data would actually get passed when we have a backenduse

// for example: (user and posting objects will probably be more complicated later)
import {ACCEPTED_APPLICATION, PENDING_APPLICATION, REJECTED_APPLICATION} from "./constants";

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
        image: '/images/Timmy_Turner1.png'
    },
]

export const postings = [
    {
        id: 0,
        component: "posting",
        creator: 0, // PLACEHOLDER SO OLD CODE DOES NOT BREAK
        // post object would probably only store id of the creator and the backend code will return the creator info from another query?
        creatorInfo: {
            id: 0,
            name: "Kimmy"
        },
        title: "Work on practice problems",
        desc: "please change code to use posting.description instead of posting.desc",
        description: "we can work together on the practice problems for unit 2 to get ready for the final",
        endDate: "2020-11-30",
        capacity: 3,
        tags: ["csc309", "study"],
        members: [1], // ids of the members of the post
        membersInfo:[
            {
                id: 1,
                name: "Timmy"
            },
        ],
        applicants: [1], // ids if applicants to post
        applicantsInfo: [
            {
                id: 1,
                name: 'Timmy',
                applicationMsg: "Hi I would like to join",
                applicationStatus: ACCEPTED_APPLICATION,
            }
        ],
        comments: [
            {
                id: 30,
                creator: {
                    id: 0,
                    name: "Kimmy"
                },
                content: "Heads up, I think there is a typo in problem 4!",
                // NOTE, datetime objects cannot be sent as a json string, must be converted to string representation
                timestamp: Date('2020-11-12').toString()
            },
        ],
    },
    {
        id: 1,
        component: "posting",
        creator: 0, // PLACEHOLDER
        creatorInfo: {
            id: 0,
            name: "Kimmy"
        },
        title: "Draw in the park",
        desc: "please change code to use posting.description instead of posting.desc",
        description: "Lets do some sketching in the park",
        endDate: "2020-11-30",
        capacity: 3,
        tags: ["art"],
        members: [],
        membersInfo:[],
        applicants: [1],
        applicantsInfo: [
            {
                id: 1,
                name: 'Timmy',
                applicationMsg: "Hi I would like to join",
                applicationStatus: PENDING_APPLICATION,
            }

        ],
    },
    {
        id: 2,
        component: "posting",
        creator: 1, // PLACEHOLDER
        creatorInfo: {
            id: 1,
            name: "Timmy"
        },
        title: "Study for Test 2",
        description: "We can meet up in the library or online to review practice problems and lab solutions to study for the test ",
        // comments will be subdocument:
        comments: [
            {
                id: 0,
                creator: {
                    id: 0,
                    name: "Kimmy"
                },
                content: "The instructor just posted the rooms! We are taking the test in EX200",
                // NOTE, datetime objects cannot be sent as a json string, must be converted to string representation
                timestamp: Date('2020-11-12').toString()
            },
            {
                id: 1,
                creator: {
                    id: 1,
                    name: "Timmy"
                },
                content: 'We can chat here <discord.invite.link>',
                // NOTE, datetime objects cannot be sent as a json string, must be converted to string representation
                timestamp: Date('2020-11-12T015:00').to
            }
        ],

        endDate: "2020-11-30",
        capacity: 4,
        tags: ["csc369", "study"],
        members: [],
        membersInfo:[],
        applicantsInfo: [
            {
                id: 3,
                name: 'Jimmy',
                applicationMsg: "Hi I'm in LEC0101 and would love to join the study sessions",
                applicationStatus: REJECTED_APPLICATION,
            }

        ],
    },

]

