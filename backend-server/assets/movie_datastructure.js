// This is the basic data structure of Movie Theater
// 0 means already booked
// 1 means open to booked
module.exports = {
    movieTheaterData: {
        theater1: {
            id: "0",
            title: "The Supermax",
            identifierTitle: "theatre1",
            location: "Ealing Broadway",
            totalSeats: 40,
            seats: {
                A: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                B: [0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0],
                C: [0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
                D: [0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
                E: [1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
                F: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                G: [0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
                H: [0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
                J: [0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0],
                K: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                L: [0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1],
                M: [0, 0, 0, 1, 1, 1, 0, 0, 0],
            }
        },
        theater2: {
            id: "1",
            title: "Regent Feature Cinema",
            identifierTitle: "theatre2",
            location: "Regent Street",
            totalSeats: 65,
            seats: {
                A: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                B: [0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1],
                C: [0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0],
                D: [0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
                E: [1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
                F: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                G: [0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
                H: [0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
            },
        },
        theater3: {
            id: "2",
            title: "Ultimate 3D",
            identifierTitle: "theatre3",
            location: "Shepherd's Bush",
            totalSeats: 80,
            seats: {
                A: [0, 0, 0, 0, 0, 0, 0],
                B: [0, 0, 0, 1, 1, 1, 0, 0],
                C: [0, 1, 1, 1, 0, 0, 0, 1, 1],
                D: [0, 0, 1, 1, 0, 0, 0, 0],
                E: [1, 1, 0, 0, 0, 0, 1, 1, 0],
                F: [0, 0, 0, 0, 0, 0, 0, 0],
                G: [0, 1, 1, 1, 0, 0],
                H: [0, 0, 1, 1],
            },
        }
    },
    adminData: {
        user1: {
            id: "0",
            firstName: 'Jack',
            lastName: 'Crossman',
            email: 'adminM@movie.com',
            password: '123123',
            userType: 'Manager'
        },
        user2: {
            id: "1",
            firstName: 'David',
            lastName: 'Paul',
            email: 'adminS@movie.com',
            password: '123123',
            userType: 'Staff'
        }
    }
};
