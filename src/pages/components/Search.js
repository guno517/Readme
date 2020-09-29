import React, {useState, useEffect} from "react";

const Search = (props) => {
    
    const [content, setContent] = useState('');
    
    const onChangeValue = (e) =>{
        setContent(e.target.value);
    }

    const searchActive = async() =>{
        const response = await fetch('http://ec2-3-34-192-67.ap-northeast-2.compute.amazonaws.com:3000/search',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                content:content
            })
        })
        .then(async(response)=>{
            const data = await response.json();
        })

    }
    return(
        <div style={{width:'500px', marginTop:"100px", marginLeft:"50px"}}>
            <span style={{fontSize:'18px', marginRight:"10px"}}>내용: </span>
            <input onChange={onChangeValue} type="text" style={{width:'200px',height:'30px',fontSize:'18px'}}></input>
            <button onClick={searchActive} style={{fontSize:'18px', marginLeft:"20px", height:'38px', backgroundColor:'white', border:'1px solid #bbbbbb', verticalAlign:'bottom'}}>검색</button>
        </div>
    )
}

export default Search;