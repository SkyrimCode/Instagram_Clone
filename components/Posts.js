import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { useEffect,useState } from "react";
import { db } from "../firebase";
import Post from "./Post"


function Posts() {
    const [posts,setPosts] = useState([]);
    useEffect(()=>{
        return onSnapshot(query(collection(db,'posts'), orderBy('timestamp','desc')),snapshot => {
            setPosts(snapshot.docs);
        })
    },[db])

    return (
        <div>
            {/* Posts */}
            {posts.map(post=>{
                return <Post key={post.id} 
                id={post.id} 
                uid={post.data().uid}
                username={post.data().username}
                userImg={post.data().profileImg}
                img={post.data().image}
                caption={post.data().caption}
                timestamp={post.data().timestamp}
                />
            })}
        </div>
    )
}

export default Posts
