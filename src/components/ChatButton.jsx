import * as React from "react";
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";

const StyledSpeedDial = styled(SpeedDial)(() => ({
  position: "absolute",
  top: -4,
  right: 12,
}));

export default function PlaygroundSpeedDial({ table }) {
  const actions = table;
  return (
    <StyledSpeedDial
      className='chatButtonblock'
      ariaLabel='SpeedDial playground example'
      hidden={false}
      icon={<SpeedDialIcon />}
      direction='left'>
      {actions.map((action) => (
        <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} onClick={action.onClick} />
      ))}
    </StyledSpeedDial>
  );
}
