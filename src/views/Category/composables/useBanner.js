//封装banner轮播图相关代码
import { ref } from "vue"
import { getBannerAPI } from "@/apis/home"
import { onMounted } from "vue"
export function useBanner() {
  //获取banner
  const bannerList = ref([])

  const getBanner = async () => {
    const res = await getBannerAPI({
      distributionSite: '2'
    })
    bannerList.value = res.result

  }
  onMounted(() => getBanner())

  return {
    bannerList
  }
}