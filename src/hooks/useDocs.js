import { useEffect, useState } from "react";

import database from "../firebase";

const useDocs = (name, docId, relation) => {
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    database
      .collection(name)
      .doc(docId)
      .collection(relation)
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setCollection(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    setLoading(false);
  }, [name, docId, relation]);

  return [collection, loading];
};

export default useDocs;
