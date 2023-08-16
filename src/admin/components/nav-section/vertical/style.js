// @mui
import { alpha, styled } from "@mui/material/styles";
import { ListItemText, ListItemButton, ListItemIcon } from "@mui/material";
// ----------------------------------------------------------------------

export const ListItemStyle = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "activeRoot" && prop !== "activeSub" && prop !== "subItem" && prop !== "isCollapse",
})(({ isCollapse, activeRoot, activeSub, subItem, theme }) => ({
  ...theme.typography.body2,
  position: "relative",
  height: 48,
  textTransform: "capitalize",
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(1.5),
  marginBottom: theme.spacing(0.5),
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,

  // activeRoot
  ...(activeRoot && {
    ...theme.typography.subtitle2,
    color: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
  }),
  // activeSub
  ...(activeSub && {
    ...theme.typography.subtitle2,
    color: theme.palette.text.primary,
  }),
  // subItem
  ...(subItem && {
    height: 40,
  }),
  ...(isCollapse && {
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
  }),
}));

export const ListItemTextStyle = styled(ListItemText, {
  shouldForwardProp: (prop) => prop !== "isCollapse",
})(({ isCollapse, theme }) => ({
  whiteSpace: "nowrap",
  transition: theme.transitions.create(["width", "opacity"], {
    duration: theme.transitions.duration.shorter,
  }),
  ...(isCollapse && {
    width: 0,
    opacity: 0,
  }),
}));

export const ListItemIconStyle = styled(ListItemIcon, {
  shouldForwardProp: (prop) => prop !== "isCollapse" && prop !== "activeRoot",
})(({ activeRoot, isCollapse, theme }) => ({
  width: 22,
  height: 22,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  ...(activeRoot && {
    color: theme.palette.primary.main,
  }),
  ...(isCollapse && {
    minWidth: "0px",
    width: "100%",
    height: "100%",
  }),
}));
