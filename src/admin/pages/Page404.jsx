import { Helmet } from "react-helmet-async";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import { Button, Typography, Container, Box } from "@mui/material";

// ----------------------------------------------------------------------

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
}));

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <>
      <Helmet>
        <title> Tandur Admin | Halaman tidak ditemukan </title>
      </Helmet>

      <Container>
        <StyledContent sx={{ textAlign: "center", alignItems: "center", padding: 0 }}>
          <Typography variant="h3" paragraph sx={{ mb: 0 }}>
            Maaf, halaman tidak ditemukan.
          </Typography>

          <Box component="img" src="/assets/illustrations/illustration_404.svg" sx={{ height: 260, mx: "auto", my: 5 }} />

          <Button to="/admin" size="large" variant="contained" component={RouterLink}>
            Kembali ke dasbor
          </Button>
        </StyledContent>
      </Container>
    </>
  );
}
