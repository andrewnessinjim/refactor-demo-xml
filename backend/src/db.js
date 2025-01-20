const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb://petsEnquiry-user:petsEnquiry-pass@localhost:27017/?authSource=admin";

const mongoClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await mongoClient.connect();

    // Send a ping to confirm a successful connection
    await mongoClient.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB! 🍃"
    );
  } finally {
    // Ensures that the client will close when you finish/error
  }
}

run().catch(console.dir);

module.exports = mongoClient;
