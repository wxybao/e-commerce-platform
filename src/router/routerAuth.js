import router from "@/router/index.js";

router.beforeEach(async (to, from, next)=>{
  console.log(to);
  next()
})