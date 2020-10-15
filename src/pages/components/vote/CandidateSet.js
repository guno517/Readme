import React, { useState, useEffect, useRef } from "react";
import {useSelector, useDispatch } from 'react-redux'
import 'react-quill/dist/quill.snow.css'; // ES6
import ReactQuill, { Quill, Mixin, Toolbar } from 'react-quill'; // ES6

const CandidateSet = (props) =>{
    const [number, setNumber] = useState('');
    const [name, setName] = useState('');
    const [grade, setGrade] = useState('');
    const [career, setCareer] = useState('');
    const [careerList, setCareerList] = useState([]);
    const [electionPledge, setElectionPledge] = useState('');
    const [electionPledgeList, setElectionPledgeList] = useState([]);

    const careerInput = useRef();
    const electionPledgeInput = useRef();

    let collegeCode = props.match.params.collegeCode;
    let majorCode = props.match.params.majorCode;
    let selectInfo =  useSelector(state => state.selectFlagData)
    let collegeName = selectInfo.collegeName;
    let majorName = selectInfo.majorName;

    let dbUrl = `http://ec2-3-34-192-67.ap-northeast-2.compute.amazonaws.com:3000/candidate/insert/${collegeCode}/${majorCode}`
    
    const numberChange = (e) =>{
        setNumber(e.target.value);
    } 
    const nameChange = (e) =>{
        setName(e.target.value);
    } 
    const gradeChange = (e) =>{
        setGrade(e.target.value);
    } 
    const careerChange = (e) =>{
        setCareer(e.target.value);
    } 
    const electionPledgeChange = (e) =>{
        setElectionPledge(e.target.value);
    } 
    const prev = () =>{
        window.history.go(-1);
    }
    const dataSubmit = async()=>{
        let career = careerList.join("#");
        let election_pledge = electionPledgeList.join("#");
        await fetch(dbUrl,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                college:collegeName,
                department:majorName,
                number:number,
                name:name,
                grade:grade,
                img:previewURL,
                career:career,
                election_pledge:election_pledge
            })
        })
        .then(()=>{
            window.history.go(-1);
        })
    }
    const [previewURL, setPreviewURL] = useState('');
    const handleFileOnChange = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            setPreviewURL(()=>reader.result);
        }
        reader.readAsDataURL(file);
      }
 
    const careerDataAdd = () =>{
        setCareerList(careerList.concat(career));
        setCareer("")
        careerInput.current.focus();
    }
    const electionPledgeDataAdd = () =>{
        setElectionPledgeList(electionPledgeList.concat(electionPledge));
        setElectionPledge("")
        electionPledgeInput.current.focus();
    }
    

    return(
        <div>
            <h1 style={{marginTop:"100px", marginLeft:'3%', marginBottom:'40px'}}>입후보 등록</h1>
            <input
                value={number} 
                type="text" placeholder="후보자 기호 번호를 작성해주세요" 
                onChange={numberChange}
                style={{width:'250px', height:'35px', marginBottom:'2%', marginLeft:'3%', border:'1px solid #ccc', paddingLeft:'1%'}}>
            </input>
            <input
                value={name} 
                type="text" placeholder="이름을 작성해주세요" 
                onChange={nameChange}
                style={{width:'250px', height:'35px', marginBottom:'2%', marginLeft:'3%', border:'1px solid #ccc', paddingLeft:'1%'}}>
            </input>
            <input
                value={grade} 
                type="text" placeholder="학년을 작성해주세요" 
                onChange={gradeChange}
                style={{width:'250px', height:'35px', marginBottom:'2%', marginLeft:'3%', border:'1px solid #ccc', paddingLeft:'1%'}}>
            </input>
          
            <div className={"career"} style={{ marginLeft:'3%', marginBottom:'40px'}}>
                <h1>경력</h1>
                <input ref={careerInput} value = {career} onChange={careerChange} type="text" placeholder="경력을 입력하세요" style={{width:'250px', height:'35px'}}/>
                <button onClick={careerDataAdd}>등록</button>

                <ul>
                    {careerList && careerList.map((data, index)=>(
                        <li key={index} style={{marginTop:"10px"}}>{data}</li>
                    ))}
                </ul>
            </div>
            
            <div className={"electionPledge"} style={{ marginLeft:'3%', marginBottom:'40px'}}>
                <h1>공약</h1>
                <input ref={electionPledgeInput} value = {electionPledge} onChange={electionPledgeChange} type="text" placeholder="공약을 입력하세요" style={{width:'250px', height:'35px'}}/>
                <button onClick={electionPledgeDataAdd}>등록</button>

                <ul>
                    {electionPledgeList && electionPledgeList.map((data, index)=>(
                        <li key={index} style={{marginTop:"10px"}}>{data}</li>
                    ))}
                </ul>
            </div>

            <div className={"thumbnail"} style={{ marginLeft:'3%', marginBottom:'40px'}}>
                <h1>프로필 이미지 (선택)</h1>
                <input type='file' 
                        accept='image/jpg,impge/png,image/jpeg,image/gif' 
                        name='profile_img' 
                        onChange={handleFileOnChange}>
                </input>
                {previewURL === '' ? '' : <img className='profile_preview' style={{width:'20%', height:"250px"}} src={previewURL} alt="thumbnail"></img> }
            </div>

            <div style={{width:'100%', textAlign: 'right'}}>
                <button onClick={prev} style={{width:'100px', height:'30px',marginRight:'1%',marginBottom:'3%', border:'1px solid rgb(130, 162, 209)', backgroundColor:'white', color:'#59AAEB', borderRadius:'5px', outline:'none'}}>목록</button>
                <button onClick={dataSubmit} style={{width:'100px', height:'30px',marginRight:'3%',marginBottom:'3%', border:'1px solid rgb(130, 162, 209)', backgroundColor:'#59AAEB', color:'white', borderRadius:'5px'}}>등록</button>
            </div>
        </div>
    )
}
// class CandidateSet extends React.Component {

