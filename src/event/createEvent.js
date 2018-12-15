
const createEvent = (eventType, eventDescription) => {
  return {
    type: eventType,
    description: eventDescription,
    IS_EVENT: true,
  }
}


export default createEvent