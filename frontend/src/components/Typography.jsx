import React from 'react'
import MUITypography from '@mui/material/Typography'

function Typography (props) {
  return (
    <MUITypography
      {...props}
      sx={{
        ...props.sx,
      }}
    >
      {props.children}
    </MUITypography>
  );
}

export default Typography;
