import {useCollectionData} from 'react-firebase-hooks/firestore';

export function useCollectiontDataSSR(collectionKey, options) {
    const [value, loading, error] = useCollectionData(collectionKey, options);
    if (options?.startWith && loading) {
        return [options.startWith, loading, error];
    } else {
        const values = value.map((doc) => ({id: doc.id, ...doc}))
        return [values, loading, error];
    }
}
