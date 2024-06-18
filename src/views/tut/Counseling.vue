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
              <option v-for="lecture in dataList1" :key="lecture.lec_id" :value="lecture.lec_id">{{ lecture.lec_name }}</option>
            </select>
          </div>
          <div>
            <button class="btn btn-primary">상담 등록</button>
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
                  <td>{{ data.lec_name }}</td>
                  <td>{{ data.std_id }}</td>
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
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted, watch } from 'vue';

const dataList = ref([]);
const dataList1 = ref([]);
const totalCnt = ref(0);
const cpage = ref(0);
const ChLec = ref(0);
const currentPage = ref(0);

const CounselList = (cpage) => {
  cpage = cpage | 1;
  let param = new URLSearchParams();
  param.append('lec_id', ChLec.value);
  param.append('cpage', cpage);
  param.append('pagesize', 5);
  axios.post('/adv/advListJson.do', param).then((res) => {
    dataList.value = res.data.listdata;
    totalCnt.value = res.data.listcnt;
    const select = dataList.value[0]?.lec_id;
    ChLec.value = select;
  });
};

watch(ChLec, () => {
  CounselList();
});

const LecList = (cpage) => {
  cpage = cpage | 1;
  let param = new URLSearchParams();
  param.append('currentPage', cpage);
  param.append('pageSize', 999);
  axios.post('/adv/lecList2.do', param).then((res) => {
    dataList1.value = res.data.listData;
  });
};

onMounted(() => {
  LecList();
});
</script>

<style scoped>
/* Scoped styles here if needed */
</style>
