import { useState } from "react";
import "./App.css";
import Folder from "./components/Folder";
import explorer from "./data/folder";
import useTraversTree from "./hooks/useTraversTree";

function App() {
  const [explorerData, setExplorerData] = useState(explorer);
  const { insertNode, removeNode } = useTraversTree();

  const handleInsertNode = (folderId, isFolder, item) => {
    const finalTree = insertNode(explorerData, folderId, isFolder, item);
    setExplorerData(finalTree);
  };
  const handleDeleteNode = (folderId, isFolder) => {
    const finalTree = removeNode(explorerData, folderId, isFolder);
    setExplorerData(finalTree);
  };
  return (
    <div className="App">
      <Folder
        explorer={explorerData}
        handleInsertNode={handleInsertNode}
        handleDeleteNode={handleDeleteNode}
      ></Folder>
    </div>
  );
}

export default App;
