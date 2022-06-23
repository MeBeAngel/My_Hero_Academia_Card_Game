import React from "react";

export default function Arrow() {
  const arrow = (
    <svg
      baseProfile="tiny"
      height="24px"
      id="Layer_1"
      version="1.2"
      viewBox="0 0 24 24"
      width="24px"
      xml:space="preserve"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <path d="M10.586,6.586c-0.781,0.779-0.781,2.047,0,2.828L12.172,11H4.928c-1.104,0-2,0.895-2,2c0,1.104,0.896,2,2,2h7.244  l-1.586,1.586c-0.781,0.779-0.781,2.047,0,2.828C10.977,19.805,11.488,20,12,20s1.023-0.195,1.414-0.586L19.828,13l-6.414-6.414  C12.633,5.805,11.367,5.805,10.586,6.586z" />
    </svg>
  );
  return <div>{arrow}</div>;
}
