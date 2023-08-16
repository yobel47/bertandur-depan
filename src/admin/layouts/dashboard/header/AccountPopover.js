import { useState, useEffect } from "react";
// @mui
import { alpha } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { Divider, Stack, MenuItem, Avatar, IconButton, Popover } from "@mui/material";
// mocks_
import { useDispatch } from "react-redux";
import { logout } from "../../../../redux/slice/authSlice";

import jwt from "jwt-decode";

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "Profil",
    icon: "eva:person-fill",
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const [userData, setUserData] = useState([]);
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  useEffect(() => {
    const user = jwt(localStorage.getItem("userToken"));
    setUserData(user);
  }, []);
  const dispatch = useDispatch();

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.1),
            },
          }),
        }}
      >
        <Avatar src={userData.IMG_USER} alt="" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            "& .MuiMenuItem-root": {
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />
        <Link
          to={"/"}
          onClick={() => {
            dispatch(logout());
          }}
        >
          <MenuItem onClick={handleClose} sx={{ m: 1 }}>
            Keluar
          </MenuItem>
        </Link>
      </Popover>
    </>
  );
}
