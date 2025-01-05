import LucideIcon from "../Icon";

interface IconProps {
  name: string;
  color?: string;
  size?: number | string;
}

export default function Icon({ name, color, size = 20 }: IconProps) {
  return (
    // @ts-expect-error Class name exists
    <LucideIcon name={name} color={color} size={size} className="inline" />
  );
}
