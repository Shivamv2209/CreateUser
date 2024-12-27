import express from "express"
import user_model from "./models/user_model.js";
const app= express();
const port=3000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("app.ejs");
})

app.get("/read", async (req,res)=>{
   let users = await user_model.find();
   res.render("read.ejs",{users})
})

app.post("/create", async (req,res)=>{
    let {name,email,image}=req.body;
   let createdUSer = await user_model.create({
        name,
        email,
        image,
    });

    res.redirect("/read");
})

app.get("/edit/:userid", async (req,res)=>{
   let user = await user_model.findOne({_id:req.params.userid});
   res.render("edit.ejs",{user});
})

app.post("/update/:userid", async (req,res)=>{
    let {image,name,email}=req.body;
    let updateuser = await user_model.findOneAndUpdate({_id:req.params.userid},{name,image,email},{new:true});
    res.redirect("/read");
 })
 

app.get("/delete/:id", async (req,res)=>{
    let user = await user_model.findOneAndDelete({_id : req.params.id});
    res.redirect("/read");
})



app.listen(port,()=>{
    console.log(`Server is running on the port ${port}`);
});

