export const user = {
  // project info reducer
  projectId: "",

  email: "",
  admin: true,
  company: "Jones",
  nature: "nature 3",
  type: "projectType 4",
  project: "Reacher",
  application: "",
  selected: "managerial", // project risk

  ai: true, // admin
  dlt: false, // admin
  man: true, // admin
  useTemplates: true, // admin
  exportSpreadsheet: false, // admin
  flavour: "flavour 3", // admin
  appendixRef: "reference", // admin
  maxCharacters: 350, // admin

  manDisplay: true, // admin
  manDisplayChangeable: false,
  manDefaultOwner: "JG",
  manColor: "orange",
  manMaxLength: 100, // admin
  manMaxRisks: 1, // admin

  tecDisplay: true, // admin
  tecDisplayChangeable: false,
  tecDefaultOwner: "JG",
  tecColor: "red",
  tecMaxLength: 100, // admin
  tecMaxRisks: 1, // admin

  comDisplay: true, // admin
  comDisplayChangeable: false,
  comDefaultOwner: "JG",
  comColor: "green",
  comMaxLength: 100, // admin
  comMaxRisks: 1, // admin

  legDisplay: true, // admin
  legDisplayChangeable: true,
  legDefaultOwner: "JG",
  legColor: "blue",
  legMaxLength: 100, // admin
  legMaxRisks: 1, // admin

  envDisplay: true, // admin
  envDisplayChangeable: true,
  envDefaultOwner: "JG",
  envColor: "yellow",
  envMaxLength: 100, // admin
  envMaxRisks: 1, // admin
};

export const risks = {entries: [
  // {
  //   id: 1,
  //   type: "commercial",
  //   description: "first risk.",
  //   probability: 1,
  //   consequence: 2,
  //   risk: 0, // auto
  //   owner: "TBC",
  //   mitigation: "first mitigation.",
  // },
  // {
  //   id: 2,
  //   type: "commercial",
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
  //   id: 3,
  //   type: "managerial",
  //   description:
  //     "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  //   probability: 3,
  //   consequence: 3,
  //   risk: 0, // auto
  //   owner: "Damien",
  //   mitigation:
  //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  // },
  // {
  //   id: 4,
  //   type: "managerial",
  //   description:
  //     "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  //   probability: 3,
  //   consequence: 1,
  //   risk: 0, // auto
  //   owner: "Damien",
  //   mitigation:
  //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  // },
  // {
  //   id: 5,
  //   type: "managerial",
  //   description:
  //     "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  //   probability: 3,
  //   consequence: 1,
  //   risk: 0, // auto
  //   owner: "Damien",
  //   mitigation:
  //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  // },
]};

export const newClient = {
  // project info reducer
  admin: false,

  projectId: "",
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

  manDisplay: true, // admin
  manDisplayChangeable: false,
  manDefaultOwner: "JG",
  manColor: "#E2F0CB",
  manMaxLength: 100, // admin
  manMaxRisks: 1, // admin

  tecDisplay: true, // admin
  tecDisplayChangeable: false,
  tecDefaultOwner: "JG",
  tecColor: "#E2F0CB",
  tecMaxLength: 100, // admin
  tecMaxRisks: 1, // admin

  comDisplay: true, // admin
  comDisplayChangeable: false,
  comDefaultOwner: "JG",
  comColor: "#E2F0CB",
  comMaxLength: 100, // admin
  comMaxRisks: 1, // admin

  legDisplay: true, // admin
  legDisplayChangeable: false,
  legDefaultOwner: "JG",
  legColor: "#E2F0CB",
  legMaxLength: 100, // admin
  legMaxRisks: 1, // admin

  envDisplay: true, // admin
  envDisplayChangeable: false,
  envDefaultOwner: "JG",
  envColor: "#E2F0CB",
  envMaxLength: 100, // admin
  envMaxRisks: 1, // admin
};
