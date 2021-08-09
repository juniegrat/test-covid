const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');

admin.initializeApp();
sgMail.setApiKey(functions.config().sendgrid.apikey);

exports.sendMail = functions.https.onCall((data, context) => {
  const { email, fullName, url, document } = data;
  const msg = {
    to: email,
    from: 'junie.grat@oneo-digital.com',
    templateId: functions.config().sendgrid.templates.resultready
    /*
    dynamicTemplateData: {
      name: fullName,
      url: url
    ,
    }
    attachments: [
      document && {
        content: document.file,
        filename: document.name
      }
    ]
    */
  };
  return (async () => {
    try {
      await sgMail.send(msg);
      return { response: 'Success' };
    } catch (error) {
      if (error.response) {
        console.error(error.response.body);
        functions.logger.error(error.response.body, { structuredData: true });
        return { response: error.response.body };
      }
      console.error(error);
      functions.logger.error(error, { structuredData: true });
      return { response: error };
    }
  })();
});
