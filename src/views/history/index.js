import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Container,
  Divider,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../context/authContext';
// import { getSessions } from '../../api/firebase/api';
import AWS from '../../middleware';

export default function History() {
  const theme = useTheme();
  const [items, setItems] = useState();
  const { user } = useContext(userContext);
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
      setItems(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container sx={{ pt: 4 }}>
        <Grid container spacing={4}>
          {items ? (
            items.map((item) => (
              <Grid item key={item?.name} xs={12} sm={6}>
                <Box
                  sx={{
                    borderRadius: 5,
                    boxShadow: `0px 0px 10px ${theme.palette.primary.main}`,
                    p: theme.spacing(1, 4, 2),
                    cursor: 'pointer',
                  }}
                  onClick={() =>
                    navigate('/resume', { state: { itemData: item } })
                  }
                >
                  <Typography
                    align="center"
                    sx={{ color: theme.palette.primary.main }}
                    variant="h6"
                  >
                    {item?.name}
                  </Typography>
                  <Divider sx={{ background: theme.palette.secondary.main }} />
                  <Box>
                    <Typography variant="body2" mx={2} align="justify">
                      <td
                        dangerouslySetInnerHTML={{
                          __html: item?.resume.substring(0, 200),
                        }}
                      />
                      {/* {item?.resume?.substring(0, 200) + '...'} */}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))
          ) : (
            <></>
          )}
        </Grid>
        <></>
      </Container>
    </>
  );
}
