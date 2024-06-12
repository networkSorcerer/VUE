<template>
  <div class="container mt-4">
    <div>
      <div>
        <div>
          <p>/학습지원 / 강의 목록</p>
        </div>
        <div>
          <h3>강의 목록</h3>
        </div>
        <div class="mb-3">
          <select class="form-select w-auto d-inline-block">
            <option>전체</option>
            <option>강사명</option>
            <option>강의명</option>
          </select>
          <input type="text" class="form-control w-auto d-inline-block mx-2">
          <button class="btn btn-primary">검색</button>
        </div>
        <div>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>강의명</th>
                <th>수강대상</th>
                <th>강사명</th>
                <th>개강일</th>
                <th>종강일</th>
                <th>수강인원</th>
                <th>최대인원</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="data in dataList" :key="data.loginID">
                <td @click="modalHandler(data)" class="cursor-pointer">{{ data.lec_name }}</td>
                <td>{{ data.sort }}</td>
                <td>{{ data.name }}</td>
                <td>{{ data.start_date }}</td>
                <td>{{ data.end_date }}</td>
                <td>{{ data.max_pnum }}</td>
                <td>{{ data.pre_pnum }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <RegiLec v-if="modalBoolean" 
      @closeModal="modalBoolean = $event" 
      :loginID="loginID" 
      :lec_id="lec_id" 
      :lecInfo="lecInfo"
      :weekplan="weekplan"
      @closeAndSearch="modalClose" />
    <Pagination v-bind="{currentPage, totalItems: Total, itemsPerPage: 5}" @search="searchLecture($event)" v-if="dataList.length > 0" />
  </div>
</template>

<script setup>
import RegiLec from './RegiLec.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const dataList = ref([]);
const currentPage = ref(0);
const loginID = ref(0);
const lec_id = ref(0);
const modalBoolean = ref(false);
const lecInfo = ref({});
const weekplan = ref({});

const modalClose = (param) => {
  modalBoolean.value = param;
  LecList();
};

const modalHandler = (data) => {
  modalBoolean.value = true;
  loginID.value = data.loginID;
  lec_id.value = data.lec_id; // 모달에서 인식할수 있도록 lec_id를 추가적으로 작성 

  let param = new URLSearchParams();
  param.append('lec_id', lec_id.value);

  axios.post('/std/lecInfo.do', param).then((res) => {
    lecInfo.value = res.data.lecInfo;
    weekplan.value = res.data.week_plan;
    if (res.data.result === 'SUCCESS') {
      alert(res.data.resultMsg);
    }
  }).catch((error) => {
    console.error('Error fetching lecture info:', error);
  });
};

const LecList = (cpage = 1) => {
  let param = new URLSearchParams();
  param.append('currentPage', cpage);
  param.append('pageSize', 5);
  param.append('searchInfo', '');
  param.append('searchKey', '');

  axios.post('/std/lecListJson.do', param).then((res) => {
    dataList.value = res.data.lecList;
    currentPage.value = cpage;
  }).catch((error) => {
    console.error('Error fetching lecture list:', error);
  });
};

onMounted(() => {
  LecList();
});
</script>

<style>
.cursor-pointer {
  cursor: pointer;
}
</style>
