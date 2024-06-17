<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col">
        <div>
          <p class="mb-4"><strong>/ 학습 관리 / 학습 자료</strong></p>
          <h3>학습 자료</h3>
          <div class="mb-3">
            <select class="form-select" v-model="selectLecture">
              <option>강의 선택</option>
              <option v-for="data in dataList" :key="data.lec_id" :value="data.lec_id">{{ data.lec_name }}</option>
            </select>
          </div>
          <div class="mb-3">
            <button class="btn btn-primary me-2">검색</button>
            <button class="btn btn-secondary">학습자료등록</button>
          </div>
          <div>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>NO</th>
                  <th>제목</th>
                  <th>등록일</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, i) in dataList" :key="i">
                  <td>{{ i + 1 }}</td>
                  <td>{{ data.title }}</td>
                  <td>{{ data.date }}</td>
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
import { ref, onMounted } from 'vue';

const dataList = ref([]);
const totalCount = ref(0);

const dataList1 =ref([]);

const selectLecture = ref(0);
const rec_id = ref();
const selectL = () => {

  let param = new URLSearchParams();

  axios.post('/tut/t_learningMaterialsReact', param).then((res) => {
    dataList.value = res.data.lectureList;
    
  });
};


const LecDataList =(cpage) => {
  cpage = cpage || 1;
  let param = new URLSearchParams();
  param.append('currentPage', cpage);
  param.append('pageSize', 5);
  param.append('lectureValue',dataList.value.lec_id );
  param.append("tutorId",'' );
  axios.post('/tut/tutorLearnMatListReact', param).then((res) => {
    dataList1.value = res.data.data;
  })
}
onMounted(() => {
  selectL();
  LecDataList();
});
</script>

<style>

</style>
