import React from "react";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import { Button, Typography, Container } from "@mui/material";
import { SomethingWrong } from "../../assets";
import lottie from "lottie-web";
import { useDispatch } from "react-redux";
import { resetError as resetErrorAuth } from "../../redux/slice/authSlice";
import { resetError as resetErrorLand } from "../../redux/slice/landSlice";
import { resetError as resetErrorProduct } from "../../redux/slice/productSlice";
import { resetError as resetErrorTutorial } from "../../redux/slice/tutorialSlice";
import { resetError as resetErrorUser } from "../../redux/slice/usersSlice";

// ----------------------------------------------------------------------

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
}));

// ----------------------------------------------------------------------

export default function ErrorSomethingWrong() {
  const dispatch = useDispatch();

  const animation = React.useRef(null);
  React.useEffect(() => {
    lottie.loadAnimation({
      container: animation.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: SomethingWrong,
    });
    return () => lottie.stop();
  }, []);
  return (
    <>
      <Container>
        <StyledContent sx={{ textAlign: "center", alignItems: "center", padding: 0 }}>
          <Typography variant="h3" paragraph sx={{ mb: 0 }}>
            Maaf, ada yang salah.
          </Typography>

          {/* <Box sx={{ mx: "auto", my: 5 }}> */}
          <div ref={animation} className={"mb-8 w-full"}></div>
          {/* </Box> */}

          <Button
            to="/admin"
            size="large"
            onClick={() => {
              dispatch(resetErrorAuth());
              dispatch(resetErrorLand());
              dispatch(resetErrorProduct());
              dispatch(resetErrorTutorial());
              dispatch(resetErrorUser());
            }}
            variant="contained"
            component={RouterLink}
          >
            Kembali ke dasbor
          </Button>
        </StyledContent>
      </Container>
    </>
  );
}
