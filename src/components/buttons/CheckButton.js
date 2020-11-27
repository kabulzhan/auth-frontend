import React, { useState } from "react";
import Button from "@material-ui/core/Button";

export default function CheckButton(props) {
  const [disabled, setDisabled] = useState(false);
  const handleSubmit = () => {
    setDisabled(true);
    props.handleSubmit(props.id);
  };
  return (
    <Button
      variant="outlined"
      color={props.color}
      size="small"
      disabled={disabled}
      onClick={handleSubmit}
    >
      {disabled ? props.sent : props.children}
    </Button>
  );
}
