import type { InputHTMLAttributes } from "react";
import Input from "../atoms/Input";
import Label from "../atoms/Label";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function FormField({ id, label, error, ...inputProps }: FormFieldProps) {
  const fieldId = id ?? inputProps.name;
  return (
    <div className="form-field">
      <Label htmlFor={fieldId}>{label}</Label>
      <Input id={fieldId} aria-invalid={Boolean(error)} aria-describedby={error ? `${fieldId}-error` : undefined} {...inputProps} />
      {error && <span className="field-error" id={`${fieldId}-error`}>{error}</span>}
    </div>
  );
}
