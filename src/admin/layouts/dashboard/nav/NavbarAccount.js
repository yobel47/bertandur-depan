import PropTypes from "prop-types";
// @mui
import { styled } from "@mui/material/styles";
import { Box, Typography, Avatar } from "@mui/material";
import { alpha } from "@mui/material/styles";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
  transition: theme.transitions.create("opacity", {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

NavbarAccount.propTypes = {
  isCollapse: PropTypes.bool,
};

export default function NavbarAccount({ isCollapse, userData }) {
  return (
    <RootStyle
      sx={{
        ...(isCollapse && {
          bgcolor: "transparent",
        }),
      }}
    >
      <Avatar src={userData.IMG_USER} alt={userData.NAME_USER} color={"default"} />

      <Box
        sx={{
          ml: 2,
          transition: (theme) =>
            theme.transitions.create("width", {
              duration: theme.transitions.duration.shorter,
            }),
          ...(isCollapse && {
            ml: 0,
            width: 0,
          }),
        }}
      >
        <Typography variant="subtitle2" noWrap>
          {userData.NAME_USER}
        </Typography>
        <Typography variant="body2" noWrap sx={{ color: "text.secondary" }}>
          Admin
        </Typography>
      </Box>
    </RootStyle>
  );
}
