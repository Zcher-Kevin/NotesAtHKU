import React, { FC } from "react";

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  rows?: number;
  columns?: number;
  lineThickness?: number;
}

const Grid: FC<GridProps> = ({
  rows = 10,
  columns = 10,
  lineThickness = 1,
  style,
  ...props
}) => {
  return (
    <div {...props} style={{ pointerEvents: "none", zIndex: -10, ...style }}>
      <svg
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        style={{ display: "block", color: "inherit" }}
      >
        {/* Vertical lines */}
        {Array.from({ length: columns + 1 }).map((_, index) => (
          <line
            key={`vertical-${index}`}
            x1={`${(index / columns) * 100}%`}
            y1="0"
            x2={`${(index / columns) * 100}%`}
            y2="100%"
            stroke="currentColor"
            strokeWidth={lineThickness}
          />
        ))}

        {/* Horizontal lines */}
        {Array.from({ length: rows + 1 }).map((_, index) => (
          <line
            key={`horizontal-${index}`}
            x1="0"
            y1={`${(index / rows) * 100}%`}
            x2="100%"
            y2={`${(index / rows) * 100}%`}
            stroke="currentColor"
            strokeWidth={lineThickness}
          />
        ))}
      </svg>
    </div>
  );
};

export default Grid;
