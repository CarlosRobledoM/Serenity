import React, { useContext, useEffect, useState } from 'react';
import { getSessions } from '../api/firebase/api';
import { userContext } from '../context/authContext';
import { Box, Divider, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LastResume = () => {
  const [item, setItem] = useState();
  const { user } = useContext(userContext);
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    obtainItem();
  }, []);

  const obtainItem = async () => {
    const response = await getSessions(user.uid);
    const lastResume = response.reduce((previous, current) => {
      return current.date.seconds > previous.date.seconds ? current : previous;
    });
    setItem(lastResume);
  };

  return (
    <>
      {item ? (
        <Box
          sx={{
            '& > :not(style)': { m: 1 },
            position: 'absolute',
            bottom: 16,
            left: 16,
            height: 150,
            width: 400,
            borderRadius: 5,
            boxShadow: `0px 0px 10px ${theme.palette.primary.main}`,
            cursor: 'pointer',
          }}
          onClick={() => navigate('/resume', { state: { itemData: item } })}
        >
          <Typography
            align="center"
            sx={{ color: theme.palette.primary.main }}
            variant="h6"
          >
            Ultimo resumen
          </Typography>
          <Divider sx={{ background: theme.palette.secondary.main }} />
          <Box>
            <Typography variant="body2" mx={2} align="justify">
              {item?.resume?.substring(0, 200) + '...'}
            </Typography>
          </Box>
        </Box>
      ) : null}
    </>
  );
};

export default LastResume;
