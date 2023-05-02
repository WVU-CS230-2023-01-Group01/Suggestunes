const functions = require("firebase-functions");
const cors = require('cors')({ origin: true });

const SpotifyWebApi = require('spotify-web-api-node');

const spotifyConfig = {
    clientId: "a183b7596de144229a97c4e6fae8d8eb",
    clientSecret: "ecec11486e604daf8d984d51e119f097",
    redirectUri: "https://suggestoons-app.web.app/spotify-auth"
};

var spotifyApi = new SpotifyWebApi(spotifyConfig);

exports.getTokens = functions.https.onRequest((_req, res) => {
    cors(_req, res, () => {

        //Retrieve code from request
        const code = _req.query.code;
        const refreshToken = _req.query.refresh_token;

        if (!code && !refreshToken) {
            return res.status(403).json({ success: false, data: "Not authorized" });
        }

        if (refreshToken) {
            //Refresh token is available, retrieve a new access token
            return res.json({ todo: "Refresh accesstoken" });
        }

        if (code) {
            //Retrieve new refresh token and access token
            spotifyApi.authorizationCodeGrant(code).then(
                (data) => {
                    return res.json(data.body);
                },
                (err) => {
                    return res.json({ message: "Error Occurred", error: err })
                }
            ).catch((oError) => {
                return res.json(oError);
            })
        }
    })
})

const admin = require('firebase-admin');
const crypto = require('crypto');

// Get the Secret Token variable from the environment
// Set this varibale using 'firebase functions:config:set myapp.secret_token="SECRET_TOKEN"'
const SECRET_TOKEN = process.env.secret_token;

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSW50ZWdyYXRpb25BY2Nlc3NUb2tlbiIsInZlcnNpb24iOiIxLjAiLCJpbnRlZ3JhdGlvbklkIjo1MjgsInVzZXJJZCI6Mjc5OTIsImFjY2Vzc1Rva2VuU2VjcmV0IjoiOTMzN2Y4NDJiNTM2MGE5NGM4ZGNjOGJjMzIwNTUyOTA4NDFjNTVmZGU5YzYwYTllMTViNDY4ODdiNWEwMGE1ZCIsImlhdCI6MTY4MzA0MzgyOX0.jcSVXrNMp8OjfRA9MRWhKLBurJb8Wi2uHIY5L8w5gNc

//Secret Token = SECRET_TOKEN

exports.getSuggestion = functions.https.onRequest(async (req, res) => {
  try {
    // Split and save important info from the request
    const body = req.body;
    const signature = req.headers.signature;
    const correctSignature = crypto.createHmac("sha512", SECRET_TOKEN).update(JSON.stringify(body)).digest("hex");

    // Print out what the request is
    console.log("The request is:");
    console.log(req);

    // If either the signature or body do not exist, the request is invalid
    if (!signature || !body){
        res.status(400).send('Invalid Request');
        console.log("Invalid Request");
        return;
    }
    console.log("Request had both signature and body");

    if (signature !== correctSignature){
        res.status(401).send('Unauthorized Request');
    }

    // Your webhook logic goes here, using the payload object
    res.status(200).send('Webhook processed successfully');
  } catch (error) {
    console.log(req);
    console.error(error);
    res.status(500).send('An error occurred while processing the webhook' + '\n' + error +'\n' + req + '\n' + process.env.secret_token);
  }
});
