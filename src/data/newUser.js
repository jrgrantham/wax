export const user = {
  email: "",
  password: "",
  admin: false,
  company: "", // leave empty, this is for checking state
  nature: "",
  type: "General",
  project: "",
  application: "",
  selected: "managerial",

  ai: false,
  dlt: false,
  man: false,
  useTemplates: false,
  fontSize: 8,
  exportSpreadsheet: false,
  flavour: "",
  appendixRef: "Q8",
  maxCharacters: 300,

  manDisplay: true,
  manDisplayChangeable: false,
  manDefaultOwner: "",
  manColor: "#659AD2",
  manMaxRisks: 4,

  tecDisplay: true,
  tecDisplayChangeable: false,
  tecDefaultOwner: "",
  tecColor: "#B3C78F",
  tecMaxRisks: 8,

  comDisplay: true,
  comDisplayChangeable: false,
  comDefaultOwner: "",
  comColor: "#C28B9A",
  comMaxRisks: 8,

  legDisplay: true,
  legDisplayChangeable: true,
  legDefaultOwner: "",
  legColor: "#9697CB",
  legMaxRisks: 2,

  envDisplay: true,
  envDisplayChangeable: true,
  envDefaultOwner: "",
  envColor: "#B6DEC2",
  envMaxRisks: 2,
};

export const risks = {
  entries: [],
};
