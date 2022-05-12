const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion,ObjectId  } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;
const app =express();


app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qtxre.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log('db connected')
async function run(){
try{
    await client.connect();
    const inventoryItemsCollection = client.db('warehouse').collection('inventoryItems');
      // inventoryItems API or route
      app.get('/inventoryItems', async (req, res) => {
        const query = {};
        const cursor =inventoryItemsCollection.find(query);
        const inventoryItems = await cursor.toArray();
        res.send(inventoryItems);
    });
    app.get('/ManageInventories', async (req, res) => {
        const query = {};
        const cursor =inventoryItemsCollection.find(query);
        const ManageInventories = await cursor.toArray();
        res.send(ManageInventories);
    });
    app.get('/inventoryItems/:id', async(req, res) =>{
        const id = req.params.id;
        const query = {_id:ObjectId(id)};
        const result = await inventoryItemsCollection.findOne(query);
        res.send(result);
    });
    //Delete API
    app.delete('/inventoryItems/:id', async(req, res) =>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const result = awaitinventoryItemsCollection.deleteOne(query);
        res.send(result);
    });
    app.post('/inventoryItems', async(req, res) =>{
        const newItem = req.body;
      
        const result = await inventoryItemsCollection.insertOne(newItem);
        res.send(result)
    });

}
finally{

}
}
run().catch(console.dir)


app.get('/',(req,res)=>{
    res.send('warehouse is running');

});

app.listen(port,()=>{
    console.log('warehouse is running',port);
})
