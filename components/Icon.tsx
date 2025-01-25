import { icons, LucideIcon } from "lucide-react";

interface IconProps {
  name: string;
  color?: string;
  size?: number | string;
  strokeWidth?: number;
}

const Icon: React.FC<IconProps> = ({
  name,
  color,
  size,
  strokeWidth,
  ...props
}) => {
  const LucideIcon = icons[name as keyof typeof icons] as LucideIcon;

  if (!LucideIcon) {
    return null;
  }

  return (
    <LucideIcon
      color={color}
      size={size}
      strokeWidth={strokeWidth}
      {...props}
    />
  );
};

export default Icon;
