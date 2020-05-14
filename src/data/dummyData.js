export const riskData = {
  // project info reducer
  projectId: '',
  
  email: '',
  admin: true,
  company: "Jones",
  nature: "nature 3",
  type: "projectType 4",
  project: "Reacher",
  application: "",
  selected: "commercial", // project risk

  ai: true, // admin
  dlt: false, // admin
  man: true, // admin
  useTemplate: false, // admin
  exportSpreadsheet: false, // admin
  flavour: "flavour 3", // admin
  appendixRef: "reference", // admin
  maxCharacters: 350, // admin
  riskRange: ["TBC", "Low", "Medium", "High"], // admin

  options: {
    managerial: {
      display: true, // admin
      displayChangeable: false,
      defaultOwner: "JG",
      color: "#E2F0CB",
      maxLength: 100, // admin
      maxRisks: 1, // admin
    },
    technical: {
      display: true, // admin
      displayChangeable: false,
      defaultOwner: "DJ",
      color: "#B5EAD7",
      maxLength: 100, // admin
      maxRisks: 2, // admin
    },
    commercial: {
      display: true, // admin
      displayChangeable: false,
      defaultOwner: "CG",
      color: "#C7CEEA",
      maxLength: 100, // admin
      maxRisks: 3, // admin
    },
    legal: {
      display: false,
      displayChangeable: true,
      defaultOwner: "",
      color: "#DEE2D9",
      maxLength: 100, // admin
      maxRisks: 4, // admin
    },
    environmental: {
      display: true,
      displayChangeable: true,
      defaultOwner: "",
      color: "#FCF1D8",
      maxLength: 100, // admin
      maxRisks: 5, // admin
    },
  },

  managerial: [
    {
      id: 1,
      description: "first risk.",
      probability: 1,
      consequence: 2,
      risk: 0, // auto
      owner: "TBC",
      mitigation: "first mitigation.",
    },
  ],
  technical: [
    {
      id: 5,
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      probability: 2,
      consequence: 1,
      risk: 0, // auto
      owner: "DJ",
      mitigation:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
  ],
  commercial: [
    {
      id: 12,
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      probability: 3,
      consequence: 3,
      risk: 0, // auto
      owner: "Damien",
      mitigation:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
  ],
  legal: [
    {
      id: 13,
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      probability: 3,
      consequence: 1,
      risk: 0, // auto
      owner: "Damien",
      mitigation:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
  ],
  environmental: [
    {
      id: 17,
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      probability: 3,
      consequence: 1,
      risk: 0, // auto
      owner: "Damien",
      mitigation:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
  ],
};

export const newClient = {
  // project info reducer
  admin: false,

  projectId: '',
  company: "",
  nature: "",
  type: "",
  project: "",
  application: "",
  selected: "", // project risk

  ai: null, // admin
  dlt: null, // admin
  man: null, // admin
  useTemplate: null, // admin
  exportSpreadsheet: null, // admin
  flavour: "", // admin
  appendixRef: "", // admin
  maxCharacters: 350, // admin
  riskRange: ["TBC", "Low", "Medium", "High"], // admin

  options: {
    managerial: {
      display: true, // admin
      displayChangeable: false,
      defaultOwner: "",
      color: "#E2F0CB",
      maxLength: 100, // admin
      maxRisks: 1, // admin
    },
    technical: {
      display: true, // admin
      displayChangeable: false,
      defaultOwner: "",
      color: "#B5EAD7",
      maxLength: 100, // admin
      maxRisks: 2, // admin
    },
    commercial: {
      display: true, // admin
      displayChangeable: false,
      defaultOwner: "",
      color: "#C7CEEA",
      maxLength: 100, // admin
      maxRisks: 3, // admin
    },
    legal: {
      display: true,
      displayChangeable: true,
      defaultOwner: "",
      color: "#DEE2D9",
      maxLength: 100, // admin
      maxRisks: 4, // admin
    },
    environmental: {
      display: true,
      displayChangeable: true,
      defaultOwner: "",
      color: "#FCF1D8",
      maxLength: 100, // admin
      maxRisks: 5, // admin
    },
  },

  managerial: [],
  technical: [],
  commercial: [],
  legal: [],
  environmental: [],
};

