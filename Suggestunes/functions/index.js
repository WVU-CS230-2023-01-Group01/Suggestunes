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
const SECRET_TOKEN = functions.config().webhooks.secrettoken;
const ACCESS_TOKEN = functions.config().webhooks.accesstoken;
const API_URL = functions.config().webhooks.apiurl;

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

        if (!req.body) {
            console.log('[info] unprocessable entity')
            res.status(422).send('Invalid Request - No Body');
        }

        console.log("[info] incoming event:");
        console.log(JSON.stringify(req.body, undefined, 2));

        if (req.body.type === "TEST") {
            console.log("[info] processing test event");
            res.status(200).send('Processing Test Event');
        }

        // If either the signature or body do not exist, the request is invalid
        if (!signature) {
            res.status(400).send('Invalid Request - No Signature');
            console.log("Invalid Request");
            return;
        }
        console.log("Request had both signature and body");

        // If the signure is not correct, spit out unauthorized request response
        if (signature !== correctSignature) {
            res.status(401).send('Unauthorized Request');
        }

        if (req.body.event.type === "AudioAnalysisV6" && req.body.event.status === "finished") {
            console.log("[info]")
            asynchronouslyFetchspotifyTrackResult(req.body.resource.id);
        }
        // Your webhook logic goes here, using the payload object

        res.status(200).send('Webhook processed successfully');
        return result.data;
    } catch (error) {
        console.log(req);
        console.error(error);
        res.status(500).send('An error occurred while processing the webhook' + '\n' + error + '\n' + req + '\n' + functions.config().webhooks.secrettoken);
    }
});

const asynchronouslyFetchspotifyTrackResult = async spotifyTrackId => {
    // fetch the whole information
    const spotifyTrackQueryDocument = /* GraphQL */ `
      query SpotifyTrack($spotifyTrackId: ID!) {
        spotifyTrack(id: $spotifyTrackId) {
          ... on SpotifyTrackNotFoundError {
            message
          }
          ... on SpotifyTrack {
            id
            audioAnalysisV6 {
              ... on AudioAnalysisV6Finished {
                result {
                  genre {
                    ambient
                    blues
                  }
                }
              }
            }
            similarSpotifyTracks {
              ... on SimilarSpotifyTracksError {
                message
              }
              ... on SimilarSpotifyTrackConnection {
                edges {
                  node {
                    spotifyTrack {
                      id
                    }
                  }
                }
              }
            }
          }
        }
      }`;
    const result = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({
            query: mutationDocument,
            variables: { input: { spotifyTrackId } }
        }),
        headers: {
            Authorization: "Bearer " + ACCESS_TOKEN,
            "Content-Type": "application/json"
        }
    }).then(res => res.json());
    console.log("[info] spotifyTrackEnqueue response: ");
    console.log(JSON.stringify(result, undefined, 2));
    if (result.data.spotifyTrackEnqueue.__typename.endsWith("Error")) {
        throw new Error(result.data.inDepthAnalysisFileUpload.message);
    }

    return result.data;
};

const fetch = require("node-fetch");

exports.sendRequest = functions.https.onRequest(async (req, res) => {
    spotifyTrackId = req.query.spotifytrackid;
    return await asynchronouslyFetchspotifyTrackResult(spotifyTrackId);
});
