interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description: string;
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? <p className="text-sm font-medium text-accent">{eyebrow}</p> : null}
      <h2 className="mt-3 text-3xl font-semibold tracking-normal text-ink sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-muted sm:text-lg">{description}</p>
    </div>
  );
}
