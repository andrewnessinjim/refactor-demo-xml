import AttributeSelect from "../AttributeSelect";
import BooleanRadioGroup from "../BooleanRadioGroup";
import { Attribute, FormValue } from "./types";

function BooleanAttributeComponent({
  attribute,
  value,
  updateFormData,
}: AttributeComponentProps) {
  return (
    <BooleanRadioGroup
      label={attribute.label}
      value={value as boolean}
      onChange={(isChecked) => updateFormData(attribute.valueName, isChecked)}
    />
  );
}

function OptionsAttributeComponent({
  attribute,
  value,
  updateFormData,
}: AttributeComponentProps) {
  return (
    <AttributeSelect
      label={attribute.label}
      options={attribute.options}
      value={value as string}
      onChange={(value) => updateFormData(attribute.valueName, value)}
    />
  );
}

const ATTRIBUTE_COMPONENTS_MAP = {
  options: OptionsAttributeComponent,
  boolean: BooleanAttributeComponent,
};

interface AttributeComponentProps {
  attribute: Attribute;
  value: FormValue;
  updateFormData: (valueName: string, value: FormValue) => void;
}

export default function AttributeComponent(props: AttributeComponentProps) {
  const RootTag = ATTRIBUTE_COMPONENTS_MAP[props.attribute.type];
  return RootTag ? <RootTag {...props} /> : null;
}
