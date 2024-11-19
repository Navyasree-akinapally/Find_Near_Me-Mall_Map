import React from "react";
import { Button } from "react-bootstrap";
import ReusableButton from "../buttons/Button";

type Button = {
  label: string;
  handler: () => void;
};

type Props = {
  buttons: {
    label: string;
    handler?: () => void;
    component?: React.ReactNode;
  }[];
};

const CustomActions: React.FC<Props> = ({ buttons }) => {
  return (
    <div className="d-flex align-items-center">
      {buttons.map((button, index) => (
        <div key={index} className="d-flex ms-2">
          {button.component ? (
            button.component
          ) : (
            <ReusableButton onClick={button.handler}>{button.label}</ReusableButton>
          )}
        </div>
      ))}
    </div>
  );
};

export default CustomActions;
