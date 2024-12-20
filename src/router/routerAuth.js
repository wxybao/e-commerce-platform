import router from "@/router/index.js";
import {useUserStore} from "@/stores/user.js";

router.beforeEach(async (to, from, next)=>{
  const currentShopId = useUserStore().shopId

  if (currentShopId && !to.path.includes(currentShopId)) {
    const newPath = `/${currentShopId}${to.path}`;
    next(newPath);
    return
  }

  next()
})