export const riskData = {
  admin: true,
  projectId: '',
  company: "Jones",
  nature: "nature 3",
  type: "projectType 4",
  project: "Reacher",
  application: "",
  ai: true, // admin
  dlt: true, // admin
  man: true, // admin
  flavour: "flavour 3", // admin
  riskRange: ["TBC", "Low", "Medium", "High"], // admin
  selected: "Commercial", // project risk
  appendixRef: "reference", // admin
  useTemplate: false, // admin
  exportSpreadsheet: false,
  maxCharacters: 350,
  options: {
    managerial: {
      display: true, // admin
      displayChangeable: false,
      defaultOwner: "JG",
      color: "#E2F0CB",
      maxLength: "", // admin
      maxRisks: 1, // admin
    },
    technical: {
      display: true, // admin
      displayChangeable: false,
      defaultOwner: "DJ",
      color: "#B5EAD7",
      maxLength: "", // admin
      maxRisks: 2, // admin
    },
    commercial: {
      display: true, // admin
      displayChangeable: false,
      defaultOwner: "CG",
      color: "#C7CEEA",
      maxLength: "", // admin
      maxRisks: 3, // admin
    },
    legal: {
      display: false,
      displayChangeable: true,
      defaultOwner: "",
      color: "#DEE2D9",
      maxLength: "", // admin
      maxRisks: 4, // admin
    },
    environmental: {
      display: true,
      displayChangeable: true,
      defaultOwner: "",
      color: "#FCF1D8",
      maxLength: "", // admin
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
    {
      id: 2,
      description: "second risk.",
      probability: 0,
      consequence: 0,
      risk: 0, // auto
      owner: "DJ",
      mitigation: "second mitigation.",
    },
    {
      id: 3,
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      probability: 3,
      consequence: 1,
      risk: 0, // auto
      owner: "DJ",
      mitigation:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      id: 4,
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      probability: 2,
      consequence: 2,
      risk: 0, // auto
      owner: "DJ",
      mitigation:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
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
    {
      id: 6,
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      probability: 3,
      consequence: 3,
      risk: 0, // auto
      owner: "DJ",
      mitigation:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      id: 7,
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      probability: 1,
      consequence: 2,
      risk: 0, // auto
      owner: "DJ",
      mitigation:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      id: 8,
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      probability: 3,
      consequence: 2,
      risk: 0, // auto
      owner: "DJ",
      mitigation:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
  ],
  commercial: [
    // {
    //   id: 9,
    //   description:
    //     "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    //   probability: 2,
    //   consequence: 1,
    //   risk: 0, // auto
    //   owner: "DJ",
    //   mitigation:
    //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    // },
    // {
    //   id: 10,
    //   description:
    //     "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    //   probability: 3,
    //   consequence: 1,
    //   risk: 0, // auto
    //   owner: "DJ",
    //   mitigation:
    //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    // },
    {
      id: 11,
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      probability: 2,
      consequence: 1,
      risk: 0, // auto
      owner: "DJ",
      mitigation:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
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
    {
      id: 14,
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      probability: 3,
      consequence: 1,
      risk: 0, // auto
      owner: "Damien",
      mitigation:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      id: 15,
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      probability: 2,
      consequence: 2,
      risk: 0, // auto
      owner: "Damien",
      mitigation:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      id: 16,
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      probability: 2,
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
    {
      id: 18,
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      probability: 3,
      consequence: 1,
      risk: 0, // auto
      owner: "Damien",
      mitigation:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      id: 19,
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      probability: 2,
      consequence: 2,
      risk: 0, // auto
      owner: "Damien",
      mitigation:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      id: 20,
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      probability: 2,
      consequence: 1,
      risk: 0, // auto
      owner: "Damien",
      mitigation:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
  ],
};
