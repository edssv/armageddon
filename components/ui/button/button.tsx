import { cva, type VariantProps } from "class-variance-authority"
import clsx from "clsx"

import styles from "./button.module.css"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

const button = cva(styles.base, {
  variants: {
    variant: {
      primary: styles.primary,
      secondary: styles.secondary,
      tertiary: styles.tertiary,
    },
    size: {
      md: styles.medium,
      lg: styles.large,
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
})

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(button({ variant, size, className }), styles.root)}
      {...props}
    />
  )
}
