const {database, init, Card} = require('./db')
const express = require('express');
const app = express();
const path = require('path')

app.use('/src', express.static(path.join(__dirname, 'src')))

app.get('/', (req, res, next)=>{
    try{
        res.sendFile(path.join(__dirname, 'index.html'))
    }
    catch (e) {
        next (e)
    }
})

app.get('/api/cards', async(req, res, next)=>{
    try{
        res.send(await Card.findAll())
    }
    catch(e){
        next(e)
    }
})

app.delete('/api/cards/:id', async(req, res, next) =>{
    try{
        const card = await Card.findByPk(req.params.id)
        card.destroy()
        res.sendStatus(204)
    }
    catch(e){
        next(e)
    }
})

const startUp = async() =>{
    await init();
    const port = 3000;
    app.listen(port, ()=>{console.log(`listening on port ${port}`)})
}
startUp()