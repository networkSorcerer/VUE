<template>
  <div>
    <p class="">
      <span class="btn_nav bold">인원 관리</span>
      <span class="btn_nav bodl">강사 관리</span>
    </p>
    <p class="conTitle">
      <span class="conNm">강사 리스트</span>
      <span class="fr">
        <span>학생 이름</span>
        <input type="text" class="">
        <button class="btn btn-light btn-sm" @click="$router.push('write')">학생 신규 등록</button>
        <button class="btn btn-secondary btn-sm">검색</button>
      </span>
    </p>
    <div>  
      <b> 총원 : {{ total }} 현재 페이지 번호 : {{  currentPage }}</b>
    </div>
    <div class="row"> 
      <CardTu v-for="data in dataList" :key="data.loginID" :data="data"/>
    </div>
    <Pagination v-bind="{currentPage, totalItems : total, itemsPerPage : 6}" @search="searchTu($event)"/>
  </div>
</template>


<script setup>
import Pagination from '@/components/common/PaginationComponent.vue';
import { axiosAction } from '.';
import {SamplePage8} from '@/api/api';
import CardTu from './CardTu.vue';
import { onMounted, ref } from 'vue';

const dataList = ref([]);
const total = ref(0);
const currentPage = ref(1);

const searchTu = async (cpage) => {
  cpage = cpage || 1;
  let param = new URLSearchParams();
  param.append('currentPage', cpage);
  param.append('pageSize', 6);

  const TuList = await axiosAction(SamplePage8.tut_list, param);
    
  if(TuList) {
    dataList.value = TuList.list_tut;
    total.value = TuList.totalCnt;
    currentPage.value = cpage;

    console.log("리스트 데이터:", TuList.list_tut);
    console.log("총 개수:", TuList.countList_tut);
    console.log("현재 페이지:", cpage);
    
  }
}

onMounted(() => {
    searchTu();
});

</script>

<style>
.lecure-name {
    height: 30px;
    border-radius: 5px;
}

.btn-sm {
    margin-left: 10px;
}
</style>