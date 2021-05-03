const express=require('express')
const mongodb=require('mongodb')

const router=express.Router()

router.get('/',async (req,res)=>{
    // res.send('hello');
    const phones=await loadPhonesCollection();
    res.send(await phones.find({}).toArray());
})


async function loadPhonesCollection(){
    const client=await mongodb.MongoClient.connect('mongodb://localhost: 27017/test',{
        useNewUrlParser: true,
    });
    return client.db('test').collection('phones')
}

module.exports=router