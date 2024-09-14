import { useNavigate, useParams } from "react-router-dom";
import {  useGetOneComment } from "../../../hooks/useComments";
import { Form, Formik } from "formik";
import CustomInput from "../../../commons/CustomInput";

type CommentEditProps={
    setMovie: React.Dispatch<React.SetStateAction<{}>>
}

export default function CommentEdit({
    setMovie
}:CommentEditProps){
    const {movieId,commentId}=useParams();
    const {comment}=useGetOneComment({},commentId);
    const navigate=useNavigate();

    return (
        <div>
            <Formik>
                {
                    (props)=>(
                        <Form>
                            <h2>Edit your comment</h2>
                            <CustomInput type="text" name="content"/>
                            <button type="submit">Edit</button>
                            <button>Cancel</button>
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}