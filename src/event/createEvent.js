const createEvent = (eventType, eventDescription) => {
  return {
    type: eventType,
    description: eventDescription,
    __IS_EVENT: true,
  }
}

export default createEvent
