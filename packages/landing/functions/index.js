const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');
const client = require('twilio')(
  functions.config().twilio.accountsid,
  functions.config().twilio.authtoken
);

admin.initializeApp();
const increment = admin.firestore.FieldValue.increment(1);
const decrement = admin.firestore.FieldValue.increment(-1);

sgMail.setApiKey(functions.config().sendgrid.apikey);

const bindingOpts = {
  identity: '00000001', // We recommend using a GUID or other anonymized identifier for Identity.
  bindingType: 'sms',
  address: '+1651000000000'
};
//* SENDGRID
exports.sendMail = functions.https.onCall((data, context) => {
  const { email, fullName, testId, createdAt, document } = data;
  const msg = {
    to: 'juniegrat@gmail.com', //email,
    from: 'junie.grat@oneo-digital.com',
    templateId: functions.config().sendgrid.templates.resultready,
    dynamicTemplateData: {
      fullName,
      testId,
      createdAt
    },
    ...(document && {
      attachments: [
        {
          content: document.file.split(',')[1],
          filename: document.name,
          type: document.type
        }
      ]
    })
  };
  return (async () => {
    try {
      await sgMail.send(msg);
      return { response: 'Success Email' };
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

//* TWILIO
exports.sendSMS = functions.https.onCall((data, context) => {
  const { phoneNumber, msg } = data;
  const notificationOpts = {
    toBinding: JSON.stringify({
      binding_type: 'sms',
      address: '+33646850407' //phoneNumber
    }),
    body: msg
  };
  return (async () => {
    try {
      await client.notify
        .services(functions.config().twilio.serviceinstancesid)
        .notifications.create(notificationOpts);
      return { response: 'Success SMS' };
    } catch (error) {
      console.error(error);
      functions.logger.error(error, { structuredData: true });
      return { response: error };
    }
  })();
});

//* FIREBASE
exports.onDeleteTest = functions.firestore
  .document('tests/{testId}')
  .onDelete((snap, context) => {
    const firestore = admin.firestore();
    const { document, result } = snap.data();
    const docRef = firestore.collection('aggregations').doc('--stats--');
    return Promise.all([
      new Promise((resolve, reject) => {
        resolve(
          docRef.update({
            totalTests: decrement,
            ...(result &&
              (result === 'positive'
                ? { positiveResults: decrement, totalResults: decrement }
                : { negativeResults: decrement, totalResults: decrement }))
          })
        );
      }),
      document &&
        new Promise((resolve) => {
          const bucket = admin.storage().bucket();
          resolve(bucket.file(document.fullPath).delete());
        })
    ]);
  });

exports.onUpdateTestResult = functions.firestore
  .document('tests/{testId}')
  .onUpdate((change, context) => {
    const firestore = admin.firestore();
    const previousTest = change.before.data();
    const newTest = change.after.data();
    const filePathArray =
      previousTest.document && previousTest.document.fullPath.split('/');
    if (previousTest.document && !newTest.document) {
      const bucket = admin.storage().bucket();
      return bucket.file(filePathArray[filePathArray - 2]).delete();
    } else {
      return null;
    }
  });
