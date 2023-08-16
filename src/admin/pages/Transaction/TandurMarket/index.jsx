import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { filter } from "lodash";

// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
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
import Iconify from "../../../components/iconify";
// sections
import { UserListHead, UserListToolbar } from "../../../sections/@dashboard/user";
// mock
import { useDispatch, useSelector } from "react-redux";
import { loadProductTransactionAdmin, verifProductTransaction } from "../../../../redux/actions";
import { useNavigate } from "react-router-dom";
import { AlertModal, ConfirmModal, LoadingModal, SuccessModal } from "../../../../components";
import { resetSuccess, resetError } from "../../../../redux/slice/productSlice";
import { currencyFormat } from "../../../../utils/currencyFormat";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "id", label: "No.", alignRight: true },
  { id: "name", label: "Nama", alignRight: false },
  { id: "ship_method", label: "Pengiriman", alignRight: false },
  { id: "price", label: "Total", alignRight: false },
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
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function TandurMarket() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selectedId, setSelectedId] = useState("");

  const [orderBy, setOrderBy] = useState("");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [values, setValues] = useState("");

  const [modalVerif, setModalVerif] = useState(false);

  const dispatch = useDispatch();

  const { status, success, transaction, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(loadProductTransactionAdmin());
  }, [dispatch]);

  const onView = (values) => {
    navigate("view/", { state: { values } });
  };

  const handleOpenMenu = (event, values) => {
    setOpen(event.currentTarget);
    setSelectedId(values.ID_PURCHASE);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - transaction.length) : 0;

  const filteredTransaction = applySortFilter(transaction, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredTransaction.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Transaksi | Tandur Admin </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" gutterBottom className="mt-[8px]">
            Transaksi Pasar Tandur
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar filterName={filterName} placeholder="transaksi" onFilterName={handleFilterByName} />

          <TableContainer>
            <Table>
              <UserListHead order={order} orderBy={orderBy} headLabel={TABLE_HEAD} rowCount={transaction.length} onRequestSort={handleRequestSort} />
              <TableBody>
                {filteredTransaction.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow hover key={row.ID_PURCHASE} tabIndex={-1} role="checkbox">
                      <TableCell align="center">{row.id}</TableCell>

                      <TableCell component="th" scope="row" padding="none">
                        <Stack direction="row" alignItems="center" spacing={2} className={"pl-4"}>
                          <Typography variant="subtitle2" noWrap>
                            {row.NAME_USER}
                          </Typography>
                        </Stack>
                      </TableCell>

                      <TableCell align="left" className="uppercase">
                        {row.SHIPPING_METHOD}
                      </TableCell>
                      <TableCell align="left">{currencyFormat(row.TOTPAYMENT_PURCHASE.toString(), "Rp. ")}</TableCell>

                      <TableCell align="center" width={20}>
                        {row.STATUS_PAYPRODUCT !== 0 && (
                          <IconButton size="large" color="inherit" onClick={(e) => handleOpenMenu(e, row)}>
                            <Iconify icon={"eva:more-vertical-fill"} />
                          </IconButton>
                        )}
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
            count={transaction.length}
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
      </Popover>
      <LoadingModal loading={status == "loading"} styles={"z-[1300]"} />
      <AlertModal error={error} data={error} onClose={() => dispatch(resetError())} styles={"z-[1300]"} />
      <ConfirmModal
        visible={modalVerif}
        setVisible={setModalVerif}
        onVerif={() => {
          const formdata = new FormData();
          formdata.append("id_purchase", selectedId);
          dispatch(verifProductTransaction(formdata));
        }}
        styles={"z-[1300]"}
        title={"transaksi"}
      />
      <SuccessModal error={success} data={success} onClose={() => dispatch(resetSuccess())} styles={"z-[1300]"} />
    </>
  );
}
