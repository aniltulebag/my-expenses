import { useEffect, useRef, useState } from 'react';

// firebase
import { projectFirestore } from '../firebase/config';

const useCollection = (collection, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  // preventing infinite loop in useEffect
  // _query and _orderBy are an array, and "different" on every function call
  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  useEffect(() => {
    // collection ref instance
    let collectionRef = projectFirestore.collection(collection);

    // check if query exists, then create a new filtered query
    if (query) collectionRef = collectionRef.where(...query);

    // check if orderBy exists, then create a new filtered query
    if (orderBy) collectionRef = collectionRef.orderBy(...orderBy);

    // snapshot listener
    const unsubscribe = collectionRef.onSnapshot(
      snapshot => {
        let results = [];

        snapshot.docs.forEach(doc => {
          results.push({ ...doc.data(), id: doc.id });
        });

        // update state
        setDocuments(results);
        setError(null);
      },
      error => {
        setError('Could not fetch the data');
      }
    );

    // unsubscribe on unmount
    return () => unsubscribe();
  }, [collection, query, orderBy]);

  return { documents, error };
};

export default useCollection;
