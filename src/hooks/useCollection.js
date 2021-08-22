import { useEffect, useState } from "react";
import database from "../firebase";

const useCollection = (name, docId) => {
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    database
      .collection(name)
      .doc(docId)
      .onSnapshot((snapshot) =>
        setCollection({
          id: snapshot.id,
          data: snapshot.data(),
        })
      );
    setLoading(false);
  }, [name, docId]);

  return [collection, loading];
};

export default useCollection;
