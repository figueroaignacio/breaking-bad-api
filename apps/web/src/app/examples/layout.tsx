import { ExamplesNav } from '@/components/examples-nav';

export default function ExamplesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <ExamplesNav />
      {children}
    </div>
  );
}
