import React, { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

import { Label } from "./label";

function Field({
  label,
  children,
  errorMessage,
  htmlFor,
  className = "",
}: {
  children: ReactNode;
  label: string | ReactNode;
  errorMessage?: string;
  htmlFor: string;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1 " + className)}>
      <Label htmlFor={htmlFor}>{label}</Label>
      <div>{children}</div>
    </div>
  );
}

export default Field;
