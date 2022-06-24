let docClient = require("./aws_dynamo_conn");
const { AccessPattern, ServerEnum } = require("./EnumData");
const util = require('./util.js');


async function checkSeatBooking(requestBody) {
    var params = {
        TableName: "movie",
        FilterExpression: '#id = :id',
        ExpressionAttributeNames: {
            '#id': 'id',
        },
        ExpressionAttributeValues: {
            ':id': requestBody.eventId,
        },
    };

    const exceptionList = {
    }

    try {
        const eventFetch = await docClient.scan(params).promise();
        const event = eventFetch.Items[0];

        const seatPlan = event.venue.seats
        const totalAvailableSeat = calculateAvailableSeats(seatPlan)

        let bookedSeat = requestBody.bookedSeat

        // We will insert all the seats with their Row Number
        let seatPlanByRow = {}

        for (let singleSeat of bookedSeat) {
            if (singleSeat.rowKey in seatPlanByRow) {
                const seatList = seatPlanByRow[singleSeat.rowKey]
                seatList.push(singleSeat.actualIndex)
                seatPlanByRow[singleSeat.rowKey] = seatList
            } else {
                seatPlanByRow[singleSeat.rowKey] = [singleSeat.actualIndex]
            }
        }

        for (let row of Object.keys(seatPlanByRow)) {
            const bookedSeatList = seatPlanByRow[row]

            // Flipping the booked slot into zero into the main seat plan
            for (let seat of bookedSeatList) {
                // Checking if it is being booked by other in the mean time in the main seat Plan
                if (seatPlan[row][seat] === 0)
                    return seatAlreadyBookedMessage({ rowKey: row, index: seat })
                seatPlan[row][seat] = 0
            }

            // If Available seat is greater than 10, then we check for sparse seat
            if (totalAvailableSeat > 10) {
                // Checking if any sparse seat remaining in the main seat Plan
                // Traversing full seat plan again
                for (let j = 0; j < seatPlan[row].length; j++) {
                    const occurences = occurrencesOf(3, seatPlan[row].slice(0, j))

                    if (seatPlan[row][j] === 1 && seatPlan[row][j - 1] === 3 && seatPlan[row][j + 1] === 3) {
                        continue
                    }
                    if (seatPlan[row][j] === 1 && seatPlan[row][j - 1] === 3 && seatPlan[row][j + 1] === 0) {
                        return sendSeatSparseErrorMessage({ rowKey: row, index: (j - occurences) })
                    }
                    if (seatPlan[row][j] === 1 && seatPlan[row][j - 1] === 0 && seatPlan[row][j + 1] === 3) {
                        return sendSeatSparseErrorMessage({ rowKey: row, index: (j - occurences) })
                    }
                    if (j === 0 && seatPlan[row][j] === 1 && seatPlan[row][j + 1] === 0) {
                        return sendSeatSparseErrorMessage({ rowKey: row, index: (j - occurences) })
                    }
                    else if (j === (seatPlan[row].length - 1) && seatPlan[row][j] === 1 && seatPlan[row][j - 1] === 0) {
                        return sendSeatSparseErrorMessage({ rowKey: row, index: (j - occurences) })
                    }
                    else if (
                        seatPlan[row][j] === 1 &&
                        (seatPlan[row][j - 1] === 0) &&
                        (seatPlan[row][j + 1] === 0)) {
                        return sendSeatSparseErrorMessage({ rowKey: row, index: (j - occurences) })
                    }
                }
            }

        }

        return {
            status: true,
            responseMessage: ServerEnum.RESPONSE_SUCCESS
        }
    } catch (error) {
        console.log(error.name + ":" + error.message);
        console.log("File/Method: booking/checkSeatBooking()");
        return {
            status: false,
            responseMessage: ServerEnum.RESPONSE_CONNECTION_ERROR
        }
    }
}

