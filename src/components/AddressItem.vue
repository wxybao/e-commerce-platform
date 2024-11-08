<template>
  <div class="address-list-item">
    <div class="flex-left">
      <div class="qi mr-10">Qi 123455678</div>
      <div class="line-under mr-16">Редактировать</div>
      <div class="line-under">Удалить</div>
    </div>

    <ul class="address-ul">
      <li>Город：Москва (Moscow)</li>
      <li>Улица：Реве Роуд (Reve Road)</li>
      <li>Номер здания：36 (36)</li>
      <li>Единица：1 (1) Этаж:8B (8B)</li>
      <li> Вызов в здание：26a (26а)</li>
    </ul>

    <slot v-if="$slots.footer" name="footer"></slot>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
.address-list-item {
  padding: 24px 0px;
  border-bottom: 1px solid #E0E5EB;
  color: #4E5562;

  .qi {
    font-weight: bold;
    color: #181D25;
    font-size: 16px;
  }

  .line-under {
    text-decoration: underline;
  }

  .address-ul {
    margin-top: 16px;
    list-style: disc;
    margin-left: 22px;

    li {
      line-height: 26px;
    }
  }
}
</style>