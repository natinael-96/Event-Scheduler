import { oauth2Client, SCOPES } from '../config/googleOAuth.js';
import { insertEvent } from '../services/googleCalendarService.js';
import { checkAuth } from '../middleware/checkAuth.js';

// auth and redirect
export const getAuthUrl = (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent'
  });
  res.redirect(url);
};

// OAuth redirect and token
export const handleOAuthRedirect = async (req, res, next) => {
  try {
    const { tokens } = await oauth2Client.getToken(req.query.code);
    oauth2Client.setCredentials(tokens);

    res.cookie('access_token', tokens.access_token, {
      httpOnly: true,
      secure: true,
      maxAge: tokens.expiry_date - Date.now()
    });

    if (tokens.refresh_token) {
      res.cookie('refresh_token', tokens.refresh_token, {
        httpOnly: true,
        secure: true
      });
    }

    res.send('Authentication successful! Please return to the console.');
  } catch (err) {
    next(err);
  }
};

// event with authentication middleware
export const createEvent = [
  checkAuth,
  async (req, res, next) => {
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
  }
];
