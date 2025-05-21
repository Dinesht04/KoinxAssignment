// components/BreadCrumb.tsx
import React from "react";

type BreadCrumbProps = {
  fill: string;
};

const BreadCrumb: React.FC<BreadCrumbProps> = ({ fill }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.86914 9.8932H21.8691V7.8916H1.86914V9.8932ZM9.74729 15.6757H21.8691V13.6741H9.74729V15.6757Z"
        fill={fill}
      />
    </svg>
  );
};

export default BreadCrumb;
