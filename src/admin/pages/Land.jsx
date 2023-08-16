import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
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
// mock
import { useDispatch, useSelector } from "react-redux";
import { deleteLands, loadLandsAdmin, verifLands } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { AlertModal, ConfirmModal, DeleteModal, LoadingModal, SuccessModal } from "../../components";
import { currencyFormat } from "../../utils/currencyFormat";
import { resetSuccess, resetError } from "../../redux/slice/landSlice";
import ErrorSomethingWrong from "./Error";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "id", label: "No.", alignRight: true },
  { id: "NAME_LAND", label: "Nama Lahan", alignRight: false },
  { id: "NAME_PROVINCE", label: "Provinsi", alignRight: false },
  { id: "PRICE_LAND", label: "Harga", alignRight: false },
  { id: "IS_ACTIVE", label: "Status", alignRight: false },
  { id: "action" },
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
    return filter(array, (_user) => _user.NAME_LAND.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Land() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selectedId, setSelectedId] = useState("");

  const [orderBy, setOrderBy] = useState("");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [values, setValues] = useState("");

  const [modalDelete, setModalDelete] = useState(false);
  const [modalVerif, setModalVerif] = useState(false);

  const dispatch = useDispatch();

  const { status, success, lands, error } = useSelector((state) => state.land);

  useEffect(() => {
    dispatch(loadLandsAdmin());
  }, [dispatch]);

  const onUpdate = (values) => {
    navigate("update/", { state: { values } });
  };

  const onView = (values) => {
    navigate("view/", { state: { values } });
  };

  const onDelete = () => {
    setModalDelete(!modalDelete);
    setOpen(null);
  };
  const onVerif = () => {
    setModalVerif(!modalVerif);
    setOpen(null);
  };

  const handleOpenMenu = (event, values) => {
    setOpen(event.currentTarget);
    setSelectedId(values.ID_LAND);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - lands.length) : 0;

  const filteredLands = applySortFilter(lands, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredLands.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Lahan | Tandur Admin </title>
      </Helmet>
      {error?.message == "" ? (
        <ErrorSomethingWrong />
      ) : (
        <>
          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
              <Typography variant="h4" gutterBottom className="mt-[8px]">
                Lahan
              </Typography>
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
                className={"bg-tandur"}
                onClick={() => {
                  navigate("add/");
                }}
              >
                Tambah lahan
              </Button>
            </Stack>

            <Card>
              <UserListToolbar filterName={filterName} placeholder="lahan" onFilterName={handleFilterByName} />

              <TableContainer>
                <Table>
                  <UserListHead order={order} orderBy={orderBy} headLabel={TABLE_HEAD} rowCount={lands.length} onRequestSort={handleRequestSort} />
                  <TableBody>
                    {filteredLands.length == 0 && (
                      <TableRow>
                        <TableCell align="center" colSpan={7}>
                          <Typography variant="subtitle1" noWrap>
                            Data Kosong
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                    {filteredLands.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
                      return (
                        <TableRow hover key={row.ID_LAND} tabIndex={-1} role="checkbox">
                          <TableCell align="center">{row.id}</TableCell>

                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap className={"pl-4"}>
                                {row.NAME_LAND}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{row.NAME_PROVINCE}</TableCell>
                          <TableCell align="left">{currencyFormat(row.PRICE_LAND.toString(), "Rp. ")}</TableCell>

                          <TableCell align="left">
                            <Label color={row.IS_ACTIVE == 0 ? "error" : "success"}>{row.IS_ACTIVE == 0 ? "Nonaktif" : "Aktif"}</Label>
                          </TableCell>

                          <TableCell align="center" width={20}>
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
                              Tidak ditemukan.
                            </Typography>

                            <Typography variant="body2">
                              Tidak ditemukan hasil pencarian untuk &nbsp;
                              <strong>&quot;{filterName}&quot;</strong>.
                              <br /> Coba cek kembali atau gunakan kalimat lengkap.
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
                count={lands.length}
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
            <MenuItem onClick={() => onView(values)}>
              <Iconify icon={"eva:eye-fill"} sx={{ mr: 2 }} />
              Lihat
            </MenuItem>

            {values.IS_ACTIVE == 0 && (
              <MenuItem onClick={() => onVerif()}>
                <Iconify icon={"eva:checkmark-circle-fill"} sx={{ mr: 2 }} />
                Verifikasi
              </MenuItem>
            )}

            <MenuItem onClick={() => onUpdate(values)}>
              <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
              Ubah
            </MenuItem>

            <MenuItem sx={{ color: "error.main" }} onClick={() => onDelete()}>
              <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
              Hapus
            </MenuItem>
          </Popover>
          <LoadingModal loading={status == "loading"} styles={"z-[1300]"} />
          <AlertModal error={error} data={error} onClose={() => dispatch(resetError())} styles={"z-[1300]"} />
          <DeleteModal
            visible={modalDelete}
            setVisible={setModalDelete}
            onDelete={() => {
              dispatch(deleteLands(selectedId));
            }}
            styles={"z-[1300]"}
            title={"lahan"}
          />
          <ConfirmModal
            visible={modalVerif}
            setVisible={setModalVerif}
            onVerif={() => {
              dispatch(verifLands(selectedId));
            }}
            styles={"z-[1300]"}
            title={"lahan"}
          />
          <SuccessModal error={success} data={success.data} onClose={() => dispatch(resetSuccess())} styles={"z-[1300]"} />
        </>
      )}
    </>
  );
}