async function setBooking(requestBody) {
    try {
        const { bookingId, createdTime, eventId, totalCost, customerId, customerName,
            seatList, snacksList, bookingStatus } = requestBody

        // Updaing seat Plan centrally, basically making those available again
        var params = {
            TableName: "movie",
            FilterExpression: '#id = :id',
            ExpressionAttributeNames: {
                '#id': 'id',
            },
            ExpressionAttributeValues: {
                ':id': eventId,
            },
        };

        const eventFetch = await docClient.scan(params).promise();
        const event = eventFetch.Items[0];
        const seats = event.venue.seats

        // Updating booking if bookingId available, basically to Cancelling Booking
        if (bookingId != null || bookingId != undefined) {
            for (let singleSeat of seatList) {
                seats[singleSeat.rowKey][singleSeat.index] = 1
            }

            let venue = {
                ...event.venue,
                seats: seats
            }
            // Updaing event
            if (bookingStatus === 'CANCELLED') {
                var params = {
                    TableName: 'movie',
                    Item: {
                        id: eventId,
                        createdTime: createdTime,
                        dataType: AccessPattern.EventBooking,
                        eventName: event.eventName,
                        movieName: event.movieName,
                        eventTime: event.eventTime,
                        eventDuration: event.eventDuration,
                        eventPrice: event.eventPrice,
                        theaterName: event.venue.identifierTitle,
                        venue: venue
                    }
                };

                await docClient.put(params).promise();
            }


            // Updating the booking
            var params = {
                TableName: 'movie',
                Item: {
                    id: bookingId,
                    createdTime: createdTime,
                    dataType: AccessPattern.TicketBooking,
                    eventId: eventId,
                    bookingStatus: bookingStatus,
                    movieName: event.movieName,
                    eventTime: event.eventTime,
                    eventDuration: event.eventDuration,
                    seatList: seatList,
                    snacksList: snacksList,
                    totalCost: totalCost,
                    eventPrice: event.eventPrice,
                    customerId: customerId,
                    customerName: customerName,
                    venue: venue,
                }
            };
            await docClient.put(params).promise();

            return {
                status: true,
                responseMessage: ServerEnum.RESPONSE_SUCCESS,
                bookingId: bookingId,
            }
        }

        // -----------------------------------------------------------
        // Inserting Booking

        // Updating Event, mainly seat plan, converting seat from 1->0 for the event
        for (let singleSeat of seatList) {
            seats[singleSeat.rowKey][singleSeat.index] = 0
        }

        let venue = {
            ...event.venue,
            seats: seats
        }
        var params = {
            TableName: 'movie',
            Item: {
                id: eventId,
                createdTime: createdTime,
                dataType: AccessPattern.EventBooking,
                eventName: event.eventName,
                movieName: event.movieName,
                eventTime: event.eventTime,
                eventDuration: event.eventDuration,
                eventPrice: event.eventPrice,
                theaterName: event.venue.identifierTitle,
                venue: venue
            }
        };
        await docClient.put(params).promise();


        // Inserting new booking for the customer
        const bookingNewId = await util.createBigId('BOOKING')

        var params = {
            TableName: 'movie',
            Item: {
                id: bookingNewId,
                createdTime: createdTime ? createdTime : Date.now(),
                dataType: AccessPattern.TicketBooking,
                bookingStatus: bookingStatus,
                movieName: event.movieName,
                eventTime: event.eventTime,
                eventId: eventId,
                eventDuration: event.eventDuration,
                seatList: seatList,
                snacksList: snacksList,
                totalCost: totalCost,
                eventPrice: event.eventPrice,
                customerId: customerId,
                customerName: customerName,
                venue: venue
            }
        };
        await docClient.put(params).promise();

        return {
            bookingId: bookingNewId,
            status: true,
            responseMessage: ServerEnum.RESPONSE_SUCCESS,
        }

    } catch (error) {
        console.log(error.name + ":" + error.message);
        console.log("File/Method: event/setBooking()");
        return {
            status: false,
            responseMessage: ServerEnum.RESPONSE_CONNECTION_ERROR,
        }
    }
}

async function getBookingList() {
    var params = {
        TableName: "movie",
        FilterExpression: '#dataType = :dataType',
        ExpressionAttributeNames: {
            '#dataType': 'dataType',
        },
        ExpressionAttributeValues: {
            ':dataType': AccessPattern.TicketBooking,
        },
    };

    try {
        const bookingFetch = await docClient.scan(params).promise();
        const bookingList = bookingFetch.Items;

        return {
            bookingList: bookingList,
            status: true,
            responseMessage: ServerEnum.RESPONSE_SUCCESS
        }
    } catch (error) {
        console.log(error.name + ":" + error.message);
        console.log("File/Method: event/getBookingList()");
        return {
            status: false,
            responseMessage: ServerEnum.RESPONSE_CONNECTION_ERROR
        }
    }
}


function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}



function sendSeatSparseErrorMessage(singleSeat) {
    return {
        status: false,
        responseMessage: `Sparse seat not allowed Row: ${singleSeat.rowKey}, Seat: ${parseInt(singleSeat.index) + 1}`
    }
}

function seatAlreadyBookedMessage(singleSeat) {
    return {
        status: false,
        responseMessage: `Seat is already booked Row: ${singleSeat.rowKey}, Seat:${parseInt(singleSeat.index) + 1}`
    }
}

function calculateAvailableSeats(seatPlan) {
    let totalAvailableSeat = 0
    for (let [row, seatList] of Object.entries(seatPlan)) {
        for (let seat of seatList) {
            if (seat === 1) totalAvailableSeat = totalAvailableSeat + 1
        }
    }
    return totalAvailableSeat
}

const occurrencesOf = (number, numbers) =>
    numbers.reduce(
        (counter, currentNumber) =>
            number === currentNumber ? counter + 1 : counter,
        0
    );


module.exports = { checkSeatBooking, setBooking, getBookingList };
