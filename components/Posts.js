import Post from "./Post"

const posts=[
    {
        id: '123',
        username: 'skyrim',
        userImg: 'https://drive.google.com/uc?export=view&id=1Sw0CzeXJh3LlyhBgyzOug5J8OYmFAc4A',
        img: 'https://drive.google.com/uc?export=view&id=1Sw0CzeXJh3LlyhBgyzOug5J8OYmFAc4A',
        caption: 'This is my first post',
    },
    {
        id: '124',
        username: 'skyrim',
        userImg: 'https://drive.google.com/uc?export=view&id=1Sw0CzeXJh3LlyhBgyzOug5J8OYmFAc4A',
        img: 'https://drive.google.com/uc?export=view&id=1Sw0CzeXJh3LlyhBgyzOug5J8OYmFAc4A',
        caption: 'This is my first post',
    },
]
function Posts() {
    return (
        <div>
            {/* Posts */}
            {posts.map(post=>(
                <Post key={post.id} 
                id={post.id} 
                username={post.username}
                userImg={post.userImg}
                img={post.img}
                caption={post.caption}
                />
            ))}
        </div>
    )
}

export default Posts
