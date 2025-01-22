const Koa = require("koa");
const KoaRouter = require("koa-router");
const jsonPrettier = require("koa-json");
const bodyParser = require("koa-bodyparser");

const { getPetListForUI, getConfigForPet } = require("./petConfig");
const { initRabbitMQ, send } = require("./rabbitmq");
const { processPetEnquiry } = require("./petEnquiry/processor");

(async () => {
  await initRabbitMQ();
})();

const app = new Koa();
const router = new KoaRouter();

app.use(jsonPrettier());
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

router.get("/config/petList", async (ctx) => {
  ctx.body = await getPetListForUI();
});

router.get("/config/pet/:pet", async (ctx) => {
  const { pet } = ctx.params;
  ctx.body = await getConfigForPet(pet);
});

router.post("/petEnquiry", async (ctx) => {
  const requestBody = ctx.request.body;
  ctx.body = await processPetEnquiry(requestBody);
});

app.listen(4000, () => console.log("Server started on port 4000"));
