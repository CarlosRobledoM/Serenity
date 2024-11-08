import React, { useContext, useEffect, useState } from 'react';
// import { getSessions } from '../api/firebase/api';
import { userContext } from '../context/authContext';
import { Box, Divider, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AWS from '../middleware';

const LastResume = () => {
  const [item, setItem] = useState();
  const { user } = useContext(userContext);
  const theme = useTheme();
  const navigate = useNavigate();
  const { getSessions } = AWS;

  useEffect(() => {
    obtainItem();
  }, []);

  const obtainItem = async () => {
    try {
      const formData = new FormData();
      const dto_object = new Blob(
        [
          JSON.stringify({
            userID: user.uid,
          }),
        ],
        {
          type: 'application/json',
        },
      );
      formData.append('data', dto_object);
      const response = await getSessions(formData).catch(function (error) {
        console.log(error.toJSON());
      });
      const lastResume = response.reduce((previous, current) => {
        return current.date.seconds > previous.date.seconds
          ? current
          : previous;
      });
      setItem(lastResume);
    } catch (error) {
      console.log(error);
    }
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
            maxHeight: 150,
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
              {item?.resume === 'La IA está analizando aquí...'
                ? item?.resume.toString()
                : 'Tu información ya está lista! Da click aqui para validar las notas de la sesión'}
            </Typography>
          </Box>
        </Box>
      ) : null}
    </>
  );
};

export default LastResume;
