const User = require("./user")

const mailgun = require('mailgun-js');
const DOMAIN = "sandboxa7c206cf460c43e08db1e5d032d67168.mailgun.org";
const mg = mailgun({apiKey: "33d8533b7b4c5fd6450d1f38f5b5e913-90ac0eb7-6d7d70f0", domain: DOMAIN});

