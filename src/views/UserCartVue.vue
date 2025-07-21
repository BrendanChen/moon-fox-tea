<template>
  <div class="banner">
    <div class="content">
      <h1>Make Your Tea time</h1>
      <h1>best With only fox tea</h1>
      <button class="mBtn">立即選購</button>
    </div>
  </div>
  <div>123</div>
  <div>123</div>
  <div>123</div>
  <div>123</div>
  <div>123</div>
  <div>123</div>
  <div>123</div>
  <div>123</div>
  <div>123</div>
  <div>123</div>
  <div>123</div>
  <div>123</div>
  <div>123</div>
  <div>123</div>
  <div>123</div>
  <div>123</div>
  <div>123</div>
  <div>123</div>
  <div>123</div>
  <div>123</div>
  <div>123</div>
  <div>123</div>
  <div>123</div>
  <div>123</div>
  <div>123</div>
</template>

<style scoped lang="scss">
.banner {
  width: 100%; /* 滿版 */
  height: 500px; /* 設定高度 */
  background-image: url('../assets/images/banner-image.jpg'); /* 設定背景圖片 */
  background-size: cover; /*  圖片覆蓋整個區域，可能會有部分圖片被裁切 */
  background-position: center; /*  圖片置中 */
  background-repeat: no-repeat; /*  不重複 */
  color: white; /*  設定文字顏色 */

  display: flex;
  justify-content: center; /* 水平置中 */
  align-items: center; /* 垂直置中 */
}

.content {
  padding: 20px; /*  設定內容的內距 */
}

.content .mBtn {
  background-color: #ffffff;
  border: none;
  display: block; // 必須是 block 或 flex 元素才可用 margin auto
  margin: 0 auto; // ⬅ 水平置中
}

.content .mBtn:hover {
  background-color: #87a9bc;
  color: #ffffff;
  border: none;
}

.mBtn {
  padding: 14px 60px;
  font-size: 16px;
}
</style>
