import { cn } from "@/lib";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded px-4 py-2 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-black text-white hover:opacity-90",
        outline: "border border-black text-black hover:bg-gray-100",
        ghost: "text-black hover:bg-gray-100",
      },
      size: {
        sm: "text-sm px-3 py-1.5",
        lg: "text-lg px-6 py-3",
        icon: "p-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
