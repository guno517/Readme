import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import TablePaginationActions from "./NoticePagenation"
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import Button from "@material-ui/core/Button";
import "../css/HeaderPoster.css";

const NoticePoster = require("../../../img/Notice.png");

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#59AAEB",
        color: "white",
        padding: "5px",
    },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(0),
    },
    search: {
        margin: theme.spacing(1),
        marginRight: "10%",
        display: "block",
        float: "right",
    },
    table: {
        width: "80%",
        minWidth: 200,
        margin: "0 auto",
    },
    button: {
        margin: theme.spacing(1),
        marginRight: "10%",
        display: "block",
        float: "right",
        backgroundColor: "#59AAEB",
        color: "white",
    },
}));

function NoticeTable() {
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

    const [title, setTitle] = useState("");

    const onChangeValue = (e) => {
        setTitle(e.target.value);
    };

    const searchActive = async () => {
        const response = await fetch("http://ec2-3-34-192-67.ap-northeast-2.compute.amazonaws.com:3000/notice/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
            }),
        }).then(async (response) => {
            let response_json = await response.json();
            setNoticeData(response_json.notice_search);
        });
    };
    return (
        <TableContainer className={classes.container}>
            <img id="NoticePoster" src={NoticePoster}></img>
            <div id="Search" className={classes.search}>
                <div style={{ display: "inline-block", width: "100%", marginTop: "50px", marginBottom: "3%" }}>
                    <span style={{ fontSize: "18px", marginRight: "10px" }}>제목: </span>
                    <input onChange={onChangeValue} type="text" style={{ width: "100px", height: "30px", fontSize: "18px" }}></input>
                    <button onClick={searchActive} style={{ fontSize: "18px", marginLeft: "20px", height: "38px", backgroundColor: "white", border: "1px solid #bbbbbb", verticalAlign: "bottom" }}>
                        검색
                    </button>
                </div>
            </div>
            <Table id="NoticeTable" className={classes.table} aria-label="custom pagination table">
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
                        <TableRow>
                            <TableCell style={{ width: 20 }} align="center" padding="5px">
                                <Link id={row.index} to={`/notice_detail/${row.index}`}>
                                    {row.index}
                                </Link>
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <Link id={row.index} to={`/notice_detail/${row.index}`}>
                                    {row.title}
                                </Link>
                            </TableCell>
                            <TableCell id="MobileNotice" style={{ width: 80 }} align="center" padding="5px">
                                <Link id={row.index} to={`/notice_detail/${row.index}`}>
                                    {row.writer}
                                </Link>
                            </TableCell>
                            <TableCell id="MobileNotice" style={{ width: 90 }} align="center" padding="5px">
                                <Link id={row.index} to={`/notice_detail/${row.index}`}>
                                     {String(row.time).substr(0,10)}
                                </Link>
                            </TableCell>
                            <TableCell id="MobileNotice" style={{ width: 50 }} align="center" padding="5px">
                                <Link id={row.index} to={`/notice_detail/${row.index}`}>
                                    {row.view}
                                </Link>
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
                <Button id="Upload" className={classes.button} variant="contained" >
                    공지 작성
                </Button>
            </Link>
        </TableContainer>
    );
}

export default NoticeTable