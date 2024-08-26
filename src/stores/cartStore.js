//封装购物车模块

import { defineStore } from "pinia"
import { ref } from "vue"
import { computed } from "vue"
import { useUserStore } from "./userStore"
import { insertCartAPI } from "@/apis/cart"
import { findNewCartListAPI } from "@/apis/cart"
import { delCartAPI } from "@/apis/cart"


export const useCartStore = defineStore('cart', () => {

  //抽象一个获取最新购物车列表函数
  const updateNewList = async () => {
    const res = await findNewCartListAPI()
    cartList.value = res.result
  }


  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.token)
  //1、定义state - carList
  const cartList = ref([])
  //2、定义action - addCart
  const addCart = async (goods) => {
    const { skuId, count } = goods
    if (isLogin.value) {
      //登录之后
      await insertCartAPI({ skuId, count })
      updateNewList()
    } else {
      //添加购物车操作
      //已添加过  count + 1
      //没有添加过，直接push
      //通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了即添加过
      const item = cartList.value.find((item) => goods.skuId === item.skuId)
      if (item) {
        item.count += goods.count
      } else {
        cartList.value.push(goods)
      }
    }
  }

  //删除购物车
  const delCart = async (skuId) => {
    if (isLogin.value) {
      //调用接口实现删除
      await delCartAPI([skuId])
      updateNewList()

    } else {
      //1、找到要删除项的下标值，用slice  不好写，但是可能不用遍历全部
      //2、用filter 好写，但是要遍历全部**
      const idx = cartList.value.findIndex((item) => skuId === item.skuId)
      cartList.value.splice(idx, 1)
    }
  }


  //单选功能
  const singleCheck = (skuId, selected) => {
    //通过skuId找到要修改的一项，把它的selected改为传来的selected
    const item = cartList.value.find((item) => item.skuId === skuId)
    item.selected = selected
  }

  //全选功能
  const allCheck = (selected) => {
    //把每一项的selected都设置为当前
    cartList.value.forEach(item => item.selected = selected)
  }

  //计算
  //1、总的数量
  const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
  //2、总价
  const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))
  //3、已选择数量
  const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
  //4、已选择商品合计
  const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))
  //是否全选
  const isAll = computed(() => cartList.value.every((item) => item.selected))


  return {
    cartList,
    addCart,
    delCart,
    allCount,
    allPrice,
    singleCheck,
    isAll,
    allCheck,
    selectedCount,
    selectedPrice
  }
}, {
  persist: true,
})