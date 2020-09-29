import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./css/Notice.css";
import { useDispatch } from "react-redux";

import { withStyles, makeStyles, useTheme } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { SlowMotionVideo } from "@material-ui/icons";

const NoticePoster = require("../../img/Notice.png");

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#59AAEB",
        color: "white",
        padding: "5px",
    },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
        marginRight: "10%",
        display: "block",
        float: "right",
    },
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(0),
    },
    table: {
        width: "80%",
        minWidth: 200,
        margin: "0 auto",
    },
}));

function TablePaginationActions(props) {
    const classes = useStyles();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
                {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="next page">
                {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="last page">
                {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

export default function CustomPaginationActionsTable() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [noticeData, setNoticeData] = useState([""]);

    const fetchApi = async () => {
        await fetch("http://ec2-3-34-192-67.ap-northeast-2.compute.amazonaws.com:3000/notice").then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    setNoticeData(data.notice);
                });
            } else {
                console.log("server error");
            }
        });
    };
    const dispatch = useDispatch();

    useEffect(() => {
        fetchApi();
        // 이태희 네비게이션을 위해
        dispatch({
            type: "UPDATE_MENU",
            id: 3,
        });
    }, []);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, noticeData.length - page * rowsPerPage);

    return (
        <TableContainer className={classes.container}>
            <img id="NoticePoster" src={NoticePoster}></img>
            <Table className={classes.table} id="NoticeTable" aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">번호</StyledTableCell>
                        <StyledTableCell align="center">제목</StyledTableCell>
                        <StyledTableCell id="MobileNotice" align="center">
                            작성자
                        </StyledTableCell>
                        <StyledTableCell id="MobileNotice" align="center">
                            작성일
                        </StyledTableCell>
                        <StyledTableCell id="MobileNotice" align="center">
                            조회수
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0 ? noticeData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : noticeData).map((row) => (
                        <TableRow key={row.index}>
                            <TableCell style={{ width: 20 }} align="center" padding="5px">
                                {row.index}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.title}
                            </TableCell>
                            <TableCell id="MobileNotice" style={{ width: 80 }} align="center" padding="5px">
                                {row.writer}
                            </TableCell>
                            <TableCell id="MobileNotice" style={{ width: 90 }} align="center" padding="5px">
                                {row.time}
                            </TableCell>
                            <TableCell id="MobileNotice" style={{ width: 50 }} align="center" padding="5px">
                                {row.view}
                            </TableCell>
                        </TableRow>
                    ))}
                    {emptyRows > 0 && (
                        <TableRow>
                            <TableCell colSpan={10} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            colSpan={10}
                            count={noticeData.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: { "aria-label": "rows per page" },
                                native: true,
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
            <Link to="/editor">
                <Button id="uploadbutton" variant="contained" color="default" className={classes.button} id="Upload">
                    Upload
                </Button>
            </Link>
        </TableContainer>
    );
}
