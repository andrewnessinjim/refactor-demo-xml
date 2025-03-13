const fs = require("fs");
const path = require("path");
const SaxonJS = require("saxon-js");
const { save } = require("./persistence");
const { send: sendPetEnquiryRequest } = require("../rabbitmq");

// Define file paths
const sourcePath = path.join(__dirname, "xsl", "dummy_source.xml");
const stylesheetPath = path.join(__dirname, "xsl", "petSearchRequest.sef.json");

const sourceXML = fs.readFileSync(sourcePath, "utf-8");
const xsltStylesheet = fs.readFileSync(stylesheetPath, "utf-8");

function uiPayloadToXMLPayload(uiPayload, requestId) {
  const result = SaxonJS.transform({
    stylesheetText: xsltStylesheet,
    sourceText: sourceXML,
    destination: "serialized",
    stylesheetParams: {
      jsonData: JSON.stringify(uiPayload),
      timestamp: new Date().toISOString(),
      requestId,
    },
  });

  return result.principalResult;
}

async function processPetEnquiry(uiPayload) {
  const requestId = await save(uiPayload);
  const xmlPayload = uiPayloadToXMLPayload(uiPayload, requestId);
  sendPetEnquiryRequest(xmlPayload);

  return {
    status: "success",
    requestId,
  };
}

module.exports = {
  processPetEnquiry,
};
