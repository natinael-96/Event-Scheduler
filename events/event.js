import { v4 as uuid } from 'uuid';

const event = {
  summary: 'Hello',
  location: 'Google Meet',
  description: "Demo event",
  start: {
    dateTime: "2024-10-16T00:49:00+03:00",  
    timeZone: 'Africa/Addis_Ababa'
  },
  end: {
    dateTime: "2024-10-16T01:27:00+03:00",
    timeZone: 'Africa/Addis_Ababa'},
  colorId: 1,
  conferenceData: {
    createRequest: {
      requestId: uuid(),
    }
  },
  attendees: [{email: ''}
  ],
  reminders: {
    useDefault: false,  
    overrides: [
      { method: 'popup', minutes: 2 } 
    ]
  }
};

export default event;
