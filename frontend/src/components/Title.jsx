import React from 'react'
import MUITypography from '@mui/material/Typography'

function Title (props) {
  return (
    <MUITypography
      component="div"
      variant="h4"
      {...props}
      sx={{
        ...props.sx,
      }}
    >
      {props.children}
    </MUITypography>
  );
}

export default Title;
