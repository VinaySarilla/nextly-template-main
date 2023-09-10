import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

export default function ElementsDropdown({ elements, handleElementChange }) {
  const [selected, setSelected] = useState({
    name: "Select",
    tag: "element",
  });
  const [elementList, setElementList] = useState(null);

  useEffect(() => {
    let list = [];

    for (const key in elements) {
      list.push({
        name: key,
        tag: elements[key].tagName.toLowerCase(),
      });
    }

    console.log("list", list);
    setElementList(list);
    setSelected(list[0]);
  }, []);

  const handleChange = (element) => {
    setSelected(element);
    handleElementChange(element);
  };
  if (!elementList) return null;

  return (
    <div className="flex flex-col items-start mx-6">
      <label className="text-xs text-gray-600">Elements</label>
      <div className="w-72">
        <Listbox value={selected} onChange={handleChange}>
          <div className="relative mt-1">
            <Listbox.Button
              className="relative w-full p-3  text-left bg-white border-[1px] 
            border-gray-200 rounded-lg cursor-default focus:outline-none focus-visible:border-indigo-500 
            focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 
            focus-visible:ring-offset-orange-300 sm:text-sm flex justify-between"
            >
              <span className="block text-gray-700 truncate">
                {selected.name}
              </span>
              <ElementTags element={selected} />
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {elementList.map((element, personIdx) => (
                  <Listbox.Option
                    key={personIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none p-3 px-4 ${
                        active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                      }`
                    }
                    value={element}
                  >
                    {({ selected }) => (
                      <div className="flex items-center justify-between">
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {element.name}
                        </span>
                        <ElementTags element={element} />
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </div>
  );
}

const ElementTags = ({ element }) => {
  return (
    <span
      className={`w-10 py-1 text-xs text-center rounded-full right-6  border-[1px] font-medium ${
        element.tag === "p" && "bg-amber-50 text-amber-600 border-amber-500"
      }
    ${element.tag === "h1" && "bg-violet-50 text-violet-600 border-violet-500"}
    ${element.tag === "img" && "bg-red-50 text-red-600 border-red-500"}
    ${
      element.tag === "div" &&
      "bg-fuchsia-50 text-fuchsia-600 border-fuchsia-500"
    }
    ${element.tag === "a" && "bg-blue-50 text-blue-600 border-blue-500"}
    `}
    >
      {element.tag}
    </span>
  );
};
