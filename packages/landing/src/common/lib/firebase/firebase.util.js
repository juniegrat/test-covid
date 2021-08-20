import firebase, { db, storage } from './firebase';

// * FIRESTORE
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
  const batch = db.batch();
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
    if (!docRef) {
      return;
    }
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

// * STORAGE

export async function getDownloadURL(filePath) {
  const storageRef = storage.ref();
  const fileRef = storageRef.child(filePath);
  return new Promise((resolve, reject) => {
    resolve(fileRef.getDownloadURL());
  });
}

export async function getDownloadURLs(paths) {
  return Promise.all(
    paths.map((path) => {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(path);
      return fileRef
        .getDownloadURL()
        .then((url) => url)
        .catch((error) => {
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/object-not-found':
              console.error("File doesn't exist");
              break;
            case 'storage/unauthorized':
              console.error(
                "User doesn't have permission to access the object"
              );
              break;
            case 'storage/canceled':
              console.error('User canceled the upload');
              break;

            // ...

            case 'storage/unknown':
              console.error(
                'Unknown error occurred, inspect the server response'
              );
              break;
          }
        });
    })
  );
}

export async function uploadFiles(files) {
  return Promise.all(
    files.map(({ file, path }) => {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(path);
      const uploadTask = fileRef.put(file);
      return new Promise((resolve, reject) =>
        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot) => {
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED:
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING:
                console.log('Upload is running');
                break;
            }
            const progress =
              snapshot.bytesTransferred &&
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          },
          (error) => {
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case 'storage/unauthorized':
                reject("User doesn't have permission to access the object");
                break;
              case 'storage/canceled':
                reject('User canceled the upload');
                break;

              case 'storage/unknown':
                reject('Unknown error occurred, inspect error.serverResponse');
                break;
            }
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              resolve({
                fullPath: uploadTask.snapshot.ref.fullPath,
                downloadURL
              });
            });
          }
        )
      );
    })
  );
}

export async function deleteFiles(paths) {
  return Promise.all(
    paths.map((path) => {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(path);
      return new Promise((resolve, reject) =>
        fileRef
          .delete()
          .then(() => {
            resolve('File deleted successfully');
          })
          .catch((error) => {
            reject(error);
          })
      );
    })
  );
}
