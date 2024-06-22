<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col">
        <div class="mb-3">
          <p>/ 학습 관리 / 강의목록</p>
        </div>
        <div class="mb-3">
          <h3>강의 목록</h3>
        </div>
        <div class="mb-3">
          <select class="form-select" style="height: 40px;" v-model="select">
            <option value="all">전체</option>
            <option value="lec_name">강의명</option>
            <option value="t_name">강사명</option>
          </select>
        </div>
        <div class="mb-3">
          <input type="text" class="form-control" placeholder="검색어를 입력하세요" v-model="text">
        </div>
        <div class="mb-3">
          <button class="btn btn-primary me-2" @click="Lecture()" @change="Lecture()">검색</button>
          <button class="btn btn-success" @click="modalHandler()">과정등록</button>
        </div>
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>강의번호</th>
                <th>강의명</th>
                <th>담당교수</th>
                <th>강의실</th>
                <th>수강인원</th>
                <th>기간</th>
                <th>수정/삭제</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="data in dataList" :key="data.lec_id">
                <td>{{ data.lec_id }}</td>
                <td>{{ data.lec_name }}</td>
                <td>{{ data.t_name }}</td>
                <td>{{ data.lecrm_name }}</td>
                <td>{{ data.pre_pnum }}</td>
                <td>{{ data.start_date }} ~ {{ data.end_date }}</td>
                <td>
                  <button class="btn btn-info btn-sm" @click="modalHandler(data.lec_id)">수정</button>
                  <button class="btn btn-danger btn-sm" @click="Delete(data.lec_id)">삭제</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <Pagination v-bind="{currentPage, totalItems : totalCnt, itemsPerPage : 10 }" @search="Lecture($event)" />
  </div>
  <MLecture
  v-if="modalBoolean"
  @closeModal="modalBoolean = $event"
  :lec_id ="lec_id"
  @closeAndSearch="modalClose"
  />
  </template>
  
  <script setup>
  import axios from 'axios';
  import {ref, onMounted} from 'vue';
  import Pagination from '@/components/common/PaginationComponent.vue';
  import MLecture from './MLecture.vue';

  const modalBoolean = ref(false);

  const dataList = ref([]);
  const currentPage = ref(0);
  const totalCnt = ref(0);
  const lec_id = ref(0);
  
  const select = ref('');
  const text = ref('');
  const Lecture = (cpage) => {
    cpage = cpage | 1;
    let param = new URLSearchParams();
    param.append('currentPage',cpage);
    param.append('pageSize',10);
    param.append('searchKey', select.value);
    param.append('searchInfo', text.value);
    axios.post('/register/listLecjson.do', param).then((res) => {
      dataList.value = res.data.lec_List;
      totalCnt.value = res.data.lec_Total;
      currentPage.value = cpage;
    });
  };
  
  const modalHandler =(param) => {
    modalBoolean.value = true;
    lec_id.value = param
  };

  const modalClose = (param) => {
    modalBoolean.value = param;
    Lecture();
  };

  const Delete = (data) => {
    let param = new URLSearchParams();
    param.append('lec_id', data)
    axios.post('/register/delRegister.do', param).then((res) => {
      
    })
  }


  onMounted(()=> {
    Lecture();
  })
  </script>
  
  <style>
  .container {
    margin-top: 1.5rem;
  }
  
  .table-responsive {
    margin-top: 1.5rem;
  }
  
  .btn {
    margin-right: 0.5rem;
  }
  </style>
  