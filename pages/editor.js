import React, { useEffect, useRef, useState } from "react";
import { initEditor, initStudio } from "../helper/studio";
import ElementsDropdown from "../components/EditorComponents/ElementsDropdown";

const Editor = () => {
  const pageRef = useRef(null);
  const [editableElements, setEditableElements] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [properties, setProperties] = useState({
    text: "",
    tagName: "",
    id: "",
  });
  const selectedElementRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      initEditor(pageRef.current.contentDocument, setEditableElements);
    }, 2000);
  }, []);

  useEffect(() => {
    console.log("editingElementRefs", editableElements);

    if (editableElements) {
      //get the first value from object
      const firstKey = Object.keys(editableElements)[0];

      selectedElementRef.current = editableElements[firstKey];
    }
  }, [editableElements]);

  useEffect(() => {
    console.log("selectedElement", selectedElement);

    if (selectedElement) {
      let elementProps = {
        text: selectedElement.textContent,
        tagName: selectedElement.tagName.toLowerCase(),
        id: selectedElement.dataset.studio,
      };

      console.log("elementProps", elementProps);
      setProperties(elementProps);
    }
  }, [selectedElement]);

  const handleElementChange = (element) => {
    let elementRef = null;
    elementRef = editableElements[element.name];
    selectedElementRef.current.classList.remove("highlightElement");
    selectedElementRef.current = elementRef;
    setSelectedElement(elementRef);
    elementRef.classList.add("highlightElement");
    elementRef.tagName.toLowerCase();

    // selectedElementRef.current.scrollIntoView({
    //   behavior: "smooth",
    // });
  };

  const onChange = (e) => {
    setProperties({ ...properties, text: e.target.value });
  };

  return (
    <div>
      <div className="fixed top-0 flex items-center w-full p-6 bg-white">
        <div className="font-semibold text-gray-700">nextStudio</div>
        <div className="flex items-center ml-4">
          {editableElements && (
            <ElementsDropdown
              elements={editableElements}
              handleElementChange={handleElementChange}
            />
          )}

          {(properties.tagName.toLowerCase() === "h1" ||
            properties?.tagName.toLowerCase() === "p") && (
            <div className="flex flex-col">
              <label className="text-xs text-gray-600">Text</label>
              <input
                type="text"
                value={properties.text}
                onChange={onChange}
                name="inputField"
                className="w-80 p-3 text-gray-700 border-[1px] border-gray-200 rounded-lg bg-white outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          )}
        </div>
      </div>
      <div className="p-6 bg-gray-100 mt-28">
        <iframe
          ref={pageRef}
          src="http://localhost:3000"
          className="w-full h-screen rounded-md"
        ></iframe>
      </div>
    </div>
  );
};

export default Editor;

const TextInput = ({ selectedElementRef }) => {
  const onChange = (e) => {
    selectedElementRef.current.textContent = e.target.value;
  };

  console.log("value", selectedElementRef.current.textContent);

  return (
    <div>
      <label className="text-xs text-gray-600">Text</label>
      <input
        type="text"
        value={selectedElementRef.current.textContent}
        onChange={onChange}
        className="w-full p-3 text-gray-700 border-[1px] border-gray-200 rounded-lg bg-white outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
    </div>
  );
};
