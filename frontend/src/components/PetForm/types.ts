export interface SubmissionMessageProps {
  status: FormStatus;
  message: string | null;
}

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
  value: string | boolean;
}

export type FormData = { [key: string]: string };

export type FormStatus = "editing" | "success" | "error" | "loading";
