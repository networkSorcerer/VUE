<template>
    <div v-show="show">
      <h2>강사 정보 - {{ tutor.name }}</h2>
      <p>
        </p>
      <button @click="$emit('close')">닫기</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      show: Boolean,
      tutor: Object,
    },
  };
  </script>


