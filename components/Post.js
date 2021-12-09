import {
    BookmarkIcon,
    ChatIcon,
    DotsHorizontalIcon,
    EmojiHappyIcon,
    HeartIcon,
    PaperAirplaneIcon,
    TrashIcon
} from "@heroicons/react/outline"
import { useSession} from "next-auth/react"
import {HeartIcon as HeartIconFilled } from "@heroicons/react/solid"
import { useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from "@firebase/firestore";
import { db } from "../firebase";
import React from "react"
import Moment from "react-moment"


function Post({id,uid,username,userImg,img,caption,timestamp}) {
    const {data:session} = useSession();
    const [comments,setComments] = useState([]);
    const [comment,setComment] = useState("");
    const [likes,setLikes]=useState([]);
    const [hasLiked,setHasLiked] = useState(false);

    useEffect(()=> {
        return onSnapshot(query(collection(db,'posts',id,'comments'),orderBy('timestamp','desc')),snapshot=>
        setComments(snapshot.docs))
    },[db,id])

    const sendComment = async(e) => {
        e.preventDefault();
        const commentToSend = comment;
        setComment('');

        const commentRef = await addDoc(collection(db,'posts',id,'comments'),{
            comment: commentToSend,
            username: session?.user?.username,
            userImage: session?.user?.image,
            timestamp: serverTimestamp(),
            uid: session?.user?.uid
        })
        console.log('Comment id is = ',commentRef.id)
    }

    useEffect(() => onSnapshot(collection(db,'posts',id,'likes'),snapshot=>
        setLikes(snapshot.docs)
    ),[db,id])

    const likePost = async() =>{
        if(hasLiked)
        {
            await deleteDoc(doc(db,'posts',id,'likes',session.user.uid))
        }
        else{
            await setDoc(doc(db,'posts',id,'likes',session?.user?.uid), {
            username:session?.user?.username
        })
        }
    }

    useEffect(()=>{
        setHasLiked(likes.findIndex(like=> (like.id === session?.user?.uid))!==-1)
    },[likes])

    const deletePost = async() =>{
        await deleteDoc(doc(db,'posts',id))
    }

    const deleteComment = async(cid) =>{
        console.log('Deleted ',cid)
        await deleteDoc(doc(db,'posts',id,'comments',cid))
    }
    const defaultImg = (e) => {
        e.target.src= 'https://drive.google.com/uc?export=view&id=1Kw6V5ieFm5TcUkZFpcMG-n_D6uxEJzkn'
    }

    
    const [isDesktop, setDesktop] = useState(window.innerWidth > 767);
    
    const updateMedia = () => {
        setDesktop(window.innerWidth > 767);
    };
    
    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });
    
    return (
        <div className="bg-white my-7 border rounded-sm">
            {/* Header */}

            <div className="flex items-center p-5">
                <img onError={defaultImg} src={userImg} className="rounded-full h-12 w-12 object-contain border p-1 mr-3"/>
                <p className="flex-1 font-bold">{username}</p>
                {(session?.user?.uid===uid || session?.user?.uid===process.env.UID)? (
                <TrashIcon onClick={deletePost} className="h-5 hover:text-red-700 hover:scale-125"/>):
                (<></>)}

                
            </div>

            {/* Image */}
            <img src={img} className="object-cover w-full"/>
            {/* Buttons */}
            {session && (
                 <div className="flex justify-between px-4 pt-4">
                 <div className="flex space-x-4">
                     {hasLiked?(
                         <HeartIconFilled onClick={likePost} className="btn text-red-500"/>
                     ):
                     (
                        <HeartIcon onClick={likePost} className='btn'/>
                     )}
                     
                     <ChatIcon className='btn'/>
                     <PaperAirplaneIcon className='btn'/>
                 </div>
                 <BookmarkIcon className='btn'/>
             </div>
            )}
           
            {/* caption */}
            <p className="pl-5 truncate">
            <p className="pt-3 truncate">
                {likes.length>0 && (
                    <p className='font-semibold mb-1'>{likes.length} likes</p>
                )}
            </p>
            <p className="pt-3 truncate">
                <span className="font-bold mr-1">{username}</span>
                {caption}
                </p>
                <p className="pb-3">
                <Moment fromNow className="uppercase text-gray-500" style={{fontSize:'0.7rem',fontWeight:'400'}}>
                    {timestamp.toDate()}
                </Moment>
                </p>
            </p>
            {/* Comments */}
                {comments.length>0 && (
                    <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
                        {comments.map(comment => {
                            return <div key={comment.id} className="group ">
                                {!isDesktop?(
                                <div className='group-hover:bg-gray-50 space-x-2 p-2 break-all'>
                                    <div className="flex">
                                    <img className="h-7 rounded-full" src={comment.data().userImage}/>
                                    <p className="ml-2 text-sm flex-1"><span className="font-bold align-middle">{comment.data().username}</span></p>
                                    
                                    {(session?.user?.uid===comment.data().uid || session?.user?.uid===process.env.UID || uid===session?.user?.uid)? (
                                    <>
                                    <Moment fromNow className="pr-5 flex items-center font-thin uppercase group-hover:pr-2 group-hover:slideleft align-middle" style={{fontSize:'0.6rem'}}>
                                        {comment.data().timestamp?.toDate()}
                                    </Moment>
                                    <div className="flex items-center"><TrashIcon onClick={()=>deleteComment(comment.id)} className="pr-5 h-5 hover:text-red-700 hidden group-hover:block group-hover:slideleft"/></div></>):(
                                            
                                    <>
                                    <Moment fromNow className="pr-5 text-xs uppercase">
                                        
                                        {comment.data().timestamp?.toDate().toString().toLocaleUpperCase()}
                                    </Moment>
                                    </>
                                    )}
                                    </div>
                                    <p className="pl-7 pr-5">{comment.data().comment}</p>

                                </div>):(

                                <div className='group-hover:bg-gray-50 flex space-x-2 p-2 break-all'>
                                <img className="h-7 rounded-full" src={comment.data().userImage}/>
                                <p className="text-sm flex-1"><span className="font-bold">{comment.data().username}</span>{" "}{comment.data().comment}</p>
                                
                                {(session?.user?.uid===comment.data().uid || session?.user?.uid===process.env.UID || uid===session?.user?.uid)? (
                                <>
                                <Moment fromNow className="pr-5 flex items-center font-thin uppercase group-hover:pr-2 group-hover:slideleft align-middle" style={{fontSize:'0.6rem'}}>
                                    {comment.data().timestamp?.toDate()}
                                </Moment>
                                <div className="flex items-center"><TrashIcon onClick={()=>deleteComment(comment.id)} className="pr-5 h-5 hover:text-red-700 hidden group-hover:block group-hover:slideleft"/></div></>):(
                                    
                                <>
                                
                                <Moment fromNow className="pr-5 text-xs uppercase">
                                    
                                    {comment.data().timestamp?.toDate().toString().toLocaleUpperCase()}
                                </Moment>
                                </>
                                )}
                                </div>)}
                            </div>
                        })}
                    </div>
                )}

            {/* Input Box */}
            {session && (
            <form className="flex items-center p-4"> 
                 <EmojiHappyIcon className="h-7"/>
                 <input type="text" value={comment} onChange={e=>setComment(e.target.value)} placeholder="Enter comment..." className="border-none flex-1 focus:ring-0 outline-none" />
                 <button type='submit' disabled={!comment.trim()} onClick={sendComment} className="font-semibold text-blue-400">Post</button>
             </form>
            )}
           

        </div>
    )
}

export default Post
