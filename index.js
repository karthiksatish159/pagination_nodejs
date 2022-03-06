const express = require('express');
const app = express();
const port = process.env.PORT ||3000;
const mongoose=require('mongoose');
const User=require('./models/User');
const url=require('./setup/myUrl').url;
const ejs=require('ejs');
app.set('views',__dirname+"/"+"views");
app.set('view engine','ejs');
mongoose.connect(url,{useNewUrlParser:true})
.then(()=>{
    console.log('mongo connected')
    User.countDocuments().exec()
    .then((count)=>{
        if(count==0)
        {
            Promise.all([User.create({name:'User 1'}),
            User.create({name:'User 2'}),
            User.create({name:'User 3'}),
                    ])
                    console.log("Added users");
        }
        else if(count==3)
        {
            Promise.all([User.create({name:'User 4'}),
            User.create({name:'User 5'}),
            User.create({name:'User 6'}),
            User.create({name:'User 7'}),
            User.create({name:'User 8'}),
            User.create({name:'User 9'}),
                    ])
        }
    })
    .catch((err)=>console.log(err));
})
.catch((err)=>console.log(err));
app.get('/',(req,res)=>
{
    res.render('index');
})
app.get('/users',pagenation(User), (req, res) => {
    res.send(res.pagenation);
});
function pagenation(model){
    return async(req,res,next)=>
    {
        const page=parseInt(req.query.page);
        const limit=parseInt(req.query.limit);
        const start=(page-1)*limit;
        const end=page*limit;
        const results={};
        if(start>0)
        {
        results.prev={
            page:page-1,
            limit:limit
        }
    }
        if(end<model.length)
        {
        results.next=
        {
            page:page+1,
            limit:limit
        }
    }
        try{
        results.results=await model.find().limit(limit).skip(start).exec();
        console.log(results.results);
        //next();
        }
        catch(e){
                res.status(500).json({msg:"dasdas"});
        }
        res.pagenation=results;
        next();
    }
}
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
