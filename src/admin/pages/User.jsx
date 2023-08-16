import React from "react";
import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
import { useState } from "react";
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Button,
  Popover,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from "@mui/material";
// components
import Label from "../components/label";
import Iconify from "../components/iconify";
// sections
import { UserListHead, UserListToolbar } from "../sections/@dashboard/user";

import { useSelector, useDispatch } from "react-redux";
import { resetError, resetSuccess } from "../../redux/slice/usersSlice";
import { deleteUsers, loadUsers } from "../../redux/actions/usersAction";
import { useNavigate } from "react-router-dom";
import { AlertModal, DeleteModal, LoadingModal, SuccessModal } from "../../components";
import ErrorSomethingWrong from "./Error";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "id", label: "No.", alignRight: true },
  { id: "NAME_USER", label: "Nama", alignRight: false },
  { id: "EMAIL_USER", label: "Email", alignRight: false },
  { id: "ADDRESS_USER", label: "Alamat", alignRight: false },
  { id: "TELP_USER", label: "No Telp", alignRight: false },
  { id: "ISVERIF_USER", label: "Status", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order == "desc" ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.NAME_USER.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selectedId, setSelectedId] = useState("");

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [values, setValues] = useState("");

  const [modalDelete, setModalDelete] = useState(false);
  // const [modalVerif, setModalVerif] = useState(false);

  const [deleteId, setDeleteId] = useState(false);

  const dispatch = useDispatch();

  const { status, success, users, error } = useSelector((state) => state.users);

  React.useEffect(() => {
    dispatch(loadUsers());
  }, []);

  const handleOpenMenu = (event, values) => {
    setOpen(event.currentTarget);
    setSelectedId(values.ID_USER);
    setValues(values);
  };

  const handleCloseMenu = () => {
    setOpen(null);
    setSelectedId(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy == property && order == "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  // const onVerif = () => {
  //   setModalVerif(!modalVerif);
  //   setOpen(null);
  // };

  const onDelete = (id) => {
    setModalDelete(!modalDelete);
    setOpen(null);
    setDeleteId(id);
  };

  const onUpdate = (values) => {
    navigate("update/", { state: { values } });
  };

  const onView = (values) => {
    navigate("view/", { state: { values } });
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const filteredUsers = applySortFilter(users, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Pengguna | Tandur Admin </title>
      </Helmet>
      {error?.message ? (
        <ErrorSomethingWrong />
      ) : (
        <>
          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
              <Typography variant="h4" gutterBottom className="mt-[8px]">
                Pengguna
              </Typography>
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
                className={"bg-tandur"}
                onClick={() => {
                  navigate("add/");
                }}
              >
                Tambah Pengguna
              </Button>
            </Stack>

            <Card>
              <UserListToolbar filterName={filterName} placeholder="user" onFilterName={handleFilterByName} />
              <TableContainer>
                <Table>
                  <UserListHead order={order} orderBy={orderBy} headLabel={TABLE_HEAD} rowCount={users.length} onRequestSort={handleRequestSort} />
                  <TableBody>
                    {filteredUsers.length == 0 && (
                      <TableRow>
                        <TableCell align="center" colSpan={7}>
                          <Typography variant="subtitle1" noWrap>
                            Data Kosong
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      return (
                        <TableRow hover key={row.ID_USER} tabIndex={-1}>
                          <TableCell align="center">{row.id}</TableCell>

                          <TableCell component="th" scope="row" padding="none">
                            <Typography variant="subtitle2" noWrap>
                              {row.NAME_USER}
                            </Typography>
                          </TableCell>

                          <TableCell align="left">{row.EMAIL_USER}</TableCell>

                          <TableCell align="left">{row.ADDRESS_USER}</TableCell>

                          <TableCell align="left">{row.TELP_USER}</TableCell>

                          <TableCell align="left">
                            <Label color={row.ISVERIF_USER == 0 ? "error" : "success"}>{row.ISVERIF_USER == 0 ? "Nonaktif" : "Aktif"}</Label>
                          </TableCell>

                          <TableCell align="right">
                            <IconButton size="large" color="inherit" onClick={(e) => handleOpenMenu(e, row)}>
                              <Iconify icon={"eva:more-vertical-fill"} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>

                  {isNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <Paper
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            <Typography variant="h6" paragraph>
                              Not found
                            </Typography>

                            <Typography variant="body2">
                              No results found for &nbsp;
                              <strong>&quot;{filterName}&quot;</strong>.
                              <br /> Try checking for typos or using complete words.
                            </Typography>
                          </Paper>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>

              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </Container>

          <Popover
            open={Boolean(open)}
            anchorEl={open}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            PaperProps={{
              sx: {
                p: 1,
                width: 140,
                "& .MuiMenuItem-root": {
                  px: 1,
                  typography: "body2",
                  borderRadius: 0.75,
                },
              },
            }}
          >
            {/* {values.ISVERIF_USER == 0 && (
          <MenuItem onClick={() => onVerif()}>
            <Iconify icon={"eva:checkmark-circle-fill"} sx={{ mr: 2 }} />
            Verificate
          </MenuItem>
        )} */}

            <MenuItem onClick={() => onView(values)}>
              <Iconify icon={"eva:eye-fill"} sx={{ mr: 2 }} />
              Lihat
            </MenuItem>

            <MenuItem onClick={() => onUpdate(values)}>
              <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
              Ubah
            </MenuItem>

            <MenuItem sx={{ color: "error.main" }} onClick={() => onDelete(selectedId)}>
              <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
              Delete
            </MenuItem>
          </Popover>
          <LoadingModal loading={status == "loading"} styles={"z-[1300]"} />
          <AlertModal error={error} data={error} onClose={() => dispatch(resetError())} styles={"z-[1300]"} />
          <DeleteModal
            visible={modalDelete}
            setVisible={setModalDelete}
            onDelete={() => dispatch(deleteUsers(deleteId))}
            styles={"z-[1300]"}
            title={"pengguna"}
          />
          <SuccessModal error={success} data={success.data} onClose={() => dispatch(resetSuccess())} styles={"z-[1300]"} />
        </>
      )}
    </>
  );
}
