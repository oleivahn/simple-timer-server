const axios = require("axios");

const tokenEndpoint = "https://omar-tenant.us.auth0.com/oauth/token";

const oAuth = (req, res, next) => {
  const code = req.headers.authorization;
  console.log("🚀 ~ file: oAuth.js:7 ~ oAuth ~ code:", code);

  axios
    .post(tokenEndpoint, {
      grant_type: "authorization_code",
      client_id: "JfcwhlEVJmPUXZ0IxZ4kATx7pILvbded",
      client_secret:
        "SQWt8Gdt91yyHYojCcrtW3YoJ8I-xAFEFAETwUIA6gL6lz1zUeXt-fL2NA-jrV4T",
      code: code,
      redirect_uri: "http://localhost:5173/",
    })
    .then((response) => {
      console.log("Response: ", response.data);
      req.oAuth = response.data;
      res.send(response.data);
      next();
    })
    .catch((error) => {
      console.log("Error: ", error);
      res.status(403).json({ error: "Unauthorized" });
    });
};

module.exports = { oAuth };
