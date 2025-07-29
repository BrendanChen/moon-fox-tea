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

// ✅ 新增商品進購物車（如已存在則 return false，可用來跳 alert）
const addCartItem = (id) => {
  console.log(id)
  if (!cartItemIds.includes(id)) {
    cartItemIds.push(id)
    console.log('寫入localStorage', cartItemIds)
    localStorage.setItem('cartItemIds', JSON.stringify(cartItemIds))

    // 通知其他元件（例如 header）更新紅點
    emitter.emit('cartUpdated', id)
    return true
  } else {
    return false
  }
}

// ✅ 可選：移除購物車項目
const removeCartItem = (id) => {
  const index = cartItemIds.indexOf(id)
  if (index !== -1) {
    cartItemIds.splice(index, 1)
    localStorage.setItem('cartItemIds', JSON.stringify(cartItemIds))
    emitter.emit('cartUpdated', cartItemIds.length)
  }
}

// ✅ 可選：清空購物車
const clearCart = () => {
  cartItemIds = []
  localStorage.removeItem('cartItemIds')
  emitter.emit('cartUpdated', 0)
}

export default {
  getCartItemIds,
  isInCart,
  addCartItem,
  removeCartItem,
  clearCart,
}
