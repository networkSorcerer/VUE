<template>
    <div>
        <p class="Location">
            <span class="btn_nav bold">인원 관리</span>
            <span class="btn_nav bold"> 강사 리스트</span>
        </p>
        <p class="conTitle">
            <span class="conNm">강사</span>
            <span class="fr">
                <span>강사 명</span>
                <input type="text" class="lecure-name" />
                <button class="btn btn-light btn-sm" @click="$router.push('write')">강사 신규등록</button>
                <button class="btn btn-secondary btn-sm"  @click="searchTutor">검색</button>
            </span>
        </p>
        <div>
            <b> 총 원 : {{ total }} 현재 페이지 번호 : {{ currentPage }} </b>
        </div>
        <div class="row">
          <CT v-for="data in dataList" :key="data.loginID" :data="data"/>
        </div>
        <Pagination v-bind="{currentPage, totalItems : total, itemsPerPage : 6}" @search="searchTu($event)"/>
   </div>
</template>
<script setup>
import CT from './CT.vue';
import { onMounted, ref } from 'vue';
import Pagination from '@/components/common/PaginationComponent.vue';
import { SamplePage3 } from '@/api/api';
import {axiosAction} from '.';

const dataList = ref([]);
const total = ref(0);
const currentPage = ref(1);

const searchTutor = async (cpage) => {
    cpage = cpage || 1;
    let param = new URLSearchParams();
    param.append('currentPage', cpage);
    param.append('pageSize', 6);

    const tutorList = await axiosAction(SamplePage3.t_list, param);

    if(tutorList) {
        dataList.value = tutorList.list_tut;
        total.value = tutorList.totalCnt;
        currentPage.value = cpage;
    }
};

onMounted(() => {
    searchTutor();
})

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