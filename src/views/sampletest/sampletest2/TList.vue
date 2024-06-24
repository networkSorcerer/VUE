<template>
  <div> 
    <div> 
      <div> 
        <p>/ 학습관리 / 시험 관리</p>
      </div>
      <div> 
        <h3>시험 문제 관리</h3>
      </div>
      <div>
        <input type="checkbox" v-model="UseOrNot" :value="testList.use_yn">
        <label>비활성 문제</label> 
      </div>
      <div> 
        <select v-model="sort" @change="TestList()">
           <option value="">전체 선택</option>
          <option v-for="sort in sortList" :key="sort.lec_type_id" :value="sort.lec_type_id">{{ sort.lec_type_name }}</option>
        </select>
      </div>
      <div> 
        <button @click="modalHandler">문제 등록</button>
      </div>
      <div> 
        <table> 
          <tr> 
            <td>
              전체선택
              <input type="checkbox" v-model="checkAll" @change="checkBoxALL">
            </td>
            <td>시험분류</td>
            <td>ID</td>
            <td>문제</td>
            <td>정답</td>
            <td>보기1</td>
            <td>보기2</td>
            <td>보기3</td>
            <td>보기4</td>
            <td>         
                <button @click="UseYN()">{{ UseOrNot ? '활성' : '비활성' }}</button>             
            </td>
          </tr>
          <tr v-for="(data,i) in testList" :key="i"> 
            <td>
              <input type="checkbox" v-model="data.selected">
            </td>
            <td>{{ data.que_id }}</td>
            <td>{{ data.lec_type_name }}</td>
            <td>{{ data.test_que }}</td>
            <td>{{ data.que_ans }}</td>
            <td>{{ data.que_ex1}}</td>
            <td>{{ data.que_ex2 }}</td>
            <td>{{ data.que_ex3}}</td>
            <td>{{ data.que_ex4 }}</td>
            <td>
              <button @click="modalHandler(data.que_id)">수정</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
  <Pagination v-bind="{currentPage, totalItems : totalCnt , itemsPerPage : 10}" @search="TestList($event)"/>
  <TModal
  v-if="modalBoolean"
  @closeModal="modalBoolean = $event"
  :que_id="que_id"
  />
</template>

<script setup>
import axios from 'axios';
import {ref, onMounted, watch} from 'vue';
import Pagination from '@/components/common/PaginationComponent.vue';
import TModal from './TModal.vue';
const sort = ref('');
const sortList = ref([]);
const testList = ref([]);
const totalCnt = ref(0);
const currentPage = ref(0);
const UseOrNot = ref(false);

const checkAll = ref(false);

const modalBoolean = ref(false);
const que_id = ref(0);

const TestSortList = () => {
  let param = new URLSearchParams();
  axios.post('/tut/testControlJson.do', param).then((res) => {
    sortList.value = res.data.lecList;
  });
};

const TestList = (cpage) => {
  console.log('useornot', UseOrNot.value);
 
  cpage = cpage || 1;
  let param = new URLSearchParams();
  param.append('cpage', cpage);
  param.append('pagesize', 10);
  param.append('lecList', sort.value);
  param.append('use_yn', UseOrNot.value ? 'N' : 'Y');
  axios.post('/tut/testListRtn.do', param).then((res) => {
    testList.value = res.data.listdata;
    totalCnt.value = res.data.listcnt;
    currentPage.value = cpage;
  });
};

const UseYN = () => {
  const checkedItems = testList.value
  .filter(data => data.selected)
  .map(data => data.que_id);

  if (checkedItems.length === 0){
    alert('문제를 선택해 주세요 ');
    return;
  }
  let param = new URLSearchParams();
  param.append('que_id',checkedItems.join(','));
  axios.post('/tut/testDeactivate.do', param).then((res) => {
    TestList();
  });
}

const checkBoxALL = () => {
  testList.value.forEach( data => {data.selected = checkAll.value})
}


const modalHandler = (param) =>{
  modalBoolean.value = true
  que_id.value =param
}

watch(UseOrNot , ()=>{
  TestList();
});

onMounted(()=> {
  TestSortList();
  TestList();
})
</script>

<style>

</style>