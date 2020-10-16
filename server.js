const express = require('express');
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');
const enforce = require('express-sslify');

const app= express();

//forces users to use the HTTPS version of site
app.use(enforce.HTTPS({trustProtoHeader: true}));
app.use(serveStatic( __dirname +'/dist'));
//helps prevent router history issues
app.use(history());

//makes heroku to use this port
app.listen(process.env.PORT || 3000);



