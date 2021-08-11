const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');

admin.initializeApp();
sgMail.setApiKey(functions.config().sendgrid.apikey);
const increment = admin.firestore.FieldValue.increment(1);
const decrement = admin.firestore.FieldValue.increment(-1);
exports.sendMail = functions.https.onCall((data, context) => {
  const { email, fullName, testId, createdAt, document } = data;
  console.log(data);
  const msg = {
    to: 'juniegrat@gmail.com', //email,
    from: 'junie.grat@oneo-digital.com',
    templateId: functions.config().sendgrid.templates.resultready,
    dynamicTemplateData: {
      fullName,
      testId,
      createdAt
    },
    attachments: [
      document && {
        content: document,
        filename: document.name
      }
    ]
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
            ...(result === 'positive'
              ? { positiveTests: decrement, totalResults: decrement }
              : { negativeTests: decrement, totalResults: decrement })
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
    const filePathArray = previousTest?.document?.fullPath.split('/');
    if (previousTest.document && !newTest.document) {
      const bucket = admin.storage().bucket();
      return bucket.file(filePathArray[filePathArray - 2]).delete();
    } else {
      return null;
    }
  });
