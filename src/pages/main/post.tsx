import { Post as IPost} from "./main";
import { addDoc, collection, getDocs, query, where, deleteDoc } from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props{
    post: IPost;
}


interface Like{
    userId: string;
}

export const Post = (props: Props) =>{
    const { post } = props;

    const likesRef = collection(db, "likes");
    const [user] = useAuthState(auth);

    const likesDoc = query(likesRef, where("postId", "==", post.id));

    const [likes, setLikes] = useState<Like[] | null>(null)
   
    const getLike = async () =>{
       const data = await getDocs(likesDoc);
       setLikes(
            data.docs.map((doc) =>({userId: doc.data().userId}))
        );
    }

    
    useEffect(() => {
        getLike();
    }, []);

    const addLike = async () =>{
        try{
            await addDoc(likesRef, {
                userId: user?.uid,
                postId: post.id
            });
            if(user){
                setLikes((prev) =>
                    prev ? [...prev, {userId: user.uid}] : [{userId: user.uid}]
                );
            }
        }catch (err){
            console.log(err);
        }

    }

    /*
    const removeLike = async () =>{
        try{
            await addDoc(likesRef, {
                userId: user?.uid,
                postId: post.id
            });
            if(user){
                setLikes((prev) =>
                    prev ? [...prev, {userId: user.uid}] : [{userId: user.uid}]
                );
            }
        }catch (err){
            console.log(err);
        }

    }
    */
    const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

    return(
    <div>
        <div className="title">
            <h1>{ post.title }</h1>
        </div>
        <div className="body">
            <p>{ post.description }</p>
        </div>
        <div className="footer">
            <p>@{ post.username }</p>
            <button onClick={addLike} disabled={hasUserLiked && true}> &#128077; </button>
            {likes && <p>Likes: {likes?.length}</p>}
        </div>
    </div>
    )

}