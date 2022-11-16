import { useEffect, useReducer, useState } from 'react';

// firebase
import { projectFirestore, timestamp } from '../firebase/config';

const INITIAL_STATE = {
  isPending: false,
  document: null,
  success: null,
  error: null,
};

const firestoreReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'IS_PENDING':
      return { isPending: true, document: null, success: false, error: null };
    case 'ADDED_DOCUMENT':
      return {
        isPending: false,
        document: payload,
        success: true,
        error: null,
      };
    case 'DELETED_DOCUMENT':
      return {
        isPending: false,
        document: null,
        success: true,
        error: null,
      };
    case 'ERROR':
      return {
        isPending: false,
        document: null,
        success: false,
        error: payload,
      };
    default:
      return state;
  }
};

const useFirestore = collection => {
  const [response, dispatch] = useReducer(firestoreReducer, INITIAL_STATE);
  const [isCancelled, setIsCancelled] = useState(false);

  // collection ref
  const collectionRef = projectFirestore.collection(collection);

  // only dispatch if not cancelled
  const dispatchIfNotCancelled = action => {
    if (!isCancelled) dispatch(action);
  };

  // add a new document
  const addDocument = async doc => {
    dispatch({ type: 'IS_PENDING' });

    try {
      const createdAt = timestamp.fromDate(new Date());

      const addedDocRef = await collectionRef.add({ ...doc, createdAt });

      dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocRef });
    } catch (error) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: error });
    }
  };

  // delete a document from collection
  const deleteDocument = async id => {
    dispatch({ type: 'IS_PENDING' });

    try {
      await collectionRef.doc(id).delete();

      dispatchIfNotCancelled({
        type: 'DELETED_DOCUMENT',
      });
    } catch (error) {
      dispatchIfNotCancelled({
        type: 'ERROR',
        payload: 'could not delete the document',
      });
    }
  };

  // cleanup on unmount
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { response, addDocument, deleteDocument };
};

export default useFirestore;
