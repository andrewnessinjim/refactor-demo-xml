const Koa = require("koa");
const KoaRouter = require("koa-router");
const jsonPrettier = require("koa-json");
const mongoClient = require("./db");

const app = new Koa();
const router = new KoaRouter();

app.use(jsonPrettier());

app.use(router.routes()).use(router.allowedMethods());

router.get("/test", async (ctx) => {
  const petsConfigCol = mongoClient
    .db("petsEnquiry")
    .collection("petsConfiguration");

  const options = {
    projection: { _id: 0, value: 1, label: 1 },
  };

  const result = await petsConfigCol.find({}, options).toArray();
  const uiFormat = {};
  result.forEach((doc) => {
    uiFormat[doc.value] = doc.label;
  });
  ctx.body = uiFormat;
});

app.listen(4000, () => console.log("Server started on port 4000"));
