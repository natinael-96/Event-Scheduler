import { google } from 'googleapis';
import { oauth2Client } from '../config/googleOAuth.js';
import event from '../events/event.js';

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

// send event
export const insertEvent = async () => {
  return await calendar.events.insert({
    calendarId: 'primary',
    auth: oauth2Client,
    conferenceDataVersion: 1,
    sendUpdates: 'all',
    resource: event
  });
};
