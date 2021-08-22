import { useState, useEffect } from "react";

import database from "../firebase";

const useFetch = (docName) => {
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    database
      .collection(docName)
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setCollection(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    setLoading(false);
  }, [docName]);

  return [collection, loading];
};

export default useFetch;
