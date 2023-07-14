const express = require('express');
const port = process.env.PORT || 8085;
const app = express();

app.use(express.static(__dirname + '/dist/'));
app.get(/.*/, function(req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});
app.listen(port);

console.log('server started, listening on port ' + port);

/*
Steps to launch a Vue Single Page application onto heroku.

Generate a Vue.js project
-------------------------
vue init webpack <YOUR-PROJECT-NAME-HERE>
CD <YOUR-PROJECT-NAME-HERE>
npm install
npm run dev

Create your Heroku App
----------------------
heroku create <YOUR-PROJECT-NAME-HERE>

In order to avoid having heroku install needless development
dependencies when deploying later, let's go ahead and set 
the NODE_ENV setting to production.
(I have not done this for dfusedemo!!)

heroku config:set NODE_ENV=production --app <YOUR-PROJECT-NAME-HERE>

Create a sever.js and build your site
-------------------------------------
npm install express --save

Add a server.js to your project's root directory
NOTE: PORT must be in capital letters!!!!

// server.js
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
app = express();
app.use(serveStatic(__dirname + "/dist"));
var port = process.env.PORT || 5000;
app.listen(port);
//console.log('server started '+ port);

IMPORTANT: What you probably noticed is that this will serve up a dist directory. 
dist is a predefined directory that Vue.js builds which is a compressed, minified 
version of your site. We’ll build this and then tell Heroku to run server.js so 
Heroku hosts up this dist directory.

npm run build

you should see an output 'dist' directory now.
Test server.js by running it.

node server.js

Now go to http://localhost:5000 and make sure your app loads. 
This is the actual site Heroku will serve up.

Lastly, we’ll have to edit our start script in package.json to 
start our node server, as Heroku will automatically look for this 
script when looking for how to run a node.js app.

// package.json
{
  "name": "<YOUR-PROJECT-NAME-HERE>",
  "version": "1.0.0",
  "description": "A Vue.js project",
  "author": "",
  "private": true,
  "scripts": {
    "dev": "node build/dev-server.js",
    "build": "node build/build.js",
    "start": "node server.js",              <--- Add THIS LINE
...

Git Init and Add Your Heroku Remote Repository
----------------------------------------------
git init

Now let's adds our Heroku remote repository:
heroku git:remote --app <YOUR-PROJECT-NAME-HERE>

let's keep our generated 'dist' directory so that we can always keep 
a pristine copy of what we've deployed to Heroku by removing 'dist/' 
from '.gitignore'

.DS_Store
node_modules/
dist/                       <--- REMOVE THIS LINE
npm-debug.log*
yarn-debug.log*
yarn-error.log*
test/unit/coverage
test/e2e/reports
selenium-debug.log
# Editor directories and files
.idea
*.suo
*.ntvs*
*.njsproj
*.sln

Now, most importantly, let’s add and commit our code files:

git add . && git commit -a -m "Adding files."

This will take our committed code, push it to Heroku’s remote repository, 
run our start command in package.json which will serve up our freshly built dist directory.

If you come across any issues, you can always run heroku logs to troubleshoot.
If deployment is successful, test out your project’s URL 
https://<YOUR-PROJECT-NAME-HERE>.herokuapp.com and you’re done!

                + + + + + + + + + + + + + + + + 

BONUS TIP: Heroku’s free tier forces your app to go to sleep if there’s no 
traffic hitting it after awhile, thus causing some serious “wake up” time if 
someone tries to check out your app. One thing I like to do is set a free 
health check (i.e. via pingdom.com) that hits my Heroku URL every few minutes 
to keep it awake.

Source:
https://medium.com/netscape/deploying-a-vue-js-2-x-app-to-heroku-in-5-steps-tutorial-a69845ace489

Title:
Easily deploy a Vue + Webpack App to Heroku in 5 Steps [tutorial]








*/
