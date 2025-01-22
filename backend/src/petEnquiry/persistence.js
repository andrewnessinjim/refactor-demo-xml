const mongoClient = require("../db");

const petEnquiryRequestsCol = mongoClient
  .db("petsEnquiry")
  .collection("petEnquiryRequests");

async function save(petEnquiryUiPayload) {
  petEnquiryRequestsCol.insertOne(petEnquiryUiPayload);
  return petEnquiryUiPayload._id.toString();
}

module.exports = {
  save,
};
