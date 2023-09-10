import { getVersionData } from "./apihelper";

export const initStudio = async (pageDocument, version) => {
  let getAllDataStudio = pageDocument.querySelectorAll("[data-studio]");

  console.log("versionParam", version);

  let config = await getVersionData(version);

  console.log("data", data);

  if (data) {
    getAllDataStudio.forEach((item) => {
      console.log(item.dataset.studio, obj[item.dataset.studio]);

      // let paramVersion = window.location.href.split("?")[1];

      //get search params version

      if (config?.text) {
        item.textContent = config.text;
      }

      if (config?.style) {
        if (config.style?.color) {
          item.style.color = config.style.color;
        }

        if (config.style?.backgroundColor) {
          item.style.backgroundColor = config.style.backgroundColor;
        }
      }

      if (config?.childSequence) {
        let childSequence = config.childSequence;
        let children = item.children;
        let newChildren = [];
        childSequence.forEach((index) => {
          console.log("sequence", children[index - 1]);
          newChildren.push(children[index - 1]);
        });

        item.innerHTML = "";
        newChildren.forEach((child) => {
          item.appendChild(child);
        });
      }
    });
  }
};

let obj = {
  "vid-1": {
    text: "Free Landing Page Template for Saas Startups",
  },

  "vid-2": {
    style: {
      color: "#979797",
    },
  },

  "vid-6": {
    childSequence: [2, 1, 5, 3, 4],
  },

  "vid-7": {
    style: {
      backgroundColor: "blueviolet",
    },
  },
};

let obj2 = {
  "vid-1": {
    text: "Free Landing Page Template for AI Startups",
  },

  "vid-2": {
    style: {
      color: "#979797",
    },
  },

  "vid-6": {
    childSequence: [1, 3, 5, 2, 4],
  },
};

export const initEditor = (pageDocument, setEditableElements) => {
  let getAllDataStudio = pageDocument.querySelectorAll("[data-studio]");

  let editingElementObj = {};

  getAllDataStudio.forEach((item) => {
    editingElementObj = {
      ...editingElementObj,
      [item.dataset.studio]: item,
    };
  });

  console.log("initEditor", editingElementObj);

  setEditableElements(editingElementObj);
};
