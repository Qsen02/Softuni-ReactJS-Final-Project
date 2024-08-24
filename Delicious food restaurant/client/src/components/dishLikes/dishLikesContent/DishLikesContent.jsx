export default function DishLikesContent({
    username
}){
   return (
       <div>
          <i className="fa-solid fa-circle-user"></i>
          <p>{username}</p>
       </div>
   )
}