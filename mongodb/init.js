let DB_NAMESPACE = "petsEnquiry";

db.createUser({
  user: "petsEnquiry-user",
  pwd: "petsEnquiry-pass",
  roles: [
    {
      role: "readWrite",
      db: DB_NAMESPACE,
    },
  ],
});

db.auth("petsEnquiry-user", "petsEnquiry-pass");
const appDB = db.getSiblingDB(DB_NAMESPACE);

appDB.petsConfigurationGood.insertMany([
  {
    label: "Dog",
    value: "dog",
    attributes: [
      {
        label: "Size",
        valueName: "dogSize",
        type: "options",
        options: [
          { label: "Small", value: "S" },
          { label: "Medium", value: "M" },
          { label: "Large", value: "L" },
        ],
      },
      {
        label: "Trained?",
        valueName: "isDogTrained",
        type: "boolean",
      },
      {
        label: "Approximate Age",
        valueName: "dogAge",
        type: "options",
        options: [
          { label: "Puppy", value: "B1" },
          { label: "Young", value: "B2" },
          { label: "Adult", value: "B3" },
          { label: "Senior", value: "B4" },
          { label: "Geriatric", value: "B5" },
        ],
      },
    ],
  },
  {
    label: "Parrot",
    value: "parrot",
    attributes: [
      {
        label: "Color",
        valueName: "parrotColor",
        type: "options",
        options: [
          { label: "Red", value: "RED001" },
          { label: "Green", value: "GREEN003" },
          { label: "White", value: "WHITE002" },
        ],
      },
      {
        label: "Can Talk?",
        valueName: "canParrotTalk",
        type: "boolean",
      },
      {
        label: "Needs Cage?",
        valueName: "parrotNeedsCage",
        type: "boolean",
      },
    ],
  },
  {
    label: "Fish",
    value: "fish",
    attributes: [
      {
        label: "Water",
        valueName: "fishWater",
        type: "options",
        options: [
          { label: "Freshwater", value: "fresh" },
          { label: "Saltwater", value: "salty" },
        ],
      },
      {
        label: "Needs Heater?",
        valueName: "fishNeedsHeater",
        type: "boolean",
      },
      {
        label: "Needs Filter?",
        valueName: "fishNeedsFilter",
        type: "boolean",
      },
    ],
  },
]);