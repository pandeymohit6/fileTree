import { useState } from "react";
import { FcFile, FcFolder } from "react-icons/fc";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
export default function Folder({
  explorer,
  handleInsertNode,
  handleDeleteNode,
}) {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  function handleFolder(e, isFolder) {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  }

  function handleEdit(e, isFolder) {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  }

  function handleDelete(id, isFolder) {
    handleDeleteNode(explorer.id, id, isFolder);
    setShowInput({ ...showInput, visible: false });
  }

  const addNewFolder = (e) => {
    if (e.keyCode == 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };
  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div className="folder" onClick={() => setExpand(!expand)}>
          <span>
            <FcFolder /> {explorer.name} {explorer.id}
            <FaEdit onClick={(e) => handleEdit(e, true)} />
            <RiDeleteBin2Fill
              onClick={(e) => handleDelete(explorer.id, true)}
            />
          </span>
          <div>
            <button onClick={(e) => handleFolder(e, true)}>Folder + </button>
            <button onClick={(e) => handleFolder(e, false)}>File +</button>
          </div>
        </div>
        <div style={{ display: expand ? "block" : "none", paddingLeft: 10 }}>
          {showInput.visible && (
            <div className="inputcontainer">
              <span> {showInput.isFolder ? <FcFolder /> : <FcFile />}</span>
              <input
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                onKeyDown={(e) => addNewFolder(e)}
                className="inputcontainer__input"
                autoFocus
              />
            </div>
          )}
          {explorer.items.map((expo) => {
            return (
              <Folder
                handleInsertNode={handleInsertNode}
                handleDeleteNode={handleDeleteNode}
                explorer={expo}
                key={expo.id}
              />
            );
          })}
        </div>
        <div></div>
      </div>
    );
  } else {
    return (
      <span className="file">
        <FcFile />
        {explorer.name} {explorer.id}{" "}
        <FaEdit onClick={(e) => handleEdit(e, false)} />
        <RiDeleteBin2Fill onClick={(e) => handleDelete(explorer.id, true)} />
      </span>
    );
  }
}
