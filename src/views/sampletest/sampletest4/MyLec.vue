<template>
  <div> 
    <div> 
        <div> 
            <div> 
                <p>/ 학습관리</p>
            </div>
            <div> 
                <h3>나의 수강 목록</h3>
            </div>
            <div> 
                <select v-model="searchKey" >
                    <option value="">전체 수강 목록</option>
                    <option value="ProceedingLec">진행중인 수강 목록</option>
                    <option value="LastLec">지난 수강 목록</option> 
                </select>
            </div>
            <div> 
                <table>
                    <tr>
                        <td>강의 번호</td>
                        <td>강의 명</td>
                        <td>강사명</td>
                        <td>강의실</td>
                        <td>기간</td>
                        <td>승인여부</td>
                        <td>설문조사참여</td>
                        <td>설문조사여부</td>
                    </tr>
                    <tr v-for="data in dataList" :key="data.lec_id">
                        <td>{{ data.lec_id }}</td>
                        <td>{{ data.lec_name }}</td>
                        <td>{{ data.tut_name }}</td>
                        <td>{{ data.start_date }} ~ {{ data.end_date }}</td>
                        <td>{{ data.lecrm_name }}</td>
                        <td>{{ data.apv_yn }}</td>
                        <template v-if="lectureOnGoing(data) === true && lectureStopGoing(data) === true && SurveyOK(data) === false"> 
                            <td  @click="modalHandler(data.lec_id , data.lec_name, data.tut_name)">설문조사</td>
                        </template>
                        <template v-else-if="SurveyOK(data) === true && lectureStopGoing(data) === true">
                            <td>설문조사 완료</td>
                        </template>
                        <template v-else>
                            <td>예정일 아님</td>
                        </template>
                        <td>{{ data.srvy_yn }}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
  </div>
  <Pagination v-bind="{currentPage , totalItems : totalCnt , itemsPerPage : 10 }" @search="MyLec($event)"/>
  <Survey 
  v-if="modalBoolean"
  @closeModal="modalBoolean =$event"
  @closeAndSearch="modalClose"
  :lec_id ="lec_id"
  :lec_name="lec_name"
  :tut_name="tut_name"
  />
</template>

<script setup>
import Pagination from "@/components/common/PaginationComponent.vue";
import axios from "axios";
import {ref, onMounted, watch} from 'vue';
import Survey from './Survey.vue';

const dataList = ref([]);
const totalCnt = ref(0);
const currentPage = ref(0);
const currentTime = ref(new Date());
const modalBoolean = ref(false);

const lec_id = ref(0);
const lec_name = ref('');
const tut_name=ref('');
const searchKey = ref('');

const MyLec = (cpage) =>{
    cpage = cpage || 1;
    let param = new URLSearchParams();
    param.append('currentPage',cpage);
    param.append('pageSize', 10);
    param.append('searchKey', searchKey.value);
    axios.post('/std/myLecListJson.do', param).then((res) =>{
        dataList.value = res.data.listData;
        totalCnt.value = res.data.listCnt;
        currentPage.value = cpage
    });
};


const lectureOnGoing =(data)=> {
    const startDate = new Date(data.start_date);
    return currentTime.value >=  startDate;
}

const lectureStopGoing = (data) =>{
    const endDate = new Date(data.end_date);
    return currentTime.value >= endDate
}

const SurveyOK =(data)=>{
    return data.srvy_yn === 'Y';
}

const modalHandler = (param1, param2, param3) =>{
    modalBoolean.value = true;
    lec_id.value = param1
    lec_name.value = param2
    tut_name.value = param3
}

const ModalClose=(param)=>{
    modalBoolean.value = param
}

watch(searchKey, ()=>{
    MyLec();
})

onMounted(()=>{
    MyLec();
})
</script>

<style>

</style>