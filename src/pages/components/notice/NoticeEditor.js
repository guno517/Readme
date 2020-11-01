import React, { useState, useEffect } from "react";
import 'react-quill/dist/quill.snow.css'; // ES6
import ReactQuill, { Quill, Mixin, Toolbar } from 'react-quill'; // ES6

{/* <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css"></link> */}


class NoticeEditor extends React.Component {

    constructor(props) {
        super(props)
        this.state = { 
            content: '',
            title: '',
            dbUrl:'http://ec2-3-34-192-67.ap-northeast-2.compute.amazonaws.com:3000/notice/insert'
        }
        this.handleChange = this.handleChange.bind(this)
        this.titleChange = this.titleChange.bind(this)
        this.dataSubmit = this.dataSubmit.bind(this)

        if(props.match.params.id){
            this.fetchApi()
        }
        console.log(props.match.params.id);
    }
    
    handleChange(value) {
      this.setState({ content: value})
    }
    titleChange(e) {
        this.setState({ title: e.target.value})
    }
    prev(){
        window.history.go(-1);
    }
    async dataSubmit(){
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        // 날짜까지
        let date1 = `${year}/${month}/${day<10?`0${day}`:`${day}`}`;
        let date2 = `${hour}:${minute<10?`0${minute}`:`${minute}`}:${second<10?`0${second}`:`${second}`}`;
        let time = date1+" "+ date2;
        await fetch(this.state.dbUrl,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                title:this.state.title,
                content:this.state.content,
                writer:"가천대학교 총학생회",
                time:time
            })
        })
        .then(()=>{
            window.history.go(-1);
        })
    }
    modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['image']        ],
      }
     
      formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'image'
      ]

      path_id = this.props.match.params.id;
      async fetchApi(){
        await fetch(`http://ec2-3-34-192-67.ap-northeast-2.compute.amazonaws.com:3000/notice/detail/${this.path_id}`)
        .then((response) => {
            if (response.status === 200) {
                response.json().then(({detail}) => {
                    this.setState({ 
                            content: detail[0].content,
                            title:detail[0].title, 
                            dbUrl:`http://ec2-3-34-192-67.ap-northeast-2.compute.amazonaws.com:3000/notice/update/${this.path_id}`
                        })
                    console.log(this.state)
                });
            } else {
                console.log("server error");
            }
        });
      }
        
    render() {
      return (
            <>
                <h1 style={{marginTop:"100px", marginLeft:'3%', marginBottom:'40px'}}>{this.path_id?"공지사항 수정":"공지사항 작성"}</h1>
                <input
                    value={this.state.title} 
                    type="text" placeholder="제목을 작성해주세요" 
                    onChange={this.titleChange}
                    style={{width:'250px', height:'35px', marginBottom:'2%', marginLeft:'3%', border:'1px solid #ccc', paddingLeft:'1%'}}></input>
                <ReactQuill 
                    value={this.state.content}
                    modules={this.modules}
                    formats={this.formats}
                    onChange={this.handleChange} 
                    style={{marginLeft:'3%',marginRight:'3%',marginBottom:'3%', minHeight:'500px'}}
                />
                <div style={{width:'100%', textAlign: 'right'}}>
                    <button onClick={this.prev} style={{width:'100px', height:'30px',marginRight:'1%',marginBottom:'3%', border:'1px solid rgb(130, 162, 209)', backgroundColor:'white', color:'#59AAEB', borderRadius:'5px', outline:'none'}}>목록</button>
                    <button onClick={this.dataSubmit} style={{width:'100px', height:'30px',marginRight:'3%',marginBottom:'3%', border:'1px solid rgb(130, 162, 209)', backgroundColor:'#59AAEB', color:'white', borderRadius:'5px'}}>등록</button>
                </div>
            </>
      )
    }
  }

  export default NoticeEditor;