import React ,{useState,useEffect}from 'react'
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";

export default function BookCard(props) {
  const navigate=useNavigate()
    const firebase=useFirebase()
    const [url,seturl]=useState(null)
    useEffect(()=>{
    firebase.getimageurl(props.Imageurl).then((url)=>{seturl(url)}).catch((error) => {
      if (error.code === 'storage/object-not-found') {
        console.error('File does not exist.');
      } else {
        console.error('An error occurred:', error);
      }
    }); 
    })
  return (
    <div>
    <div className="max-w-sm mt-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img className="rounded-t-lg w-[10rem] " src={url} alt="SOme error occured" />
        <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.name}</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">This book has  a title {props.name} and it is sold by {props.displayName}</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">₨ {props.price}</p>
            <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"  onClick={(e)=>
              navigate(`book/${props.id}`)}>
                Read more
            </button>
        </div>
    </div>


</div>
  )
}
