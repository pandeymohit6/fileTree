const useTraversTree = () => {
  function insertNode(tree, folderId, item, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder,
        items: [],
      });
      return tree;
    }
    let latestNode = [];
    latestNode = tree.items.map((obj) => {
      return insertNode(obj, folderId, item, isFolder);
    });
    return { ...tree, items: latestNode };
  }
  function removeNode(tree, folderId, isFolder) {
    console.log(isFolder);
    if (tree.id == folderId && tree.isFolder) {
      const index = tree.items.findIndex((item) =>
        console.log(item.id, folderId)
      );
      console.log(index);
      if (index !== -1) {
        const removedElement = tree.items.splice(index, 1)[0];
        console.log("removedElement");
      }
      return tree;
    }
    let latestNode = [];
    latestNode = tree.items.map((obj) => {
      return removeNode(obj, folderId, isFolder);
    });
    return { ...tree, items: latestNode };
  }

  return { insertNode, removeNode };
};

export default useTraversTree;
