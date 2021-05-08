import axios from 'axios';

const url='http://localhost:3000/api/phones';

class PostService{

//     // static getPosts(){
//     //     return new Promise (function(resolve,reject){
//     //         try{
//     //             const res=  axios.get(url);
//     //             const dataPromise = res.then((response) => response.data)
//     //             console.log("hhh",dataPromise)
//     //             console.log("this is",res.data)

//                 // const data=res.data;

//                 // const data=res.json();
//                 // resolve(data.map(post=>({
//                 //     ...post,
//                 //     createdAt:new Date(post.createdAt)
//                 // }) ));
// //                 resolve (res.data)
// //             }catch(err){
// //                 reject(err);

// //             }
// //         })

// //     }

static getPosts(){
    axios(url).then(response=>{
        console.log('response',response.data)
        
    })
    .catch(error=>{
        console.log('error',error)
    })
    
}
}
export default PostService