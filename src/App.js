import {React,useState,useEffect} from 'react';
import './App.css';
import axios from 'axios';


// Initial upto which number the result should be seen to us.
const start_Number=0;

function App() {
  const [state,setState]=useState([]);
  const [number,setNumber]=useState(start_Number);

  
// creatng a hook to fetch the api usin axios
  useEffect(() => {
    axios.get(`http://jsonplaceholder.typicode.com/posts?_start=${number}&_limit=10`)
    .then(res=>{
      setState([...state,...res.data])
      console.log(res.data)
    })
    .catch(err=>{
      console.log(err)
    })
  },[number]);

  //Adding the scrolling function to update the number
  const scrollToEnd=()=>{
    setNumber(number+10);
  };
// adding scroll browser api call
  window.onscroll=function(){
    // scrollToEnd();
    //checked if the page has scrolled to the bottom
    if(
      window.innerHeight + document.documentElement.scrollTop+1 >= 
        document.scrollingElement.scrollHeight
    ){
      scrollToEnd();
    }
  }
  
  return (
    <div className="App">
    {state.map((ele,i)=>(
        <div key={i} className="container">
        <h4>UserID:{ele.userId}</h4>
        <h4>Id:{ele.id}</h4>
        <h4>Title:{ele.title}</h4>
        <h4>Body :{ele.body}</h4>
        </div>
    )
      )
      }
    </div>
  );
}


export default App;
