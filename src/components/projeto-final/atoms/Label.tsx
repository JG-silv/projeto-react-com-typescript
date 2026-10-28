import type { LabelHTMLAttributes } from "react";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export default function Label(props: LabelProps) {
  return <label className={`label ${props.className ?? ""}`} {...props} />;
}
