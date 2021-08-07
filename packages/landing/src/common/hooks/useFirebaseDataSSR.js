import {
  useCollectionData,
  useDocumentData
} from 'react-firebase-hooks/firestore';

export function useCollectionDataSSR(collectionKey, options) {
  const [value, loading, error] = useCollectionData(collectionKey, options);
  if (options?.startWith && loading) {
    return [options.startWith, loading, error];
  } else {
    return [value, loading, error];
  }
}
export function useDocumentDataSSR(collectionKey, options) {
  const [value, loading, error] = useCollectionData(collectionKey, options);
  if (options?.startWith && loading) {
    return [options.startWith, loading, error];
  } else {
    return [value, loading, error];
  }
}
