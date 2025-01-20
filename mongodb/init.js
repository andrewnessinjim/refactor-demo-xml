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

appDB.petsConfiguration.insertMany([
  {
    label: "Dog",
    value: "dog",
    attributes: [
      {
        label: "Size",
        value: "dogSize",
        type: "options",
        options: [
          { label: "Small", value: "S" },
          { label: "Medium", value: "M" },
          { label: "Large", value: "L" },
        ],
      },
      {
        label: "Trained",
        value: "isDogTrained",
        type: "boolean",
      },
      {
        label: "Approximate Age",
        value: "dogAge",
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
        value: "parrotColor",
        type: "options",
        options: [
          { label: "Red", value: "RED001" },
          { label: "Green", value: "GREEN003" },
          { label: "White", value: "WHITE002" },
        ],
      },
      {
        label: "Can Talk?",
        value: "canParrotTalk",
        type: "boolean",
      },
      {
        label: "Requires Cage?",
        value: "parrotNeedsCage",
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
        value: "fishWater",
        type: "options",
        options: [
          { label: "Freshwater", value: "fresh" },
          { label: "Saltwater", value: "salty" },
        ],
      },
      {
        label: "Needs Heater?",
        value: "fishNeedsHeater",
        type: "boolean",
      },
      {
        label: "Needs Filter?",
        value: "fishNeedsFilter",
        type: "boolean",
      },
    ],
  },
  {
    label: "Hamster",
    value: "hamster",
    attributes: [
      {
        label: "Color",
        value: "hamsterColor",
        type: "options",
        options: [
          { label: "Black", value: "BLACK006" },
          { label: "Brown", value: "BROWN007" },
          { label: "White", value: "WHITE008" },
          { label: "Mixed", value: "MIXED009" },
        ],
      },
      {
        label: "Needs Heater?",
        value: "fishNeedsHeater",
        type: "boolean",
      },
      {
        label: "Needs Filter?",
        value: "fishNeedsFilter",
        type: "boolean",
      },
    ],
  },
]);
