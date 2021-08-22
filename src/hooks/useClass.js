import { useEffect, useState } from "react";
import database from "../firebase";

const useClass = (collectionName, docId) => {
  const [classDetails, setClassDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    database
      .collection(collectionName)
      .doc(docId)
      .onSnapshot((snapshot) => setClassDetails(snapshot.data()));
  }, [collectionName, docId]);

  return [classDetails, loading];
};

export default useClass;
