import React from "react";

import { Helmet } from "react-helmet-async";
// @mui
import { Grid, Container, Typography } from "@mui/material";
// sections
import { AppWidgetSummary } from "../sections/@dashboard/app";
import { useDispatch, useSelector } from "react-redux";
import { loadLandsAdmin, loadProductsAdmin, loadTutorials, loadUsers } from "../../redux/actions";

// ----------------------------------------------------------------------

export default function Dashboard() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadUsers());
    dispatch(loadProductsAdmin());
    dispatch(loadTutorials());
    dispatch(loadLandsAdmin());
  }, []);
  const { userInfo } = useSelector((state) => state.auth);
  const { lands } = useSelector((state) => state.land);
  const { products } = useSelector((state) => state.product);
  const { tutorials } = useSelector((state) => state.tutorial);
  const { users } = useSelector((state) => state.users);
  return (
    <>
      <Helmet>
        <title> Admin Tandur | Dasbor </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Halo, selamat datang {userInfo.NAME_USER}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Jumlah lahan" total={lands.length ? lands.length : 0} icon={"icon-park-solid:mountain"} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Jumlah barang"
              total={products.length ? products.length : 0}
              color="info"
              icon={"mingcute:shopping-bag-2-fill"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Jumlah tutorial"
              total={tutorials.length ? tutorials.length : 0}
              color="warning"
              icon={"material-symbols:video-library-rounded"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Jumlah pengguna" total={users.length ? users.length : 0} color="error" icon={"mdi:person-group"} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
