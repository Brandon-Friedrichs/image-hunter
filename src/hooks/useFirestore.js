import { useState, useEffect } from 'react';
import { firestore } from '../firebase';

export default function useFirestore(collection) {
  const [docs, setDocs] = useState(null);

  useEffect(() => {
    const query = firestore.collection(collection).orderBy('time', 'asc').limit(10);
    const unsub = query.onSnapshot((snapshot) => {
      const documents = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data(), };
      });
      console.log(`Getting ${collection}`);
      console.log(documents);
      setDocs(documents);
    });
    return () => unsub();
  }, [collection])

  return [docs];
}
