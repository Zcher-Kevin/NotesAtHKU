import React from "react";

interface CalloutProps {
  title: string;
  variant: "primary" | "secondary" | "extra";
  children: React.ReactNode;
}

const Callout: React.FC<CalloutProps> = ({
  title = "Title",
  variant = "extra",
  children,
}) => {
  const variantStyles = {
    primary: "bg-green-100 border-green-400 border",
    secondary: "bg-blue-200 border-blue-400 border",
    extra: "bg-gray-200 border-gray-400 border",
  };

  return (
    <div className={`rounded-xl px-4 relative pt-1 ${variantStyles[variant]}`}>
      <div
        className={`${variantStyles[variant]} -top-3 absolute w-fit px-3 left-3 rounded-full`}
      >
        <h2 className="m-0 text-base font-semibold">{title}</h2>
      </div>
      {children}
    </div>
  );
};

export default Callout;
