let docClient = require("./aws_dynamo_conn");
const { AccessPattern, ServerEnum } = require("./EnumData");
const util = require('./util.js');

async function setEvent(requestBody) {
    try {
        const { eventId, createdTime,
            eventName, movieName, 
            eventTime, eventDuration, eventPrice, venueList } = requestBody

        // Updating event if eventId available
        if (eventId != null || eventId != undefined) {
            var params = {
                TableName: 'movie',
                Item: {
                    id: eventId,
                    createdTime: createdTime,
                    dataType: AccessPattern.EventBooking,
                    eventName: eventName,
                    movieName: movieName,
                    eventTime: eventTime,
                    eventDuration: eventDuration,
                    eventPrice: eventPrice,
                    theaterName: venueList[0].identifierTitle,
                    venue: venueList[0]
                }
            };

            await docClient.put(params).promise();
            return {
                eventDetails: {
                    eventId,
                    eventName
                },
                status: true,
                responseMessage: ServerEnum.RESPONSE_SUCCESS,
            }
        }

        // Checking if any conflict happens with the theater timing with previous event times
        for (let singleVenue of venueList) {
            let eventStartTime = Date.parse(eventTime)
            let eventEndTime = eventStartTime + (eventDuration * 60 * 1000)

            const theaterName = singleVenue.identifierTitle

            var params = {
                TableName: "movie",
                FilterExpression: '#theaterName = :theaterName AND #dataType = :dataType',
                ExpressionAttributeNames: {
                    '#theaterName': 'theaterName',
                    '#dataType': 'dataType',
                },
                ExpressionAttributeValues: {
                    ':theaterName': theaterName,
                    ':dataType': AccessPattern.EventBooking
                },
            };
            const prevEventResponse = await docClient.scan(params).promise();
            const prevEventList = prevEventResponse.Items

            for (let prevEvent of prevEventList) {
                const prevEventStartTime = Date.parse(prevEvent.eventTime)
                const prevEventEndTime = prevEventStartTime + (prevEvent.eventDuration * 60 * 1000)

                if ((prevEventStartTime >= eventStartTime && prevEventStartTime <= eventEndTime)
                    || (prevEventEndTime >= eventStartTime && prevEventEndTime <= eventEndTime)) {
                    return {
                        status: false,
                        responseMessage: `${prevEvent.venue.title} is already booked for this time`
                    }
                }
            }
        }

        // Now inserting the event
        for (let singleVenue of venueList) {

            const newEventId = await util.createBigId('EVENT')

            var params = {
                TableName: 'movie',
                Item: {
                    id: newEventId,
                    createdTime: util.currentDate(),
                    dataType: AccessPattern.EventBooking,
                    eventName: eventName,
                    movieName: movieName,
                    eventTime: eventTime,
                    eventDuration: eventDuration,
                    eventPrice: eventPrice,
                    theaterName: singleVenue.identifierTitle,
                    venue: singleVenue
                }
            };

            await docClient.put(params).promise();
        }

        return {
            status: true,
            responseMessage: ServerEnum.RESPONSE_SUCCESS,
        }
    } catch (error) {
        console.log(error.name + ":" + error.message);
        console.log("File/Method: event/setEvent()");
        return {
            status: false,
            responseMessage: ServerEnum.RESPONSE_CONNECTION_ERROR,
        }
    }
}

async function getEventList() {
    var params = {
        TableName: "movie",
        FilterExpression: '#dataType = :dataType',
        ExpressionAttributeNames: {
            '#dataType': 'dataType',
        },
        ExpressionAttributeValues: {
            ':dataType': AccessPattern.EventBooking,
        },
    };

    try {
        const eventFetch = await docClient.scan(params).promise();
        const eventList = eventFetch.Items;

        return {
            eventList,
            status: true,
            responseMessage: ServerEnum.RESPONSE_SUCCESS
        }
    } catch (error) {
        console.log(error.name + ":" + error.message);
        console.log("File/Method: event/getEvent()");
        return {
            status: false,
            responseMessage: ServerEnum.RESPONSE_CONNECTION_ERROR
        }
    }
}

async function deleteEvent(requestBody) {
    const { eventId, createdTime } = requestBody

    var params = {
        TableName: "movie",
        Key: {
            id: eventId,
            createdTime: createdTime
        }
    };

    try {
        await docClient.delete(params).promise();
        return {
            status: true,
            responseMessage: ServerEnum.RESPONSE_SUCCESS
        }
    } catch (error) {
        console.log(error.name + ":" + error.message);
        console.log("File/Method: event/deleteEvent()");
        return {
            status: false,
            responseMessage: ServerEnum.RESPONSE_CONNECTION_ERROR
        }
    }
}

async function getTheaterList() {
    var params = {
        TableName: "movie",
        FilterExpression: '#dataType = :dataType',
        ExpressionAttributeNames: {
            '#dataType': 'dataType',
        },
        ExpressionAttributeValues: {
            ':dataType': AccessPattern.MovieTheater,
        },
    };

    try {
        const theaterFetch = await docClient.scan(params).promise();
        const theaterList = theaterFetch.Items;

        return {
            eventList: theaterList,
            status: true,
            responseMessage: ServerEnum.RESPONSE_SUCCESS
        }
    } catch (error) {
        console.log(error.name + ":" + error.message);
        console.log("File/Method: event/getTheaterList()");
        return {
            status: false,
            responseMessage: ServerEnum.RESPONSE_CONNECTION_ERROR
        }
    }
}


module.exports = { setEvent, getEventList, deleteEvent, getTheaterList };
