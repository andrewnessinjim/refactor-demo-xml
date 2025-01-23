const fs = require("fs");
const path = require("path");
const { save } = require("./persistence");
const { send: sendPetEnquiryRequest } = require("../rabbitmq");


function uiPayloadToXMLPayload(uiPayload, requestId) {

  const sourcePath = path.join(__dirname, "xml", `${uiPayload.pet}.xml`);
  const sourceXML = fs.readFileSync(sourcePath, "utf-8");
  let xmlPayload = sourceXML.replace("#pet#", uiPayload.pet);
  xmlPayload = xmlPayload.replace("#timestamp#", new Date().toISOString());
  xmlPayload = xmlPayload.replace("#requestId#", requestId);

  if (uiPayload.pet === "dog") {
    xmlPayload = xmlPayload.replace("#dogSize#", uiPayload.dogSize);
    xmlPayload = xmlPayload.replace("#isDogTrained#", uiPayload.isDogTrained);
    xmlPayload = xmlPayload.replace("#dogAge#", uiPayload.dogAge);
    return xmlPayload;

  } else if (uiPayload.pet === "fish") {
    xmlPayload = xmlPayload.replace("#fishWater#", uiPayload.fishWater);
    xmlPayload = xmlPayload.replace(
      "#fishNeedsHeater#",
      uiPayload.fishNeedsHeater
    );
    xmlPayload = xmlPayload.replace(
      "#fishNeedsFilter#",
      uiPayload.fishNeedsFilter
    );
    return xmlPayload;

  } else if (uiPayload.pet === "parrot") {
    xmlPayload = xmlPayload.replace("#parrotColor#", uiPayload.parrotColor);
    xmlPayload = xmlPayload.replace("#canParrotTalk#", uiPayload.canParrotTalk);
    xmlPayload = xmlPayload.replace(
      "#parrotNeedsCage#",
      uiPayload.parrotNeedsCage
    );
    return xmlPayload;
  }
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
