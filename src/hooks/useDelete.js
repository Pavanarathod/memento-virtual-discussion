import database from "../firebase";

const useDelete = (collectionName, docId, relationName, deleteDoc) => {
  database
    .collection(collectionName)
    .doc(docId)
    .collection(relationName)
    .doc(deleteDoc)
    .delete();
};

export default useDelete;
