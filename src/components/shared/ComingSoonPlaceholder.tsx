import { Construction } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type ComingSoonPlaceholderProps = {
  title: string;
  icon?: LucideIcon;
  description?: string;
};

function ComingSoonPlaceholder({
  title,
  icon: Icon = Construction,
  description = 'This feature is coming soon.',
}: ComingSoonPlaceholderProps) {
  return (
    <section className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="flex flex-col items-center gap-3 text-center">
        <Icon className="text-muted-foreground/70 size-12" strokeWidth={2} />
        <h1 className="text-muted-foreground/95 text-3xl font-medium tracking-tight">{title}</h1>
        <p className="text-muted-foreground/85 text-sm">{description}</p>
      </div>
    </section>
  );
}

export default ComingSoonPlaceholder;
