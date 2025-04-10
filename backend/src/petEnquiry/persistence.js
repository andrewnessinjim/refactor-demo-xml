const mongoClient = require("../db");

const petEnquiryRequestsCol = mongoClient
  .db("petsEnquiry")
  .collection("petEnquiryRequestsGood");

async function save(petEnquiryUiPayload) {
  const result = await petEnquiryRequestsCol.insertOne({
    ...petEnquiryUiPayload,
  });
  return result.insertedId.toString();
}

module.exports = {
  save,
};
