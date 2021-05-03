const express=require('express')
const mongodb=require('mongodb')

const router=express.Router()

router.get('/',async (req,res)=>{
    // res.send('hello');
    const posts=await loadpostsCollection();
    res.send(await posts.find({}).toArray());
})

// 


async function loadpostsCollection(){
    const client=await mongodb.MongoClient.connect('mongodb://localhost: 27017/test',{
        useNewUrlParser: true,
    });
    return client.db('test').collection('posts')
}

module.exports=router