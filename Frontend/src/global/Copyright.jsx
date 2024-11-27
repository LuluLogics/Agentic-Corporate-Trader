import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';


export default function Copyright(props) {
  

    return (
      <Typography variant="body2" color="text.primary" align="center" {...props}>
        <Link color="inherit" sx={{textDecoration:"none"}} href="https://github.com/neu-mis-info6150-fall-2022/final-project-jams/tree/main">
          made with love by Lulu, Kris, Izzy & Vee
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }