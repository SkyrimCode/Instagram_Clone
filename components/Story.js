function Story({img,username}) {
    const defaultImg = (e) => {
        e.target.src= 'https://drive.google.com/uc?export=view&id=1Kw6V5ieFm5TcUkZFpcMG-n_D6uxEJzkn'
        
    }
    return (
        <div>
            <img className="h-14 w-14 rounded-full p-[1.5px] border-red-500 border-2 object-contain cursor-pointer hover:scale-110 trasition transform duration-200 ease-out" onError={defaultImg} src={img} alt=""/>
            <p className="text-xs w-14 truncate text-center">{username}</p>
        </div>
    )
}

export default Story
