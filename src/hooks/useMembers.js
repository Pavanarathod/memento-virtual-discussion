import { useState, useEffect } from "react";
import database from "../firebase";

const useMembers = (collectionName, docId, relation) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    database
      .collection(collectionName)
      .doc(docId)
      .collection(relation)
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setMembers(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, [collectionName, docId, relation]);

  return [members, loading];
};

export default useMembers;
