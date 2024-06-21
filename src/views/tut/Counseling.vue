<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col">
          <div>
            <p>/ 학습 관리 / 수강상담 관리</p>
          </div>
          <div>
            <h3>수강상담 관리</h3>
          </div>
          <div>
            <select class="form-select" v-model="ChLec" style="height: 50px;width: 200px;">
              <option >전체과정</option>
              <option v-for="lecture in dataList1" :key="lecture.lec_id" :value="lecture.lec_id">{{ lecture.lec_name }}</option>
            </select>
          </div>
          <div>
            <button class="btn btn-primary" @click="modalHandler1()" >상담 등록</button>
          </div>
          <div>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">상담번호</th>
                  <th scope="col">과정명</th>
                  <th scope="col">학생명</th>
                  <th scope="col">상담일자</th>
                  <th scope="col">상담자명</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="data in dataList" :key="data.adv_id">
                  <td>{{ data.adv_id }}</td>
                  <td >{{ data.lec_name }}</td>
                  <td @click="modalHandler1(data.adv_id, data.lec_id)" >{{ data.std_id }}</td>
                  <td>{{ data.adv_date }}</td>
                  <td>{{ data.tut_name }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <CD
  v-if="modalBoolean1"
  @closeModal="modalBoolean1 = $event"
  :adv_id ="adv_id"
  :lec_id="lec_id"
  @closeAndSearch= "modalClose"
  :lectureId ="lectureId"
  />
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted, watch } from 'vue';
import CD from './CD.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const lectureId = ref(route.params.id);


const dataList = ref([]);
const dataList1 = ref([]);
const totalCnt = ref(0);

const ChLec = ref('');

const modalBoolean1 = ref(false);

const adv_id = ref(0);
const lec_id = ref(0);

const CounselList = (cpage) => {
  cpage = cpage || 1;
  let param = new URLSearchParams();
  param.append('lec_id', ChLec.value);
  param.append('cpage', cpage);
  param.append('pagesize', 5);
  axios.post('/adv/advListJson.do', param).then((res) => {
    dataList.value = res.data.listdata;
    totalCnt.value = res.data.listcnt;
   
  });
};



const LecList = (cpage) => {
  cpage = cpage | 1;
  let param = new URLSearchParams();
  param.append('currentPage', cpage);
  param.append('pageSize', 999);
  axios.post('/adv/lecList2.do', param).then((res) => {
    dataList1.value = res.data.listData;
  
  });
};

const modalHandler1 =(param1, param2)=>{
  console.log('헬로우?????')
  modalBoolean1.value = true;
  adv_id.value = param1
  lec_id.value = param2
} 

onMounted(() => {
  LecList();
  CounselList();
});
</script>

<style scoped>
/* Scoped styles here if needed */
</style>
