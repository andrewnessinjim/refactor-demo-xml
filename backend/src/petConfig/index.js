const mongoClient = require("../db");

const petsConfigCol = mongoClient
  .db("petsEnquiry")
  .collection("petsConfigurationBad");

async function getPetListForUI() {
  const options = {
    projection: { _id: 0, value: 1, label: 1 },
  };

  const petList = await petsConfigCol.find({}, options).toArray();
  const petListForUI = {};
  petList.forEach((doc) => {
    petListForUI[doc.value] = doc.label;
  });
  return petListForUI;
}

async function getConfigForPet(pet) {
  const options = {
    projection: { attributes: 1, _id: 0 },
  };

  return (await petsConfigCol.findOne({ value: pet }, options)).attributes;
}

module.exports = {
  getPetListForUI,
  getConfigForPet,
};
