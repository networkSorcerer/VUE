<template>
    <div style="margin-top: 70px">
        <div>
            <p class="conTitle">
                <span>장비 목록</span>
                <button class="btn btn-light" style="float: right; margin-top: 10px" @click="modalHandler()">장비 신규등록</button>
            </p>
            <div style="float: left">
                <b> 총건수 : {{ total }} 현재 페이지 번호 : {{ currentPage }} </b>
            </div>

            <table class="table table-info" style="margin-top: 1%">
                <thead>
                    <tr>
                        <th>강의실명</th>
                        <th>장비명</th>
                        <th>장비수</th>
                        <th>비고</th>
                        <th style="width: 10%; text-align: center">수정</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="data in dataList" :key="data.equ_id">
                        <th>{{ data.lecrm_name }}</th>
                        <td>{{ data.equ_name }}</td>
                        <td>{{ data.equ_num }}</td>
                        <td>{{ data.equ_note }}</td>
                        <td><button 수정 class="btn btn-outline-dark btn-sm" style="margin-right: 15px" @click="modalHandler(data.equ_id)" >수정</button></td>
                        
                    </tr>
                    <!-- <tr>
                        <td colspan="5" style="text-align: center">데이터가 없습니다</td>
                    </tr> -->
                </tbody>
            </table>
        </div>
        <ModalEquipment v-if="modalBoolean" @closeModal="modalBoolean= $event" 
        :lectureId="lectureId" 
        :equipId="equipId"
        @closeAndSearch="modalClose"
        />
    </div>
    <Pagination v-bind="{currentPage, totalItems : Total, itemsPerPage : 6}" @search="searchLecture($event)" v-if="dataList.length > 0"/>

</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import ModalEquipment from './ModalEquipment.vue';
const route = useRoute();
const lectureId = ref(route.params.id);
const dataList = ref([]);
const modalBoolean = ref(false);
const  equipId = ref(0);
const total = ref(0);
const currentPage = ref(0);

// 모달 팝업창 클로즈
const modalClose = (param) => {
    modalBoolean.value = param;
    getEquipmentList();
}

//팝업 창 
const modalHandler = (param) => {
    modalBoolean.value = true;
    equipId.value = param;
}

//장비 목록 출력
const getEquipmentList = (cpage) => {
    cpage = cpage || 1;
    let param = new URLSearchParams();
    param.append('cpage', cpage);
    param.append('pagesize', 5)
    param.append('lecrm_id', lectureId.value);

    axios.post('/adm/equListjson.do', param).then((res) => {
        dataList.value = res.data.listdata;
        total.value = res.data.listcnt;
        currentPage.value = cpage;
    });
};


onMounted(() => {
    getEquipmentList();
});
</script>

<style></style>
