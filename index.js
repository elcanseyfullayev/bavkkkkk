import express from 'express'
import mongoose, { Schema } from 'mongoose';
import 'dotenv/config'
import cors from 'cors'

const blogSchema = new Schema({
    title: String,
    author: String,
    body: String,
    price: Number
});

const blogModel = mongoose.model('blog', blogSchema);

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
    const data = await blogModel.find({});
    res.send(data)
})

app.get('/:id', async (req, res) => {
    const { id } = req.params
    const data = await blogModel.findById(id);
    res.send(data)
})

app.post('/', async (req, res) => {
    const { title, author, body, price } = req.body
    const newBlog = new blogModel({ title, author, body, price })
    await newBlog.save()
    res.send('Got a POST request')
})

app.put('/:id', async (req, res) => {
    const { id } = req.params
    const { title, author, body, price } = req.body
    const data = await blogModel.findByIdAndUpdate(id, { title, author, body, price });
    res.send(data)
})

app.delete('/:id', async (req, res) => {
    const { id } = req.params
    const data = await blogModel.findByIdAndDelete(id);
    res.send(data)
})

mongoose.connect(process.env.SECRET_KEY);

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})