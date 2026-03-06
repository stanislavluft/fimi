import { type ComponentProps } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';

const buttonVariants = cva(
  'focus-visible:ring-ring focus-visible:ring-offset-background inline-flex min-h-8 items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:opacity-70',
  {
    variants: {
      variant: {
        primary: 'bg-primary/95 text-primary-foreground hover:bg-primary',
        secondary: 'bg-secondary/85 text-secondary-foreground hover:bg-secondary',
        destructive:
          'text-destructive bg-destructive/10 hover:bg-destructive/15 dark:bg-destructive/15 dark:hover:bg-destructive/20',
        ghost: 'text-ghost-foreground hover:bg-ghost',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

//use ref without forwardRef from React v19
interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {}

const Button = ({ className, variant, type = 'button', ref, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant }), className)}
      ref={ref}
      type={type}
      {...props}
    />
  );
};

Button.displayName = 'Button';

export default Button;
