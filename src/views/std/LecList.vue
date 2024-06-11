<template>
    <div class="container mt-4">
      <div>
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
                    <td @click="modalHandler(data.loginID)" class="cursor-pointer">{{ data.lec_name }}</td>
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
      </div>
      <RegiLec v-if="modalBoolean" @closeModal="modalBoolean = $event" :loginID="loginID" :lec_id="lec_id" @closeAndSearch="modalClose" />
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
  const modalBoolean = ref(false);
//   const startpos = ref(0);
  
  const modalClose = (param) => {
    modalBoolean.value = param;
    LecList();
  };
  
  const modalHandler = (param) => {
    modalBoolean.value = true;
    loginID.value = param;
  };
  
  const LecList = (cpage = 1) => {

    let param = new URLSearchParams();
    // param.append('std_id', loginID);
    param.append('currentPage', cpage);
    param.append('pageSize', 5);
    param.append('searchInfo', '');
    param.append('searchKey', '');
    // param.append('startpos', startpos.value);
    
    axios.post('/std/lecListJson.do', param).then((res) => {
        console.log('res 입니다',res);
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
  