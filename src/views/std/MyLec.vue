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
                  <td @click="modalHandler(data.lec_id)">{{ data.lec_name }}</td>
                  <td>{{ data.tut_name }}</td>
                  <td>{{ data.lecrm_name }}</td>
                  <td>{{ data.start_date }} ~ {{ data.end_date }}
                    <span v-if="data.apv_yn === 'Y' && lectureOnGoing(data) && lectureStopGoing(data)"> (진행중)</span>
                    <span v-if=" lectureOnGoing(data) ===false && lectureStopGoing(data) ===true"> (예정)</span>
                    <span v-if=" lectureOnGoing(data) ===true && lectureStopGoing(data) ===false"> (완료)</span>
                  </td>
                  <td>{{ data.apv_yn === 'Y' ? '승인' : '미승인' }}</td>
                  <td>
                    <span v-if="data.apv_yn === 'Y' && lectureStopGoing(data) === false" @click="openSurvey(data.lec_id)" style="cursor: pointer; color: blue;">
                     설문조사
                    </span>
                    <span v-else>
                      {{ lectureStopGoing(data) ? '응시기간 아님' : '설문조사예정' }}
                    </span>
                  </td>
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
    @closeModal="modalBoolean = $event"
    :lec_id="lec_id"
    :loginID="loginID"
    @closeAndSearch="modalClose"
  />
  <Survey
   v-if="modalBoolean1"
    @closeModal="modalBoolean1 = $event"
    :lec_id="lecId"
    :loginID="loginID"
    :tut_name="tut_name"
    :lec_name="lec_name"
    @closeAndSearch="modalClose"
  />
  <Pagination 
      v-bind="{ currentPage, totalItems: listCount, itemsPerPage: 100 }"
      @search="myLecList($event)"
      v-if="dataList.length > 0"
    />
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';
import Pagination from '@/components/common/PaginationComponent.vue';
import MyLecDetail from './MyLecDetail.vue';
import Survey from './Survey.vue';

const currentPage = ref(1); // Default to page 1
const dataList = ref([]);
const searchKey = ref('all');
const totalItems = ref(0); // To track the total number of items
const modalBoolean = ref(false);
const lec_id = ref(0);
const listCount = ref(0);
const currentTime = ref(new Date());
const modalBoolean1 = ref(false);
const myLecList = (page) => {
  page = page || 1;
  let param = new URLSearchParams();
  param.append('currentPage', page);
  param.append('pageSize', 100);
  param.append('searchKey', searchKey.value); // searchKey의 값을 파라미터로 추가
  
  axios.post('/std/myLecListJson.do', param).then((res) => {
    dataList.value = res.data.listData;
    totalItems.value = res.data.totalCount; // Assuming the response has totalCount
    currentPage.value = page;
  }).catch((error) => {
    console.error('Error fetching lecture list:', error);
  });
};

const lectureOnGoing = (data) => {
    const startDate = new Date(data.start_date);
    return currentTime.value >= startDate;
  };

const lectureStopGoing = (data) => {
    const endDate = new Date(data.end_date);
    return currentTime.value <= endDate;
}

const openSurvey = (lec_id) => {
    console.log('설문조사 모달 열기:', lec_id);
    modalBoolean1.value = true;
}

// 모달 팝업창 클로즈
const modalClose = (param) => {
  modalBoolean.value = param;
  modalBoolean1.value = param;
};

const modalHandler = (param) => {
  modalBoolean.value = true;
  lec_id.value = param;
};

// Watcher for searchKey changes
watch(searchKey, () => {
  myLecList(1); // Reset to page 1 when search key changes
});

onMounted(() => {
  myLecList();
});
</script>

<style>
/* Add your styles here */
</style>
