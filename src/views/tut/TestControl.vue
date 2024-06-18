<template>
  <div >
    <div class="row">
      <div class="col">
        <div>
          <p class="mb-4"><strong>/ 학습 관리 / 시험 관리</strong></p>
          <h3>시험 문제 관리</h3>
          <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" id="inactiveQuestions"/>
            <label class="form-check-label" for="inactiveQuestions">비활성 문제</label>
          </div>
          <div class="mb-3">
            <select class="form-select" v-model="ChooseLecture">
              <option v-for="data in lectureList" :key="data.lec_id" :value="data.lec_id">{{ data.lec_name }}</option>
            </select>
          </div>
          <div class="mb-3">
            <button class="btn btn-primary me-2" @click="modalHandler">문제등록</button>
          </div>
          <div>
            <table class="table table-striped">
              <caption>caption</caption>
									<colgroup>
										<col width="8%">
										<col width="8%">
										<col width="20%">
										<col width="5%">
										<col width="10%">
										<col width="10%">
										<col width="10%">
										<col width="10%">
										<col width="8%">
									</colgroup>
              <thead>
                <tr>
                  <th>전체 선택<input type="checkbox" @change="selectAll"></th>
                  <th>시험분류</th>
                  <th>문제</th>
                  <th>정답</th>
                  <th>보기1</th>
                  <th>보기2</th>
                  <th>보기3</th>
                  <th>보기4</th>
                  <th><button>비활성</button></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="data in dataList" :key="data.lec_id">
                  <td><input type="checkbox" v-model="data.selected"></td>
                  <td>{{ data.lec_type_name }}</td>
                  <td>{{ data.test_que }}</td>
                  <td>{{ data.que_ans }}</td>
                  <td>{{ data.que_ex1 }}</td>
                  <td>{{ data.que_ex2 }}</td>
                  <td>{{ data.que_ex3 }}</td>
                  <td>{{ data.que_ex4 }}</td>
                  <td><button class="btn btn-secondary btn-sm" @click="editQuestion(data)">수정</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Pagination v-bind="{ currentPage, totalItems: TotalCnt, itemsPerPage: 5 }" @search="TestList($event)"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import Pagination from '@/components/common/PaginationComponent.vue';

const dataList = ref([]);
const TotalCnt = ref(0);
const lectureList = ref([]);

const ChooseLecture = ref(0);

const TestList = (cpage) => {
  cpage = cpage || 1;
  let param = new URLSearchParams();
  param.append('cpage', cpage);
  param.append('pagesize', 5);

  axios.post('/tut/testListRtn.do', param).then((res) => {
    TotalCnt.value = res.data.listcnt;
    dataList.value = res.data.listdata;
  });
};

const selectAll = (event) => {
  dataList.value.forEach(item => {
    item.selected = event.target.checked;
  });
};

const editQuestion = (data) => {
  // 수정 로직
};

const modalHandler = () => {
  // 모달 열기 로직
};

const loadLectures = () => {
  // 강의 리스트 로드
  axios.get('/tut/lectureList').then((res) => {
    lectureList.value = res.data;
  });
};

onMounted(() => {
  loadLectures();
  TestList();
});
</script>

<style>
.container {
  padding: 20px;
}
.table th,
.table td {
  vertical-align: middle;
}
</style>
