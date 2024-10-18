import cookieParser from 'cookie-parser';
import { oauth2Client } from '../config/googleOAuth';

export const checkAuth = async (req, res, next) => {
    try{
        accessToken = req.cookies.access_token;
        refreshToken = req.cookies.refresh_token;

        if (!accessToken){
            return res.status(401).send('Unauthorized: No access token found');
        }

        oauth2Client.setCredentials({access_token: accessToken, refresh_token: refreshToken })

        if (oauth2Client.isTokenExpiring()){
            try {
                const newTokens = await oauth2Client.refreshAccessToken();
                oauth2Client.setCredentials(newTokens.credentials)
                res.cookies('access_token', newTokens.credentials.access_token, {
                    httpOnly: 'true',
                    secure: 'true',
                    maxAge: tokens.expiry_date - Date.now()
                })

            } catch (err){
                res.status(401).send('Unauthorized: Failed to refresh Token')
            }
        }
      
    } catch (err){
      next(err)
    }
  }