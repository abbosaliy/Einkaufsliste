import { useTheme } from 'next-themes';
import { Toaster as Sonner, ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      style={
        {
          '--normal-bg': '#dc2626',
          '--normal-text': '#ffffff',
          '--normal-border': '#dc2626',
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
