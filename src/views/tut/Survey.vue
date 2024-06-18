<template>
  <div>
    <input type="checkbox" v-model="selectAll" @change="toggleSelectAll"> 전체 선택
    <div v-for="(item, index) in items" :key="index">
      <input type="checkbox" v-model="item.selected"> {{ item.name }}
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

// 아이템 리스트
const items = ref([
  { name: 'Item 1', selected: false },
  { name: 'Item 2', selected: false },
  { name: 'Item 3', selected: false },
  { name: 'Item 4', selected: false },
]);

// 전체 선택 상태를 관리하는 변수
const selectAll = ref(false);

// selectAll 상태가 변경될 때마다 아이템의 selected 상태를 업데이트
watch(selectAll, (newVal) => {
  items.value.forEach(item => {
    item.selected = newVal;
  });
});

// 아이템 중 하나라도 선택 해제되면 selectAll을 false로 설정
const toggleSelectAll = () => {
  if (!selectAll.value) {
    selectAll.value = items.value.every(item => item.selected);
  }
};
</script>
