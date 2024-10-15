import { oauth2Client, SCOPES } from '../config/googleOAuth.js';
import { insertEvent } from '../services/googleCalendarService.js';

// auth and redirect
export const getAuthUrl = (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  res.redirect(url);
};

// OAuth redirect and token 
export const handleOAuthRedirect = async (req, res, next) => {
  try {
    const { tokens } = await oauth2Client.getToken(req.query.code);
    oauth2Client.setCredentials(tokens);
    res.send('Authentication successful! Please return to the console.');
  } catch (err) {
    next(err);
  }
};

// event creating
export const createEvent = async (req, res, next) => {
  try {
    const result = await insertEvent();
    res.send({
      status: 200,
      message: 'Event created',
      link: result.data.hangoutLink
    });
  } catch (err) {
    next(err);
  }
};
