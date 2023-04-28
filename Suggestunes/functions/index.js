const functions = require("firebase-functions");
const cors = require('cors')({origin: true});

const SpotifyWebApi = require('spotify-web-api-node');

const spotifyConfig = {
    clientId: "a183b7596de144229a97c4e6fae8d8eb",
    clientSecret: "ecec11486e604daf8d984d51e119f097",
    redirectUri: "http://localhost:4200/spotify-auth"
};

var spotifyApi = new SpotifyWebApi(spotifyConfig);

exports.getTokens = functions.https.onRequest((_req, res) => {
    cors(_req, res, () => {

    //Retrieve code from request
    const code = _req.query.code;
    const refreshToken = _req.query.refresh_token;

    if(!code && !refreshToken){
        return res.status(403).json({success: false, data: "Not authorized"});
    }

    if(refreshToken){ 
        //Refresh token is available, retrieve a new access token
        return res.json({ todo: "Refresh accesstoken"});
    }

    if(code){
        //Retrieve new refresh token and access token
        spotifyApi.authorizationCodeGrant(code).then(
            (data) => {
                return res.json(data.body);
            },
            (err) => {
                return res.json({message: "Error Occurred", error: err})
            }
        ).catch((oError) => {
            return res.json(oError);
        })
    }
})
})