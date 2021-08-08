const functions = require('firebase-functions');
// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'test@example.com',
  from: 'test@example.com', // Use the email address or domain you verified above
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>'
};

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.sendMail = functions.https.onRequest((request, response) => {
  (async () => {
    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error(error);
      functions.logger.error(error, { structuredData: true });
      response.send(error);
      if (error.response) {
        functions.logger.error(error.response.body, { structuredData: true });
        response.send(error.response.body);
      }
    }
  })();
});
