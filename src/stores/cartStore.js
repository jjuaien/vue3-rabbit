//封装购物车模块

import { defineStore } from "pinia"
import { ref } from "vue"


export const useCartStore = defineStore('cart', () => {
  //1、定义state - carList
  const cartList = ref([])
  //2、定义action - addCart
  const addCart = (goods) => {
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

  //删除购物车
  const delCart = (skuId) => {
    //1、找到要删除项的下标值，用slice  不好写，但是可能不用遍历全部
    //2、用filter 好写，但是要遍历全部**
    const idx = cartList.value.findIndex((item) => skuId === item.skuId)
    cartList.value.splice(idx, 1)
  }

  return {
    cartList,
    addCart,
    delCart
  }
}, {
  persist: true,
})