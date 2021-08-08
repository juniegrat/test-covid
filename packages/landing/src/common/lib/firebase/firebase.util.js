import { db } from './firebase';

export function convertCollectionsSnapshotToMap(snapshots) {
  return snapshots.docs.reduce((accumulator, collection) => {
    accumulator[collection.id] = collection.data();
    return accumulator;
  }, {});
}
export async function getNewDocRef(collectionName) {
  return db.collection(collectionName).doc();
}
export async function addDocument(collectionName, documentData) {
  return db
    .collection(collectionName)
    .add(documentData)
    .then((docRef) => docRef.id);
}
export async function setDocument(
  collectionName,
  docRef,
  documentData,
  options
) {
  return db
    .collection(collectionName)
    .doc(docRef)
    .set(documentData, { ...options });
}

export const setDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = db.collection(collectionKey);
  const batch = db.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });
  return batch.commit().then(() => {
    console.log('Batch Addition successfully committed!');
  });
};

export async function getDocument(collectionName, docRef) {
  return db
    .collection(collectionName)
    .doc(docRef)
    .get()
    .then((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getDocuments(collectionName) {
  return db
    .collection(collectionName)
    .get()
    .then((querySnapshot) =>
      querySnapshot.docs.map((doc) => {
        return { id: doc.id, /* createdAt, */ ...doc.data() };
      })
    );
}
export async function getDocumentsByQuery(collectionName, query) {
  console.log(...query, collectionName, 'test');

  return db
    .collection(collectionName)
    .where(...query)
    .get()
    .then((querySnapshot) =>
      querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
}

export async function deleteCollection(collectionName) {
  const collectionRef = db.collection(collectionName);
  var batch = db.batch();
  await collectionRef
    .get()
    .then((querySnapshot) =>
      querySnapshot.docs.map((doc) => batch.delete(collectionRef.doc(doc.id)))
    );

  return batch.commit().then(() => {
    console.log('Batch Deletion successfully committed!');
  });
}

export const batchOperations = async (documents) => {
  const batch = db.batch();
  documents.forEach(({ operation, docRef, collectionKey, data, options }) => {
    const newDocRef = db.collection(collectionKey).doc(docRef);
    switch (operation) {
      case 'set':
        {
          batch.set(newDocRef, data, options);
        }
        break;
      case 'update':
        {
          batch.update(newDocRef, data);
        }
        break;
      case 'delete':
        {
          batch.delete(newDocRef);
        }
        break;
    }
  });
  return batch.commit().then(() => true);
};
