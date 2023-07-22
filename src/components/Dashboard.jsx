
import React, { useEffect,useCallback,useState } from 'react';
import { ethers } from "ethers";
import Blocks from './Blocks';
import moment from 'moment';
import "./Dashboard.css"

const minifyAddress = (address, middleChars = 6, endChars = 4) => {
    if (!address) return "";
    if (address.length < 20) return address;
    if (address.substr(-4) == ".eth") return address;
    return `${address.substring(0, middleChars + 2)}...${address.substring(
        address.length - endChars,
    )}`;
};

 const replaceAddresswithMinification = (string, middleChars = 7, endChars = 4) => {
    if (!string) return "";

    return string.replaceAll(/0x[a-zA-Z0-9]{64}/g, match => {
        return minifyAddress(match, middleChars, endChars);
    });
};


const Dashboard = () => {

   
    const [last_block_Number,setLast_block_Number]=useState(null);
    const [blocks,setBlocks]=useState([]);
   const [mainBlock,setMainBlock]=useState(null)

    const getBlocks=useCallback(async(provider)=>{
        const block_Number=await provider.getBlockNumber();
        if(block_Number!==last_block_Number){
            setLast_block_Number(block_Number);
            const block=await provider.getBlockWithTransactions(block_Number);
            
             setBlocks(i=>{
                if(i.length>=10){
                    i.pop();
                }
                return [block,...i];
             })
        }


    },[last_block_Number]);
     
    useEffect(()=>{
        const provider=new ethers.providers.InfuraProvider(null,"310b752459754842a6d0b5d6d9e617a2");
        const timerCall=setInterval(()=>{
            getBlocks(provider);
        },1500);

        return ()=>{
            clearInterval(timerCall);
        }
    },[getBlocks]);



    

  return (<>
    <div>
        <h1>Block Viewer</h1>
    </div>
    
  
        {!mainBlock ? blocks.length? 
        <>
        <h2>10 Latest blocks are shown</h2>
          <table id="table">
          <thead>
              <tr >
                  <th className="headings" >Block Number</th>
                  <th  className="headings">Block Hash</th>
                  <th  className="headings">Gas Limit</th>
                  <th  className="headings">Transaction Count</th>
                  <th  className="headings">Timestamp</th>
              </tr>
          </thead>
          <tbody style={{fontFamily:"sans-serif",fontSize:"20px"}}>
           {
            blocks.map((data,i)=>{
                return (
                    <tr key={i}>
                        <td onClick={()=>setMainBlock(data)} style={{cursor:"pointer",textDecoration:"underline"}}>{data.number}</td>
                        <td>{replaceAddresswithMinification(data.hash,4,4)}</td>
                         <td>{parseInt(data.gasLimit)}</td>
                           <td>{data.transactions.length}</td>
                          <td>Today at {moment.unix(data.timestamp).format('HH:mm')}</td>
                    </tr>
                )
            })
           }
        </tbody>
        </table>
        </>
        :"" 
        :<Blocks data={mainBlock} setMainBlock={setMainBlock}/>
        }
       
   
   
  </>
  )
}

export default Dashboard