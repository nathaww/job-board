import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { textareaVariants } from "./variants"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, resize, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ variant, resize }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
