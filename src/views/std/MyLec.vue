<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col">
          <div>
            <p>/학습관리 / 나의 수강 목록</p>
          </div>
          <div>
            <h3>나의 수강목록</h3>
          </div>
          <div>
            <select class="form-select" v-model="searchKey" @change="myLecList" style="height: 40px;">
              <option value="all">전체 수강목록</option>
              <option value="ProceedingLec">진행중인 수강목록</option>
              <option value="LastLec">지난 수강목록</option>
            </select>
          </div>
          <div>
            <table class="table">
              <thead class="table-dark">
                <tr>
                  <th scope="col">강의번호</th>
                  <th scope="col">강의명</th>
                  <th scope="col">강사명</th>
                  <th scope="col">강의실</th>
                  <th scope="col">기간</th>
                  <th scope="col">승인여부</th>
                  <th scope="col">설문조사여부</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="data in dataList" :key="data.lec_id">
                  <td>{{ data.lec_id }}</td>
                  <td @click="modalHandler(data.lec_id, data.loginID)">{{ data.lec_name }}</td>
                  <td>{{ data.tut_name }}</td>
                  <td>{{ data.lecrm_name }}</td>
                  <td>
                    {{ data.start_date }} ~ {{ data.end_date }}
                    <span v-if="data.apv_yn === 'Y' && lectureOnGoing(data) && lectureStopGoing(data)" class="badge bg-success"> (진행중)</span>
                    <span v-else-if="lectureOnGoing(data) === false && lectureStopGoing(data) === true" class="badge bg-info"> (예정)</span>
                    <span v-else class="badge bg-secondary"> (완료)</span>
                  </td>
                  <td>{{ data.apv_yn === 'Y' ? '승인' : '미승인' }}</td>
                  <td>
                    <span v-if="SurveyYN(data) === false && lectureStopGoing(data) === false" @click="openSurvey(data.lec_id, data.lec_name, data.tut_name)" style="cursor: pointer; color: blue;">
                      설문조사
                    </span>
                    <span v-else-if="SurveyYN(data) === true && lectureStopGoing(data) === false" class="badge bg-primary">
                      설문조사 완료
                    </span>
                    <span v-else class="badge bg-warning">예정일 아님</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <Pagination
            v-bind="{ currentPage, totalItems: listCount, itemsPerPage: 5 }"
            @search="myLecList($event)"
            v-if="dataList.length > 0"
          />
        </div>
      </div>
    </div>
    <Survey
      v-if="modalBoolean1"
      @closeModal="modalBoolean1 = $event"
      :lec_id="lec_id"
      :tut_name="tut_name"
      :lec_name="lec_name"
      @closeAndSearch="modalClose"
    />
    <MyLecDetail
      v-if="modalBoolean"
      @closeModal="modalBoolean = $event"
      :lec_id="lec_id"
      :loginID="loginID"
      @closeAndSearch="modalClose"
    />
  </div>
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
const modalBoolean = ref(false);
const lec_id = ref(0);
const loginID = ref(0);
const tut_name = ref('');
const lec_name = ref('');
const listCount = ref(0);
const currentTime = ref(new Date());
const modalBoolean1 = ref(false);

const myLecList = (page) => {
  page = page || 1;
  let param = new URLSearchParams();
  param.append('currentPage', page);
  param.append('pageSize', 5);
  param.append('searchKey', searchKey.value);
  axios.post('/std/myLecListJson.do', param)
    .then((res) => {
      dataList.value = res.data.listData;
      currentPage.value = page;
      listCount.value = res.data.listCnt;
    })
    .catch((error) => {
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
};

const openSurvey = (paramLec, paramLecName, paramTutName) => {
  console.log('설문조사 모달 열기:', paramLec);
  modalBoolean1.value = true;
  lec_id.value = paramLec;
  lec_name.value = paramLecName;
  tut_name.value = paramTutName;
};

const modalClose = (param) => {
  modalBoolean.value = param;
  modalBoolean1.value = param;
};

const modalHandler = (param_lec1, param_ID1) => {
  modalBoolean.value = true;
  lec_id.value = param_lec1;
  loginID.value = param_ID1;
};

const SurveyYN = (data) => {
  return data.srvy_yn === 'Y';
};

watch(searchKey, () => {
  myLecList(1);
});

onMounted(() => {
  myLecList();
});
</script>

<style scoped>
/* Add custom scoped styles here */
</style>
