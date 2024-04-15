import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { Post } from "./post";

export interface Post {
    id: string;
    userId: string;
    title: string;
    username: string;
    description: string;
}

export const Main = () =>{
    const postsRef = collection(db, "posts");
    const [postsList, setPostLists] = useState<Post[] | null>(null);

    const getPosts = async () =>{ //all our firestore opeations needs an await
        const data = await getDocs(postsRef);
        setPostLists(
            data.docs.map((doc) =>({...doc.data(), id: doc.id})) as Post[]
        );
    };

    useEffect(() => {
        getPosts();
    }, []);

    return(
        <div>
            {postsList?.map((post) => (
                <Post post={ post } />
            ))}
        </div>
    )
}