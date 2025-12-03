import emitter from './emitter'

// 初始化購物車 ID 陣列
let cartItemIds = JSON.parse(localStorage.getItem('cartItemIds')) || []

// ✅ 回傳購物車商品 ID 陣列（保護性拷貝）
const getCartItemIds = () => {
  return [...cartItemIds]
}

// ✅ 判斷某商品是否已加入購物車
const isInCart = (id) => {
  return cartItemIds.includes(id)
}

// 新增商品進購物車（如已存在則 return false，可用來跳 alert）
const addCartItem = (id) => {
  // console.log('新增商品 addCartItem', id)
  if (!cartItemIds.includes(id)) {
    cartItemIds.push(id)
    // console.log('寫入localStorage', id)
    localStorage.setItem('cartItemIds', JSON.stringify(cartItemIds))
    // console.log('寫完的localStorage內容', cartItemIds)

    // 通知其他元件（例如 header）更新紅點
    emitter.emit('cartUpdated', id)
    return true
  } else {
    console.log('id重複加入', id)
    return false
  }
}

// 可選：移除購物車項目
const removeCartItem = (id) => {
  // console.log('刪除購物車商品 removeCartItem', id)
  const index = cartItemIds.indexOf(id) // 增刪陣列中的元素
  // console.log('index', index)
  if (index !== -1) {
    cartItemIds.splice(index, 1)
    localStorage.setItem('cartItemIds', JSON.stringify(cartItemIds))
    emitter.emit('cartDelete', cartItemIds)
  }
}

// 可選：清空購物車
const clearCart = () => {
  cartItemIds = []
  localStorage.removeItem('cartItemIds')
  emitter.emit('cartDelete', cartItemIds)
}

export default {
  getCartItemIds,
  isInCart,
  addCartItem,
  removeCartItem,
  clearCart,
}
