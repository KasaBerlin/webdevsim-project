import React,{useState,useEffect} from 'react';
import uuid from "uuid/v4";
// import axios from 'axios';

const Input=()=>{
  const nameInput=React.createRef();
  const commentInput=React.createRef();
  const fileInput=React.createRef(); 
  
  const [response, setResponse]=useState('')
  const [post, addNewPost]=useState([])
  const [responseToPost, setResponseToPost]=useState([])
  
useEffect(()=>{
    callApi().then(res=>setResponse(res.express)).catch(err=> console.log(err));
  },[])

const callApi= async () =>{
const response= await fetch('/api/hello');
const body= await response.json();
console.log(body)
if(response.status !== 200) throw Error (body.message);
return body;
  }

function addPost(name, comment,file){
    const newPost = {
      name: name,
      comment: comment,
      date: new Date().toLocaleString(),
      file:file,
      showing: false
    }; 
    post.push(newPost)
    console.log(newPost)
    console.log(response)
    console.log(post)
    console.log(responseToPost)
    return post
  };
  
  const handleSubmit= async e => {
    e.preventDefault();
    const name = nameInput.current.value.trim();
    const comment = commentInput.current.value.trim();
    const file = fileInput.current.value.trim();
    addPost(name,comment,file)

    const response=await fetch('/api/world',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({post}),
    })

    const body=await response.text();
    setResponseToPost(body)

    console.log(JSON.parse(body))
    console.log(response)
    console.log(post)
    console.log(responseToPost)
    // axios.post("/upload", data, { 
    // }).then(res => { 
    //   console.log(res.statusText);
    // })
    // console.log("submitted");
    // e.currentTarget.reset();
  };
  
  function onChangeHandler(e){
    // setFile(e.target.files[0])
    // console.log(selectedFile)
  }
  
return(
<div>
      <form className="comment-form" encType="multipart/form-data" onSubmit={handleSubmit}>
        <label>name</label>
        <input
          type="text"
          id="name"
          name="name"
          ref={nameInput}
          required
        ></input>
        <br/>
        <label>comment</label>
        <textarea rows="2" id="comment" name="comment" ref={commentInput} required></textarea>
        <br/>
        <div>
        <label htmlFor="imgUpload">upload your website image here <i className="fas fa-chevron-circle-up"></i></label>
        <input type="file" id="ref" ref={fileInput} name="file" accept="image/png, image/jpeg" onChange={onChangeHandler}/>
        </div>
        <br/>
        <button type="submit">
          submit
        </button>
        <br />
      </form>
<h1>{responseToPost}</h1>
    </div>
    )
}
 
export default Input;