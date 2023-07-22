import React from 'react'
import "./Dashboard.css"


const Blocks = ({data,setMainBlock}) => {
  
  // console.log(data.transactions)
  return (
    <>
    <button onClick={()=>setMainBlock(null)} style={{fontSize:"20px",borderRadius:"8px",cursor:"pointer"}}>Back to All Blocks</button>
    <h2 >Showing Transactions from Block Number :{data.number}</h2>
    <h2>Block Hash :{data.hash}</h2>
    <h2>Gas Limit :{parseInt(data.gasLimit)}</h2>
    <h2>Transaction Count :{data.transactions.length}</h2>
    {
      data.transactions.length ? 
      <table id="block-table">
        <thead>
           <tr>
            <th className='headings'>Transaction Hash</th>
            <th className='headings'>From</th>
            <th className='headings'>To</th>
            <th className='headings'>Value</th>
           </tr>
        </thead>
        <tbody  style={{fontFamily:"sans-serif",fontSize:"20px"}}>
           {
            data.transactions.map((allTrans,i)=>{
            return (
              <tr key={i}>
                <td className='td'>{allTrans.hash}</td>
                <td className='td'>{allTrans.from}</td>
                <td className='td'>{allTrans.to}</td>
                <td className='td'>{parseInt(allTrans.value._hex) / Math.pow(10,18)} ETH</td>
              </tr>
            )
            })
           }
        </tbody>
      </table>:""
    }

    </>
    
  )
}

export default Blocks