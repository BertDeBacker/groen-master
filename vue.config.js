module.exports = {
  transpileDependencies: ['vuetify'],
  //06/12/2019
  //After building my application and serving it using express from my local machine and from heroku I received follwing error.
  //Firefox: Loading module from “https://test-groen.herokuapp.com/TEST/dist/js/chunk-vendors.25ddc3c7.js” was blocked because of a disallowed MIME type (“text/html”).
  //Chrome:  Failed to load module script: The server responded with a non-JavaScript MIME type of "text/html". Strict MIME type checking is enforced for module scripts per HTML spec.
  //         link address: http://localhost:8085/TEST/dist/js/app.239ac0e0.js
  //         http://localhost:8085/TEST/dist/js/chunk-vendors.25ddc3c7.js
  //It was solved by removeing 'TEST' from the publicPath below.

  //I continued to receive the following error when I
  //publicPath: process.env.NODE_ENV === 'production' ? 'TEST/dist/' : '/'
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/'
};
