const petsConfiguration = {
  _id: ObjectId(),
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
};

const uiRequest = {
  pet: "dog",
  searchCriteria: {
    dogSize: "S",
    isDogTrained: true,
    dogAge: "B4",
  },
};

const outboundXmlRequest =
  /*xml*/
  `
<petSearchRequest>
  <metadata>
    <requestTimestamp>#timestamp#</requestTimestamp>
    <correlationId>#requestId#</correlationId>
  </metadata>
  <data>
    <pet>dog</pet>
    <searchCriteria>
          <criterion>
            <key>size</key>
            <value>S</value>
          </criterion>
          <criterion>
            <key>isTrained</key>
            <value>true</value>
          </criterion>
          <criterion>
            <key>age</key>
            <value>B4</value>
          </criterion>
    </searchCriteria>
  </data>
</petSearchRequest>
`;
