import PropTypes from "prop-types";
// @mui
import {  styled } from "@mui/material/styles";
import { Box, Stack, AppBar, Toolbar, IconButton } from "@mui/material";
// utils
import { bgBlur } from "../../../utils/cssStyles";
// components
import Iconify from "../../../components/iconify";
//
import AccountPopover from "./AccountPopover";
// import NotificationsPopover from "./NotificationsPopover";
import useOffSetTop from "../../../hooks/useOffSetTop";
import useResponsive from "../../../hooks/useResponsive";

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const NAV_COLLAPSE_WIDTH = 88;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const DASHBOARD_DESKTOP_OFFSET_HEIGHT = 92 - 32;

const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "isCollapse" && prop !== "isOffset" && prop !== "verticalLayout",
})(({ isCollapse, isOffset, verticalLayout, theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  width: "100%",
  boxShadow: "none",
  height: HEADER_MOBILE,
  zIndex: theme.zIndex.appBar + 1,
  transition: theme.transitions.create(["width", "height"], {
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up("lg")]: {
    height: HEADER_DESKTOP,
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
    ...(isCollapse && {
      width: `calc(100% - ${NAV_COLLAPSE_WIDTH}px)`,
    }),
    ...(isOffset && {
      height: DASHBOARD_DESKTOP_OFFSET_HEIGHT,
    }),
    ...(verticalLayout && {
      height: DASHBOARD_DESKTOP_OFFSET_HEIGHT,
      backgroundColor: theme.palette.background.default,
    }),
  },
}));

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav, isCollapse = false, verticalLayout = false }) {
  const isOffset = useOffSetTop(HEADER_DESKTOP);
  const isDesktop = useResponsive("up", "lg");

  return (
    <RootStyle isCollapse={isCollapse} isOffset={isOffset} verticalLayout={verticalLayout}>
      <Toolbar
        sx={{
          justifyContent: "end",
          minHeight: "100% !important",
          px: { lg: 5 },
        }}
      >
        {!isDesktop && (
          <IconButton onClick={onOpenNav} sx={{ mr: 1, color: "text.primary" }}>
            <Iconify icon="eva:menu-2-fill" />
          </IconButton>
        )}

        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          {/* <NotificationsPopover /> */}
          <AccountPopover />
        </Stack>
      </Toolbar>
    </RootStyle>
  );
}
