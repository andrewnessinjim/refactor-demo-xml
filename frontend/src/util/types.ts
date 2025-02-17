export interface SubmitButtonProps {
  status: FormStatus;
}

export interface Option {
  label: string;
  value: string;
}

export interface Attribute {
  label: string;
  type: "options" | "boolean";
  options: Option[];
  valueName: string;
}

export interface Props {
  petConfigData: Attribute[];
  pet: string;
}

export interface Action {
  type: "update";
  key: string;
  value: FormValue;
}

export type FormValue = string | boolean | number;
export type FormData = { [key: string]: FormValue };

export type FormStatus = "editing" | "success" | "error" | "loading";
