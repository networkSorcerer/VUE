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
                <button class="btn btn-success" @click="modalHandler()">강의실 신규등록</button>
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
                    <td @click="EQM(data.lecrm_id)">{{ data.lecrm_name }}</td>
                    <td>{{ data.lecrm_size }}</td>
                    <td>{{ data.lecrm_snum }}</td>
                    <td>{{ data.lecrm_note }}</td>
                    <td><button class="btn btn-info"  @click="modalHandler(data.lecrm_id)">수정</button></td>
                    </tr>
                </tbody>
                </table>
            </div>
          </div>
        </div>
      </div>
      <Pagination v-bind="{currentPage, totalItems : listcnt, itemsPerPage : 5}" @search="LectureRoom($event)" v-if="dataList.length > 0"/>
    </div>
    <MLectureRoom
    v-if="modalBoolean"
    :lecrm_id="lecrm_id"
    @closeModal = "modalBoolean =$event"
    @closeAndSearch="modalClose"
    />
    <LREQ
    v-if="modalBoolean1"
    :lecrm_id="lecrm_id"
    />
  </template>
  
  <script setup>
import Pagination from "@/components/common/PaginationComponent.vue";
import axios from "axios";
import { ref, onMounted , watch} from 'vue';
import MLectureRoom from "./MLectureRoom.vue";
import LREQ from "./LREQ.vue";
  const modalBoolean = ref(false);
  const modalBoolean1 = ref(false);

  const dataList = ref([]);
  const listcnt = ref(0);
  const currentPage = ref(0);
  const lecrm_id = ref(0);

  const LectureRoom = (cpage) => {
      cpage = cpage | 1;
      let param = new URLSearchParams();
      param.append('cpage', cpage);
      param.append('pagesize', 5);
  
      axios.post('/adm/lectureRoomListjson.do', param).then((res) =>{
          dataList.value = res.data.listdata;
          listcnt.value = res.data.listcnt;
          currentPage.value =cpage
      });
  };


  
  const EQM = async (param) => {
    modalBoolean1.value = true;
    lecrm_id.value = param
    
  }

  const modalHandler = (param)=> {
    modalBoolean.value = true;
    lecrm_id.value = param;
  }
  
  const modalClose = (param) => {
    modalBoolean.value = param;
    LectureRoom();
  }

  watch(lecrm_id, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    EQM(newVal);
  }
})

  onMounted(() =>{
      LectureRoom();
  })
  </script>
  
  <style scoped>
  
  </style>
  