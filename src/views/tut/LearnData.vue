<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col">
        <div>
          <p class="mb-4"><strong>/ 학습 관리 / 학습 자료</strong></p>
          <h3>학습 자료</h3>
          <div class="mb-3">
            <select class="form-select" v-model="selectLecture" style="width:300px;height:50px;">
                <option v-for="data in dataList" :key="data.lec_id" :value="data.lec_id">{{ data.lec_name }}</option>
            </select>
          </div>
          <div class="mb-3">
            <button class="btn btn-primary me-2" @click="LecDataList">검색</button>
            <button class="btn btn-secondary" @click="modalHandler1">학습자료등록</button>
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
                <tr v-for="data in dataList1" :key="data.learn_data_id">
                  <td>{{ data.learn_data_id }}</td>
                  <td @click="modalHandler(data.learn_data_id)">{{ data.learnTitle }}</td>
                  <td>{{ formatDate(data.writeDate) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Pagination v-bind="{ currentPage, totalItems: totalCount, itemsPerPage: 5 }" @search="LecDataList($event)"/>
      </div>
      <LDD
        v-if="modalBoolean"
        @closeModal="modalBoolean = $event"
        @closeAndSearch="modalClose"
        :learn_data_id="learn_data_id"
      />
      <NEWLD
        v-if="modalBoolean1"
        @closeModal="modalBoolean1 = $event"
        @closeAndSearch="modalClose"
        :dataList="dataList"
      />
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted, watch } from 'vue';
import Pagination from '@/components/common/PaginationComponent.vue';
import LDD from './LDD.vue';
import NEWLD from './NEWLD.vue';

const dataList = ref([]);
const totalCount = ref(0);

const dataList1 = ref([]);

const selectLecture = ref(0);

const modalBoolean = ref(false);
const modalBoolean1 = ref(false);

const learn_data_id = ref(0);

const selectL = () => {
  let param = new URLSearchParams();

  axios.post('/tut/t_learningMaterialsReact', param).then((res) => {
    dataList.value = res.data.lectureList;
    const test = dataList.value[0]?.lec_id;
    selectLecture.value = test;
  });
};

watch(selectLecture, () => {
  LecDataList();
});

const LecDataList = (cpage) => {
  cpage = cpage || 1;
  let param = new URLSearchParams();
  param.append('currentPage', cpage);
  param.append('pageSize', 5);
  param.append('lectureValue', selectLecture.value);
  param.append("tutorId", '');
  axios.post('/tut/tutorLearnMatListReact', param).then((res) => {
    dataList1.value = res.data.learningMatList;
    totalCount.value = res.data.totalCount;
  });
};

const formatDate = (timestamp) => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return date.toLocaleDateString();
};

const modalHandler = (param) => {
  modalBoolean.value = true;
  learn_data_id.value = param;
};

const modalHandler1 = () => {
  modalBoolean1.value = true;
};

onMounted(() => {
  selectL();
});
</script>

<style>
.backdrop {
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
}
.modal-dialog {
  width: 100%;
  max-width: 600px;
  margin: auto;
}
</style>
