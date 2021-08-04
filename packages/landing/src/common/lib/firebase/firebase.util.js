import { db, increment, decrement } from './firebase';

export function convertCollectionsSnapshotToMap(snapshots) {
  return snapshots.docs.reduce((accumulator, collection) => {
    accumulator[collection.id] = collection.data();
    return accumulator;
  }, {});
}
export async function getNewDocRef(collectionName) {
  return await db.collection(collectionName).doc();
}
export async function addDocument(collectionName, documentData) {
  return await db
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
  return await db
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
  return await batch.commit().then(() => {
    console.log('Batch Addition successfully committed!');
  });
};

export async function getDocument(collectionName, docRef) {
  return await db
    .collection(collectionName)
    .doc(docRef)
    .get()
    .then((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getDocuments(collectionName) {
  return await db
    .collection(collectionName)
    .get()
    .then((querySnapshot) =>
      querySnapshot.docs.map((doc) => {
        /*  let createdAt;
        if (doc.data().createdAt) {
          createdAt = Date.parse(doc.data().createdAt.toDate().toString());
        } */
        return { id: doc.id, /* createdAt, */ ...doc.data() };
      })
    );
}
export async function getDocumentsByQuery(collectionName, query) {
  console.log(...query, collectionName, 'test');

  return await db
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

  return await batch.commit().then(() => {
    console.log('Batch Deletion successfully committed!');
  });
}

export const batchedDelete = async (objectsToDelete) => {
  const batch = db.batch();
  objectsToDelete.forEach(({ docRef }) => {
    const oldDocRef = db.collection(collectionKey).doc(docRef);
    batch.delete(oldDocRef);
  });
  return await batch.commit().then(() => {
    console.log('Batch Writes successfully committed!');
  });
};

export const batchedWrites = async (objectsToAdd) => {
  const batch = db.batch();
  objectsToAdd.forEach(({ docRef, collectionKey, data, options }) => {
    const newDocRef = db.collection(collectionKey).doc(docRef);
    batch.set(newDocRef, data, options);
  });
  return await batch.commit().then(() => {
    console.log('Batch Operation successfully committed!');
  });
};

export const batchedUpdates = async (objectsToUpdate) => {
  const batch = db.batch();
  objectsToUpdate.forEach(({ docRef, collectionKey, data }) => {
    const newDocRef = db.collection(collectionKey).doc(docRef);
    batch.update(newDocRef, data);
  });
  return await batch.commit().then(() => {
    console.log('Batch Updates successfully committed!');
  });
};

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
  return await batch.commit().then(() => {
    console.log('Batch Operations successfully committed!');
  });
};
