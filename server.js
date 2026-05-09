const express=require("express")

const app=express()
app.use(express.json())

let notes=[]

app.get("/",(req,res)=>{
    res.send("Notes API Running")
})
app.get("/notes",(req,res)=>{
    res.status(200).json(notes)
})

//add notes

app.post("/notes",(req,res)=>{
    const {title}=req.body

    if(!title){
        return res.status(400).json({
            message:"Title is required"
        })
    }
    const note={
        id:Date.now(),
        title
    }
    notes.push(note)

    res.status(201).json({
        message:"Note Added",
        data:note
    })
})

//delete note 
app.delete("/notes/:id",(req,res)=>{
    const id=parseInt(req.params.id)
    notes=notes.filter(note=>note.id !==id)
res.status(200).json({
    message:"Note Deleted"
})
})
app.listen(3000,()=>{
    console.log("server running on port 3000")
})