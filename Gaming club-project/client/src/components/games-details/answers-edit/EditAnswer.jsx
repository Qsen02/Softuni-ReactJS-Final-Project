import { useParams } from "react-router-dom"
import { useGetOneAnswer } from "../../../hooks/useAnswers"

export default function EditAnswer(){
    const {answerId}=useParams();
    const {answer}=useGetOneAnswer({},answerId);
   return (
       <></>
   )
}