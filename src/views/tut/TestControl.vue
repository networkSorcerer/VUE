<template>
  <div>
    <div class="row">
      <div class="col">
        <div>
          <p class="mb-4"><strong>/ 학습 관리 / 시험 관리</strong></p>
          <h3>시험 문제 관리</h3>
          <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" id="inactiveQuestions" v-model="checkUSE" @change="TestList()"/>
            <label class="form-check-label" for="inactiveQuestions">비활성 문제</label>
          </div>
          <div class="mb-3">
            <select style="width:150px;height:50px;" class="form-select" v-model="choosetype" @change="TestList()">
              <option v-for="data in type" :key="data.lec_type_id" :value="data.lec_type_id">{{ data.lec_type_name }}</option>
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
                  <th>전체 선택<input type="checkbox" v-model="selectAll" @change="toggleSelectAll"></th>
                  <th>que_id</th>
                  <th>시험분류</th>
                  <th>문제</th>
                  <th>정답</th>
                  <th>보기1</th>
                  <th>보기2</th>
                  <th>보기3</th>
                  <th>보기4</th>
                  <th><button class="btn btn-secondary btn-sm" @click="deactivateQuestion">{{ checkUSE ? '활성' : '비활성' }}</button></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="data in dataList" :key="data.que_id">
                  <td><input type="checkbox" v-model="data.selected" :value="data.que_id"></td>
                  <td>{{ data.que_id }}</td>
                  <td>{{ data.lec_type_name }}</td>
                  <td>{{ data.test_que }}</td>
                  <td>{{ data.que_ans }}</td>
                  <td>{{ data.que_ex1 }}</td>
                  <td>{{ data.que_ex2 }}</td>
                  <td>{{ data.que_ex3 }}</td>
                  <td>{{ data.que_ex4 }}</td>
                  <td>
                    <button class="btn btn-secondary btn-sm" 
                      @click=" editQuestion(data.que_id)">
                     수정
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Pagination v-bind="{ currentPage, totalItems: TotalCnt, itemsPerPage: pageSize }" @search="TestList($event)"/>
      </div>
    </div>
  </div>
  <NewTest v-if="modalBoolean" @closeModal="modalBoolean=$event" @closeAndSearch="modalClose" />
  <UpdateTest v-if="modalBoolean1" @closeModal="modalBoolean1=$event" @closeAndSearch="modalClose" :que_id="que_id" />
</template>


<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import Pagination from '@/components/common/PaginationComponent.vue';
import NewTest from './NewTest.vue';
import UpdateTest from './UpdateTest.vue';


const dataList = ref([]);

const TotalCnt = ref(0);

const type = ref([]);

const choosetype = ref('');

const selectAll = ref(false);
const modalBoolean = ref(false);
const modalBoolean1 = ref(false);

const checkUSE = ref(false);  

const que_id = ref(0);

const TestList = (cpage) => {
 console.log('시험문제 타입 확인 ',choosetype.value );
  cpage = cpage  || 1;
  let param = new URLSearchParams();
  param.append('cpage', cpage);
  param.append('pagesize', 5);
  param.append('lecList', choosetype.value);
  param.append('use_yn', checkUSE.value ? 'N' : 'Y' );
  axios.post('/tut/testListRtn.do', param).then((res) => {
    TotalCnt.value = res.data.listcnt;
    dataList.value = res.data.listdata;
  });
};

const TypeList = () => {
  let param = new URLSearchParams();
  
  axios.post('/tut/testControlJson.do', param).then((res) => {
    type.value = res.data.lecList;
    const chtype = type.value.lec_type_id;
    choosetype.value = chtype;
  });
};

// watch(choosetype, () => {
//   TestList();
  
// });

const deactivateQuestion = () => {
  const selectedQueIds = dataList.value
    .filter(data => data.selected)
    .map(data => data.que_id);

  if (selectedQueIds.length === 0) {
    alert('비활성화할 문제를 선택하세요.');
    return;
  }

  let formData = new FormData();
  selectedQueIds.forEach(id => formData.append('que_id', id));

  axios.post('/tut/testDeactivate.do', formData).then((res) => {
    if (res.data.result === 'SUCCESS') {
      alert(res.data.deactResultMsg);
      TestList(); // 업데이트된 목록을 다시 불러옵니다.
    } else {
      alert('수정에 실패했습니다');
    }
  });
};


const modalHandler = (param1, param2) => {
  modalBoolean.value = true;
  paramObject.value = {
    que_id: param1,
    lec_type_name: param2
  };
};

const editQuestion = (param) => {
  modalBoolean1.value = true;
  que_id.value = param
};

const modalClose = (param) => {
  modalBoolean.value = param;
  modalBoolean1.value = param;
};

const toggleSelectAll = () => {
  dataList.value.forEach(data => data.selected = selectAll.value);
};

onMounted(() => {
  TypeList();
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


<style>
.container {
  padding: 20px;
}
.table th,
.table td {
  vertical-align: middle;
}
</style>
