const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');

admin.initializeApp();
sgMail.setApiKey(functions.config().sendgrid.apikey);

exports.sendMail = functions.https.onCall((data, context) => {
  const { email, fullName, url, document } = data;
  const msg = {
    to: 'juniegrat@gmail.com', //email,
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

exports.onDeleteTest = functions.firestore
  .document('tests/{testId}')
  .onDelete((snap, context) => {
    const firestore = admin.firestore();
    const bucket = admin.storage().bucket();
    const { document } = snap.data();
    const docRef = firestore.collection('aggregations').doc('--stats--');
    return Promise.all([
      new Promise((resolve) => {
        resolve(
          docRef.update({
            totalTests: admin.firestore.FieldValue.increment(-1)
          })
        );
      }),
      new Promise((resolve) => {
        resolve(bucket.file(document.fullPath).delete());
      })
    ]);
  });

/*
exports.onUpdateTestResult = functions.firestore
  .document('tests/{testId}')
  .onUpdate((change, context) => {
    const firestore = admin.firestore();
    const previousTest = change.before.data();
    const newTest = change.after.data();

    if (!previousTest.result && newTest.result) {
      const docRef = firestore.collection('aggregations').doc('--stats--');
      return docRef.update({
        totalTests: admin.firestore.FieldValue.increment(1)
      });
    } else {
      return null;
    }
  });
*/
