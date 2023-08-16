// react-hooks/exhaustive-deps
import PropTypes from "prop-types";
import { Link as LinkRouter, useLocation } from "react-router-dom";
// @mui
import { useTheme } from "@mui/material/styles";
import { Box,  Drawer,  Stack } from "@mui/material";

// hooks
import useResponsive from "../../../hooks/useResponsive";
// utils
import { bgBlur } from "../../../utils/cssStyles";

// import NavSection from "../../../components/nav-section";
import { NavSectionVertical } from "../../../components/nav-section";
//
import navConfig from "./config";
import logo from "../../../../assets/images/logo.svg";

import React, { useState, useEffect } from "react";
import jwt from "jwt-decode";
import CollapseButton from "./CollapseButton";
import useCollapseDrawer from "../../../hooks/useCollapseDrawer";
import NavbarAccount from "./NavbarAccount";
import Scrollbar from "../../../components/Scrollbar";

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;
const NAV_COLLAPSE_WIDTH = 88;

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();

  const theme = useTheme();

  const isDesktop = useResponsive("up", "lg");
  const [userData, setUserData] = useState([]);

  const { isCollapse, collapseClick, collapseHover, onToggleCollapse, onHoverEnter, onHoverLeave } = useCollapseDrawer();

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

  useEffect(() => {
    const user = jwt(localStorage.getItem("userToken"));
    setUserData(user);
  }, []);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": { height: 1, display: "flex", flexDirection: "column" },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          pt: 3,
          pb: 2,
          px: 2.5,
          flexShrink: 0,
          ...(isCollapse && { alignItems: "center" }),
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <div className="inline-flex">
            <LinkRouter to="/admin">
              <button className="flex">
                <img className="w-[35px] h-[35px]" fill="black" src={logo} alt="" />
                <Box
                  sx={{
                    transition: (theme) =>
                      theme.transitions.create("width", {
                        duration: theme.transitions.duration.shorter,
                      }),
                    display: "flex",
                    ...(isCollapse && {
                      ml: 0,
                      width: 0,
                      display: "none",
                    }),
                  }}
                >
                  <span className="text-[#7CBD1E] font-bold text-sm w-[10%] text-left pl-2 font-poppins">TANDUR admin</span>
                </Box>
              </button>
            </LinkRouter>
          </div>

          {isDesktop && !isCollapse && <CollapseButton onToggleCollapse={onToggleCollapse} collapseClick={collapseClick} />}
        </Stack>

        <NavbarAccount isCollapse={isCollapse} userData={userData} />
      </Stack>

      <NavSectionVertical className={"pb-8"} navConfig={navConfig} isCollapse={isCollapse} />

      <Box sx={{ flexGrow: 1 }} className="h-[20px]" />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: {
          lg: isCollapse ? NAV_COLLAPSE_WIDTH : NAV_WIDTH,
        },
        ...(collapseClick && {
          position: "absolute",
        }),
      }}
      className="font-poppins"
    >
      {!isDesktop && (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{ sx: { width: NAV_WIDTH } }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              borderRightStyle: "dashed",
              bgcolor: "background.default",
              transition: (theme) =>
                theme.transitions.create("width", {
                  duration: theme.transitions.duration.standard,
                }),
              ...(isCollapse && {
                width: NAV_COLLAPSE_WIDTH,
              }),
              ...(collapseHover && {
                ...bgBlur({ color: theme.palette.background.default }),
                boxShadow: (theme) => theme.customShadows.z24,
              }),
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
