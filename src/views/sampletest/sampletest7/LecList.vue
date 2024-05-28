<template>
    <div>
        <p class="Location">
            <span class="btn_nav bold">인원 관리</span>
            <span class="btn_nav bold"> 학생 관리</span>
        </p>
        <p class="conTitle">
            <span class="conNm">강의 리스트</span>
            <span class="fr">
                <span>학생 이름</span>
                <input type="text" class="lecure-name" />
                <button class="btn btn-light btn-sm" @click="$router.push('write')">학생 신규등록</button>
                <button class="btn btn-secondary btn-sm" >검색</button>
            </span>
        </p>
        <div>
            <b> 총 원 : {{ total }} 현재 페이지 번호 : {{ currentPage }} </b>
        </div>
        <div class="row">
            <CardStu v-for="data in dataList" :key="data.lec_id" :data="data" />
        </div>
        <Pagination v-bind="{currentPage, totalItems : total, itemsPerPage : 6}" @search="searchLecture($event)" v-if="dataList.length > 0"/>
        <StuList/>
     </div>
</template>

<script setup>

import { onMounted, ref } from 'vue';
import Pagination from '@/components/common/PaginationComponent.vue';
import { SamplePage7 } from '@/api/api';
import {axiosAction} from '.';
import CardStu from './CardStu.vue';
import StuList from './StuList.vue';


const dataList = ref([]);
const total = ref(0);
const currentPage = ref(1);

const searchLecture = async (cpage) => {
    cpage = cpage || 1;
    let param = new URLSearchParams();
    param.append('cpage', cpage);
    param.append('pagesize', 6);


    // axios.post('/adm/lectureRoomListjson.do', param).then((res) => {
    //     dataList.value = res.data.listdata;
    //     total.value = res.data.listcnt;
    //     currentPage.value = cpage;
    // });

    const lecList = await axiosAction(SamplePage7.lec_list, param);

    if(lecList) {
        dataList.value =lecList.listdata;
        total.value =   lecList.listcnt;
        currentPage.value = cpage;
    }

};

onMounted(() => {
    searchLecture();
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