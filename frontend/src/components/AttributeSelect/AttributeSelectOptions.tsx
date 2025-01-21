import SelectOptions from "../Select/SelectOptions";

function AttributeSelectOptions({ attributeOptions }) {
  const attributeOptionsRequiredFormat = attributeOptions.reduce((acc, cur) => {
    acc[cur.value] = cur.label;
    return acc;
  }, {});
  return <SelectOptions options={attributeOptionsRequiredFormat} />;
}

export default AttributeSelectOptions;
