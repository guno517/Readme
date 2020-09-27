import React,{useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableHead from '@material-ui/core/TableHead';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Link } from 'react-router-dom';
import "./css/Notice.css" 
import { useDispatch } from 'react-redux'

const noticeposter =  require("../../img/Notice.png");

//공지사항 테이블 상단 제목 작성자 작성일의 배경색, 글자색 및 테이블 폰트 크기 지정
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.info.light,
    color: theme.palette.common.white,
  },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(0),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
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
    <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
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

const rows = [
    {
      "index": 1,
      "img": "https://t1.daumcdn.net/cfile/tistory/994BEF35",
      "attachment": null,
      "title": "코로나로 인한 비대면 수업 실시",
      "content": "COVID-19로 인하여 1~5주차는 비대면으로 WEBEX 화상 강의로 대체하겠습니다.",
      "writer": "가천대학교",
      "time": "2020-09-13T00:00:00.000Z"
    },
    {
      "index": 2,
      "img": "https://www.gachon.ac.kr/Files/editupload/202",
      "attachment": null,
      "title": "2020-2학기 취업동아리 참여자 모집",
      "content": null,
      "writer": "가천대학교",
      "time": "2020-09-13T00:00:00.000Z"
    },
    {
      "index": 3,
      "img": null,
      "attachment": null,
      "title": "2020-2학기 3주차~5주차 이후 수업운영 기준 안내",
      "content": "코로나-19 교내 감염을 방지하고자 아래와 같이 2020-2학기 3주차~5주차 이후 수업운영 기준을 아래와 같이 공지하오니 참고바랍니다.\n\n \n\n1. 이론강좌 수업진행 기준\n\n   가. 1주차~5주차: 전체 비대면 실시간 화상강의\n\n   나. 6주차 이후: 아래의 2020-2학기 수업진행 기준에 따라 운영 (10월5일부터)\n\n        1) 61명 이상 강좌: 2학기 전체 비대면 실시간 화상강의\n\n        2) 31명~60명 강좌: 강의실에서 대면강의와 실시간 화상강의 동시 진행\n\n                                 ※학생의 자율적 선택권(대면 또는 비대면) 보장\n\n        3) 30명 이하 강좌: 강의실에서 대면강의\n\n \n\n2. 실험/실습/실기강좌 수업진행 기준 (정부의 방역 기준 철저 준수)\n\n   가. 1주차~2주차: 비대면 실시간 화상강의\n\n   나. 3주차 이후: 1학기와 같이 소규모 분반 운영 (9월14일부터)\n\n    ※ 지방학생 대상 실험/실습/실기 집중캠프 진행 예정(학기종료 직후 1주일, 12월21~27일)\n\n \n\n3. 기타사항\n\n   - 전체 대면강의 수업진행시 감염상황에 따라 사회적거리두기 준수\n\n   - 수업중 감염 발생을 차단하기 위하여 마스크착용(필수), 강의실 수시 환기 등 교수 및         학생의 수칙 준수",
      "writer": "가천대학교",
      "time": "2020-09-13T00:00:00.000Z"
    },
    {
      "index": 4,
      "img": null,
      "attachment": null,
      "title": "test",
      "content": "content",
      "writer": "가천대학교",
      "time": "2020-09-13T00:00:00.000Z"
    }
  ]

const useStyles2 = makeStyles({
  table: {
    minWidth: 480,
  },
});

export default function CustomPaginationActionsTable() {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [noticeData, setNoticeData] = useState(['']);

  const fetchApi = async() =>{
    await fetch("http://ec2-3-34-192-67.ap-northeast-2.compute.amazonaws.com:5000/notice")
      .then((response) =>{
        if(response.status === 200){
          response.json()
          .then(data => {
            setNoticeData(data.notice)
          })
        }
        else{
          console.log("server error")
        }
      }      
  )}
  const dispatch = useDispatch()

  useEffect(() => {
    fetchApi();
    // 이태희 네비게이션을 위해
       dispatch({
           type:'UPDATE_MENU',
           id:3
       })
  }, [])
  
  return (
      <TableContainer>
        <div>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <img width="100%" src={noticeposter}></img>
        </div>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead id="tablehead">
            <TableRow>
            <StyledTableCell align="center">번호</StyledTableCell>
              <StyledTableCell align="center">제목</StyledTableCell>
              <StyledTableCell align="center">작성자</StyledTableCell>
              <StyledTableCell align="center">작성일</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow key={row.index}>
                <TableCell style={{ width: 30 }} align="center">
                  {row.index}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell style={{ width: 80 }} align="center">
                  {row.writer}
                </TableCell>
                <TableCell style={{ width: 80 }} align="center">
                  {row.time}
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
            <TableFooter>
                <TableRow>
                    <div>
                        <Link to="/editor">
                            <Button
                                variant="contained"
                                color="default"
                                className={classes.button}
                                startIcon={<CloudUploadIcon />}
                            >
                            Upload
                            </Button>
                        </Link>
                    </div>
                </TableRow>
            </TableFooter>
          </TableBody>
        </Table>
      </TableContainer>
  );
}