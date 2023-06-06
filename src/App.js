import './App.css';
import { useState } from 'react';
import background from'./background.jpg';
function App() {
  const [message,setmessage]=useState(null)
  const [val,setvalue]=useState();
  const [token,settoken]=useState();
  const [cost,setcost]=useState(0);
  const[time,settime]=useState();
  const getMessages = async ()=>{
    const options={
      method:"POST",
      body: JSON.stringify({
        message: val
      }),
      headers:{
        "Content-Type":"application/json"
      }
    }
     try{
        const start=Date.now();
        const response = await fetch('http://localhost:8000/completion',options)
        const data=await response.json()
        console.log(data)
        setmessage(data.choices[0].message.content)
        const end=Date.now();
        settime(end-start);
        settoken(data.usage.total_tokens);
        setcost((0.2*token));
     }
     catch(error){
         console.log(error)
     }

  }
  return (
    <div className="App">
      <div className="container">
        <div className="row flex-container">
          <div className=" col-sm-12 input " style={{ backgroundImage: `url(${background})`} }>
            <h1 style={{color:"white"}}>Ask Your Query..</h1>
              <input 
              value={val} 
              onChange={(e)=> setvalue(e.target.value)}
              placeholder="Enter your query"
              />
              <button type="submit"  onClick={getMessages}>Send</button>
          </div>
          <div className="row output">
            <div className="col-sm-8 out ">
              <h1>Output</h1>
              <div className="out1">
                {message !== 'Your Answer....' && <p>{message}</p>}
              </div>
              
            </div>
            <div className="col-sm-4 analysis">
              <h1>Analysis</h1>
              <div className="w-100 row my-3 d-flex justify-content-center">
                <div className='temp h-33 my-1 mx-2'>
                  <h4>Cost(in $*10^-5)</h4>   
                  <h1 className="hdg">{cost}</h1>
                </div>
                <div className='temp h-33 my-1 mx-2'>
                  <h4>No. of Tokens</h4>
                  <h1 className="hdg">{token}</h1>
                </div>
                <div className='temp h-33 my-1 mx-2'>
                   <h4>Time(in ms) </h4>
                  <h1 className="hdg">{time}</h1>
                </div>
              </div>
            </div>
             
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
