<template>
    <div class="container mt-4">
      <div class="row">
        <div class="col">
          <div class="mb-3">
            <div>
                <p>/ 시설 관리 /강의실</p>
            </div>
            <div>
                <h3>강의실</h3>
            </div>
            <div class="mb-3">
                <label class="form-label">강의실 명</label>
                <input type="text" class="form-control">
            </div>
            <div class="mb-3">
                <button class="btn btn-primary me-2">검색</button>
                <button class="btn btn-success">강의실 신규등록</button>
            </div>
            <div>
                <table class="table">
                <thead>
                    <tr>
                    <th scope="col">강의실 명</th>
                    <th scope="col">강의실 크기</th>
                    <th scope="col">강의실 자리수</th>
                    <th scope="col">비고</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="data in dataList" :key="data.lec_id">
                    <td>{{ data.lecrm_name }}</td>
                    <td>{{ data.lecrm_size }}</td>
                    <td>{{ data.lecrm_snum }}</td>
                    <td>{{ data.lecrm_note }}</td>
                    <td><button class="btn btn-info">수정</button></td>
                    </tr>
                </tbody>
                </table>
            </div>
          </div>
        </div>
      </div>
      <Pagination v-bind="{currentPage, totalItems : listcnt, itemsPerPage : 10}" @search="LectureRoom($event)" v-if="dataList.length > 0"/>
    </div>
  </template>
  
  <script setup>
import Pagination from "@/components/common/PaginationComponent.vue";
import axios from "axios";
import { ref, onMounted } from 'vue';
  const dataList = ref([]);
  const listcnt = ref(0);
  
  const LectureRoom = (cpage) => {
      cpage = cpage | 1;
      let param = new URLSearchParams();
      param.append('cpage', cpage);
      param.append('pagesize', 10);
  
      axios.post('/adm/lectureRoomListjson.do', param).then((res) =>{
          dataList.value = res.data.listdata;
          listcnt.value = res.data.listcnt;
      });
  }
  
  onMounted(() =>{
      LectureRoom();
  })
  </script>
  
  <style scoped>
  
  </style>
  