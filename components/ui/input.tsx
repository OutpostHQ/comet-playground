import React from "react";

import { cn } from "@/lib/utils/cn";

import Text from "./text";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  fullwidth?: boolean;
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, errorMessage, fullwidth = false, ...props }, ref) => {
    return (
      <>
        <input
          type={type}
          className={cn(
            `flex h-10 rounded-lg border border-border-default bg-surface-default px-3 py-2 text-sm outline-none ring-surface-primary  ring-offset-surface-default file:border-0 file:bg-surface-default file:px-3 file:text-sm file:font-medium placeholder:text-foreground-disabled focus:outline-none focus:ring-2 focus-visible:outline-none active:outline-none active:ring-2 disabled:cursor-not-allowed disabled:opacity-70  ${
              fullwidth ? "w-full" : "w-full  sm:w-[80%] lg:w-[70%]"
            }  `,
            className
          )}
          ref={ref}
          {...props}
        />
        {errorMessage?.trim() && (
          <Text
            as="span"
            variant="caption"
            className="text-foreground-critical"
          >
            {errorMessage}
          </Text>
        )}
      </>
    );
  }
);
Input.displayName = "Input";

export { Input };
