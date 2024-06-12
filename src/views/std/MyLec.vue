<template>
  <div>
    <div>
      <div>
        <div>
          <div>
            <p>/학습관리 / 나의 수강 목록</p>
          </div>
          <div>
            <h3>나의 수강목록</h3>
          </div>
          <div>
            <select v-model="searchKey" @change="myLecList">
              <option value="all">전체 수강목록</option>
              <option value="ProceedingLec">진행중인 수강목록</option>
              <option value="LastLec">지난 수강목록</option>
            </select>
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <td>강의번호</td>
                  <td>강의명</td>
                  <td>강사명</td>
                  <td>강의실</td>
                  <td>기간</td>
                  <td>승인여부</td>
                  <td>설문조사여부</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="data in dataList" :key="data.lec_id">
                  <td>{{ data.lec_id }}</td>
                  <td @click="modalHandler()">{{ data.lec_name }}</td>
                  <td>{{ data.tut_name }}</td>
                  <td>{{ data.lecrm_name }}</td>
                  <td>{{ data.start_date }} ~ {{ data.end_date }}</td>
                  <td>{{ data.apv_yn }}</td>
                  <td>{{ data.srvy_yn }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <MyLecDetail
  v-if="modalBoolean" 
  @closeModal="modalBoolean= $event" 
  :lec_id="lec_id"
   @closeAndSearch="modalClose"
  />
  <Pagination
    v-if="totalItems > 0"
    :currentPage="currentPage"
    :totalItems="totalItems"
    :itemsPerPage="10"
    @search="myLecList"
  />
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import Pagination from '@/components/common/PaginationComponent.vue';
import MyLecDetail from './MyLecDetail.vue';

const currentPage = ref(1); // Default to page 1
const dataList = ref([]);
const searchKey = ref('all');
const totalItems = ref(0); // To track the total number of items
const modalBoolean = ref(false);
const lec_id = ref(0);

const myLecList = (cpage) => {
  cpage = cpage || 1;
  let param = new URLSearchParams();
  param.append('currentPage', cpage);
  param.append('pageSize', 10);
  param.append('searchKey', searchKey.value); // searchKey의 값을 파라미터로 추가

  axios.post('/std/myLecListJson.do', param).then((res) => {
    dataList.value = res.data.listData;
    totalItems.value = res.data.totalCount; // Assuming the response has totalCount
    currentPage.value = cpage;
  }).catch((error) => {
    console.error('Error fetching lecture list:', error);
  });
};



// 모달 팝업창 클로즈
const modalClose = (param) => {
    modalBoolean.value = param;
}

const modalHandler = (param) => {
    modalBoolean.value = true;
    lec_id.value = param;
}

onMounted(() => {
  myLecList();
});
</script>

<style>
/* Add your styles here */
</style>
