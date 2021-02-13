<p align="center">
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcGRxst%2FbtqQt6CZkNX%2FsZDRtaLtLa0PEX968qVhd1%2Fimg.png" alt="Logo" width="150" height="150">
</p>

<h2 align="center"><a href="http://gachonreadme.s3.ap-northeast-2.amazonaws.com/index.html#/">README</a></h2>

<br>

## 📑 프로젝트 소개

👩‍🎓👨‍🎓 학생회 관련 소식을 쉽게 접하고 관리할 수 있는 반응형 웹 서비스입니다.

PROJECT PERIOD: 2020.08.31 ~ 2020.11.10

## ✨ 주요 기능

### 👩‍🎓 메인 홈

![메인](https://drive.google.com/uc?export=view&id=1GYpJVTQ3EyZ737YwFCwcgnIvBoqyHy4j)

💡 포스터

  - [1] 프로젝트 소개 포스터 (주요 기능 설명)
  
  - [2] 포스터 애니메이션 효과

### 👨‍🎓 학생회 (학과별 데이터 반영)

![학생회](https://drive.google.com/uc?export=view&id=1Aesf_NceYchf6hjlVesvI4Ip0FKh4RRE)

💡 공약 실천 현황

  - [1] 실천 예정 공약과 이행 완료 공약을 그래프로 표시

💡 공약 목록 전체 보기

  - [1] 공약 전체 목록 표시

  - [2] 이행 완료 공약 체크 표시

  - [3] 이행 인증 완료 목록 따로 표시

  - [4] 클릭하면 상세 보기로 이동

  - [5] 관리자 계정으로 로그인 했을 때 공약 관리 버튼으로 공약 추가
  
  - [6] 관리자 계정으로 로그인 했을 때 상세 보기로 이동하면 삭제 버튼 표시

💡 이행 인증 완료 캐러셀

  - [1] 이행 완료 공약 대표 사진 표시

  - [2] 클릭하면 상세 보기로 이동

  - [3] 관리자 계정으로 로그인 했을 때 상세 보기로 이동하면 삭제 버튼 표시

💡 이행 인증 버튼

  - [1] 관리자 계정으로 로그인 했을 때 제목, 시간, 작성자 및 내용 작성

### 👩‍🎓 선거 (학과별 데이터 반영)

![선거](https://drive.google.com/uc?export=view&id=1G2LEmaD4_XioRDdYW4M_iWoy-rOVIkby)

💡 선거 공지

  - [1] 선거 정보 공지

💡 입후보

  - [1] 입후보 목록 표시

  - [2] 입후보 목록 클릭하면 상세 정보 확인

  - [3] 관리자 계정으로 로그인 했을 때 입후보 삭제 버튼 표시
  
  - [4] 관리자 계정으로 로그인 했을 때 후보자 관리 버튼으로 경력, 공약 및 이미지를 포함한 입후보 등록 버튼 표시

💡 선거 결과

  - [1] 개표 결과 그래프를 통해 표시

  - [2] 투표 참여율 그래프를 통해 표시

  - [3] 관리자 계정으로 로그인 했을 때 결과 관리 버튼으로 투표 결과 등록

### 👨‍🎓 공지사항

![공지사항](https://drive.google.com/uc?export=view&id=1kBh7F4ELha4VZJ6zb9PeYj6dCQ5UCE_b)

💡 공지사항

  - [1] 전체 공지 목록  제목, 작성자, 작성일 및 조회수 표시
  
  - [2] 공지 클릭하면 상세 내용 확인 가능

  - [3] 제목으로 공지 검색

  - [4] 관리자 계정으로 로그인 했을 때 글 등록, 수정, 삭제

### 👩‍🎓 로그인

![로그인](https://drive.google.com/uc?export=view&id=1W02exPJkEYpNHnam2Jc7z8Ffb1po1NJ5)

💡 회원관리

  - [1] 회원가입, 로그인 및 로그아웃

## 🗂 프로젝트 구조

```
src
 ┣ img
 ┃ ┣ CandidateList.png
 ┃ ┣ ...
 ┃ ┗ VoteNotice.png
 ┣ pages
 ┃ ┣ components
 ┃ ┃ ┣ council
 ┃ ┃ ┃ ┣ Council.js
 ┃ ┃ ┃ ┣ ...
 ┃ ┃ ┃ ┗ CouncilTotalEditor.js
 ┃ ┃ ┣ css
 ┃ ┃ ┃ ┣ CouncilButton.css
 ┃ ┃ ┃ ┣ ...
 ┃ ┃ ┃ ┗ Vote.css
 ┃ ┃ ┣ notice
 ┃ ┃ ┃ ┣ Notice.js
 ┃ ┃ ┃ ┣ ...
 ┃ ┃ ┃ ┗ NoticeTable.js
 ┃ ┃ ┣ vote
 ┃ ┃ ┃ ┣ CandidateList.js
 ┃ ┃ ┃ ┣ ...
 ┃ ┃ ┃ ┗ VoteResultTurnoutChart.js
 ┃ ┃ ┣ Common.js
 ┃ ┃ ┣ ...
 ┃ ┃ ┗ Signup.js
 ┃ ┣ css
 ┃ ┃ ┣ Footer.css
 ┃ ┃ ┗ Header.css
 ┃ ┣ Content.js
 ┃ ┣ ...
 ┃ ┗ Main.js
 ┣ reducers
 ┃ ┣ selectForm
 ┃ ┃ ┣ selectAll.js
 ┃ ┃ ┣ selectCollege.js
 ┃ ┃ ┗ selectFlagData.js
 ┃ ┣ vote
 ┃ ┃ ┣ voteData.js
 ┃ ┃ ┣ ...
 ┃ ┃ ┗ voteTurnOutCollege.js
 ┃ ┣ index.js
 ┃ ┣ login.js
 ┃ ┗ menu.js
 ┣ server
 ┃ ┣ routes
 ┃ ┃ ┣ candidate.js
 ┃ ┃ ┣ ...
 ┃ ┃ ┗ vote.js
 ┃ ┣ app.js
 ┃ ┣ db.js
 ┃ ┗ test.js
 ┣ App.css
 ┣ App.js
 ┣ index.css
 ┗ index.js
```

## 🛠 사용 기술

| Front-End | Back-End | DataBase | Front-Server | Back-Server | Tool |
| --- | --- | --- | --- | --- | --- |
| JavaScript<br>React<br>Redux | Node.js<br>Express | MySQL | AWS S3 | AWS EC2 | Git<br>Slack<br>Adobe XD<br>Photoshop |

```
"@material-ui/core": "^4.11.0",
"@material-ui/icons": "^4.9.1",
"@testing-library/jest-dom": "^4.2.4",
"@testing-library/react": "^9.3.2",
"@testing-library/user-event": "^7.1.2",
"@types/highcharts": "^7.0.0",
"bootstrap": "^4.5.2",
"highcharts-drilldown": "^0.1.7",
"highcharts-react-official": "^3.0.0",
"material-ui": "^1.0.0-beta.47",
"react": "^16.13.1",
"react-dom": "^16.13.1",
"react-highcharts": "^16.1.0",
"react-loading-overlay": "^1.0.1",
"react-quill": "^1.3.5",
"react-redux": "^7.2.1",
"react-responsive-carousel": "^3.2.10",
"react-router-dom": "^5.2.0",
"react-scripts": "3.4.3",
"react-spinners": "^0.9.0",
"reactstrap": "^8.6.0",
"recompose": "^0.30.0",
"redux": "^4.0.5"
```

## 🖥 Local 실행 방법

#### [1] Yarn 설치

[Yarn 설치 바로가기](https://classic.yarnpkg.com/en/docs/install#windows-stable)

#### [2] Clone the Repo

```sh
git clone https://github.com/mnxmnz/README.git
```

#### [3] Install Packages

```sh
yarn
```

#### [4] Run the Project

```sh
yarn start
```

## 💻 개발자

| <img src="https://avatars1.githubusercontent.com/u/48766355?s=460&u=0419d273d1a31539ee4f1151cdacb6fefd45dacc&v=4" width="70" height="70"><br>[김민지](https://github.com/mnxmnz) | <img src="https://avatars0.githubusercontent.com/u/60571418?s=460&v=4" width="70" height="70"><br>[변건오](https://github.com/guno517) | <img src="https://avatars1.githubusercontent.com/u/49905817?s=460&u=42f915292211535284d32fc5d9a9250c3cad93d3&v=4" width="70" height="70"><br>[이태희](https://github.com/th0532) |
| --- | --- | --- |

### :link: URL

-   [README 바로가기](http://gachonreadme.s3.ap-northeast-2.amazonaws.com/index.html#/)
