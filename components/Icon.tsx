import { icons, LucideIcon } from "lucide-react";

interface IconProps {
  name: string;
  color?: string;
  size?: number | string;
}

const Icon: React.FC<IconProps> = ({ name, color, size, ...props }) => {
  const LucideIcon = icons[name as keyof typeof icons] as LucideIcon;

  if (!LucideIcon) {
    return null;
  }

  return <LucideIcon color={color} size={size} {...props} />;
};

export default Icon;
