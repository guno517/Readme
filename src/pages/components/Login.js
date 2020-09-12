import React, {useState, useEffect} from "react";
const Login = (props) => {

    const [maindata, setMaindata] = useState([]);
    const [flag, setFlag] = useState(false)
    useEffect(()=>{
     fetchApi();
    },[])


    const fetchApi = async() =>{
        await fetch('http://ec2-3-34-192-67.ap-northeast-2.compute.amazonaws.com:5000/db',{
            method: "GET",
        })
        .then(response => response.json())
        .then(response => {
            setMaindata(response)
            setFlag(true)
        })
    }
console.log(maindata.pledge)
    return(
        <div className={"content"}>
            {flag && 
                <div>{

                    maindata.pledge.map(data=>(
                        <p>{data.department}</p>    
                    ))
                }</div>
            }

        </div>
    )
}

export default Login;