import SelectOptions from "../Select/SelectOptions";

interface Props {
  attributeOptions: { label: string; value: string }[];
}

function AttributeSelectOptions({ attributeOptions }: Props) {
  const attributeOptionsRequiredFormat = attributeOptions.reduce((acc, cur) => {
    acc[cur.value] = cur.label;
    return acc;
  }, {} as Record<string, string>);
  return <SelectOptions options={attributeOptionsRequiredFormat} />;
}

export default AttributeSelectOptions;
