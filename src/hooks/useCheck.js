import { useEffect, useState } from "react";
import database from "../firebase";

const useCheck = (firstCollection, docId, relation, userId) => {
  const [userExists, setUserExists] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    database
      .collection(firstCollection)
      .doc(docId)
      .collection(relation)
      .where("uuid", "==", userId)
      .onSnapshot((snapshot) =>
        setUserExists(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    setLoading(false);
  }, [firstCollection, docId, relation, userId]);

  return [userExists, loading];
};

export default useCheck;
