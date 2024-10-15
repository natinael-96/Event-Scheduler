import express from 'express';
import { getAuthUrl, handleOAuthRedirect, createEvent } from '../controllers/calendarController.js';

const router = express.Router();

// OAuth
router.get('/auth', getAuthUrl);
router.get('/auth/redirect', handleOAuthRedirect);

// event
router.get('/create-event', createEvent);

export default router;
