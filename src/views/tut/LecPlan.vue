<template>
    <div>
      <div class="container mt-4">
        <div class="row">
          <div class="col">
            <div>
              <div>
                <div>
                  <div>
                    <p class="mb-4"><strong>/ 학습 지원 / 강의 계획서</strong></p>
                  </div>
                  <div>
                    <h3>강의 계획서 관리</h3>
                  </div>
                  <div class="mb-3">
                    <label>
                      <input type="text" class="form-control">
                    </label>
                  </div>
                  <div class="mb-3">
                    <button class="btn btn-primary">검색</button>
                  </div>
                  <div class="mb-3">
                    <button class="btn btn-secondary">진행중 강의</button>
                  </div>
                  <div class="mb-3">
                    <button class="btn btn-secondary">종료된 강의</button>
                  </div>
                  <div>
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th>분류</th>
                          <th>강의명</th>
                          <th>대상</th>
                          <th>강의실</th>
                          <th>기간</th>
                          <th>수강인원</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="data in dataList" :key="data.lec_id">
                          <td>{{ data.lec_type_name }}</td>
                          <td @click="modalHandler(data.lec_id, data.tutor_id, data.lec_type_id, data.lecrm_id, data.lec_sort)">{{ data.lec_name }}</td>
                          <td>{{ data.lec_sort }}</td>
                          <td>{{  }}</td>
                          <td>{{ data.start_date }} ~ {{ data.end_date }}</td>
                          <td>{{ data.max_pnum }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <Pagination  v-bind="{ currentPage, totalItems: totalCount, itemsPerPage: 10 }" @search="LecPlanList($event)"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LPD
        v-if="modalBoolean"
        @closeModal="modalBoolean=$event"
        @closeAndSearch="modalClose"
        :propsObject="propsObject"
      />
    </div>
  </template>
  
  <script setup>
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  import LPD from './LPD.vue';
  import Pagination from '@/components/common/PaginationComponent.vue';
  
  const dataList = ref([]);
  const totalCount = ref(0);
  const modalBoolean = ref(false);
  const propsObject = ref({ lec_id: 0, tutor_id: 0, lec_type_id: 0, lecrm_id: 0 ,lec_sort:''});
  
  const LecPlanList = (cpage) => {
    cpage = cpage || 1;
    let param = new URLSearchParams();
    param.append('searchWord', '');
    param.append('currentPage', cpage);
    param.append('pageSize', 10);
    param.append('progress', '');
    axios.post('/tut/fLectureListJson.do', param).then((res) => {
      dataList.value = res.data.listdata;
      totalCount.value = res.data.listcnt;
    });
  };
  
  const modalHandler = (lec_id, tutor_id, lec_type_id, lecrm_id,lec_sort) => {
    propsObject.value = { lec_id, tutor_id, lec_type_id, lecrm_id ,lec_sort};
    modalBoolean.value = true;
  };
  
  const modalClose = (param) => {
    modalBoolean.value = param;
    if (!param) {
      LecPlanList();
    }
  };
  
  onMounted(() => {
    LecPlanList();
  });
  </script>
  
  <style>
  
  </style>
  