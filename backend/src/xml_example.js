const fs = require("fs");
const path = require("path");
const SaxonJS = require("saxon-js");

// Define file paths
const sourcePath = path.join("files", "source.xml");
const stylesheetPath = path.join("files", "stylesheet.sef.json");
const outputPath = "./output.xml";

// Parameters for the transformation
const jsonData = {
  pet: "dog",
  searchCriteria: {
    dogSize: "S",
    isDogTrained: true,
    dogAge: "B4",
  },
};

// Read the source XML and stylesheet
const sourceXML = fs.readFileSync(sourcePath, "utf-8");
const xsltStylesheet = fs.readFileSync(stylesheetPath, "utf-8");

// Compile and execute the transformation
try {
  const result = SaxonJS.transform({
    stylesheetText: xsltStylesheet,
    sourceText: sourceXML,
    destination: "serialized",
    stylesheetParams: {
      jsonData: JSON.stringify(jsonData),
    },
  });

  // Write the output to the specified file
  fs.writeFileSync(outputPath, result.principalResult);
  console.log("Transformation complete. Output written to:", outputPath);
} catch (error) {
  console.error("Error during transformation:", error);
}