//     constructor(props) {
//         super(props)
//         let collegeCode = this.props.match.params.collegeCode;
//         let majorCode = this.props.match.params.majorCode;
//         this.state = { 
//             content: '',
//             title: '',
//             dbUrl:`http://ec2-3-34-192-67.ap-northeast-2.compute.amazonaws.com:3000/candidate/insert/${collegeCode}/${majorCode}`
//         }
//         this.handleChange = this.handleChange.bind(this)
//         this.titleChange = this.titleChange.bind(this)
//         this.dataSubmit = this.dataSubmit.bind(this)

//         if(props.match.params.id){
//             this.fetchApi()
//         }
//     }
    
//     handleChange(value) {
//       this.setState({ content: value})
//     }
//     titleChange(e) {
//         this.setState({ title: e.target.value})
//     }
//     prev(){
//         window.history.go(-1);
//     }
//     async dataSubmit(){
//         let date = new Date();
//         let year = date.getFullYear();
//         let month = date.getMonth()+1;
//         let day = date.getDate();
//         let hour = date.getHours();
//         let minute = date.getMinutes();
//         let second = date.getSeconds();
//         // 날짜까지
//         let date1 = `${year}/${month}/${day<10?`0${day}`:`${day}`}`;
//         let date2 = `${hour}:${minute<10?`0${minute}`:`${minute}`}:${second<10?`0${second}`:`${second}`}`;
//         let time = date1+" "+ date2;
//         await fetch(this.state.dbUrl,{
//             method:"POST",
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body:JSON.stringify({
//                 title:this.state.title,
//                 content:this.state.content,
//                 writer:"가천대학교 총학생회",
//                 time:time
//             })
//         })
//         .then(()=>{
//             window.history.go(-1);
//         })
//     }
//     modules = {
//         toolbar: [
//           [{ 'header': [1, 2, false] }],
//           ['bold', 'italic', 'underline','strike', 'blockquote'],
//           [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
//           ['image']        ],
//       }
     
//       formats = [
//         'header',
//         'bold', 'italic', 'underline', 'strike', 'blockquote',
//         'list', 'bullet', 'indent',
//         'image'
//       ]

//     render() {
//       return (
//             <>
//                 <h1 style={{marginTop:"100px", marginLeft:'3%', marginBottom:'40px'}}>{this.path_id?"입후보 수정":"입후보 등록"}</h1>
//                 <input
//                     value={this.state.title} 
//                     type="text" placeholder="제목을 작성해주세요" 
//                     onChange={this.titleChange}
//                     style={{width:'250px', height:'35px', marginBottom:'2%', marginLeft:'3%', border:'1px solid #ccc', paddingLeft:'1%'}}></input>
//                 <ReactQuill 
//                     value={this.state.content}
//                     modules={this.modules}
//                     formats={this.formats}
//                     onChange={this.handleChange} 
//                     style={{marginLeft:'3%',marginRight:'3%',marginBottom:'3%', minHeight:'500px'}}
//                 />
//                 <div style={{width:'100%', textAlign: 'right'}}>
//                     <button onClick={this.prev} style={{width:'100px', height:'30px',marginRight:'1%',marginBottom:'3%', border:'1px solid rgb(130, 162, 209)', backgroundColor:'white', color:'#59AAEB', borderRadius:'5px', outline:'none'}}>목록</button>
//                     <button onClick={this.dataSubmit} style={{width:'100px', height:'30px',marginRight:'3%',marginBottom:'3%', border:'1px solid rgb(130, 162, 209)', backgroundColor:'#59AAEB', color:'white', borderRadius:'5px'}}>등록</button>
//                 </div>
//             </>
//       )
//     }
//   }

  export default CandidateSet;
