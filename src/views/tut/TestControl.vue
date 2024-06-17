<template>
<div>
  <div> 
    <div>
      <div> 
        <p>/ 학습 관리 / 시험 관리</p>
      </div> 
      <div> 
        <h3>시험 문제 관리</h3>
      </div>
      <div> 
        <input type="checkbox"/>
      </div>
      <div> 
        <select>
          <option></option>
        </select>
      </div>
      <div> 
        <button>문제등록</button>
      </div>
      <div> 
        <div> 
          <table> 
            <tr>
              <td>전체선택</td>
              <td>시험분류</td>
              <td>문제</td>
              <td>정답</td>
              <td>보기1</td>
              <td>보기2</td>
              <td>보기3</td>
              <td>보기4</td>
              <td><button>비활성</button></td>
            </tr>
            <tr v-for="data in dataList" :key="data.lec_id">
              <td></td>
              <td>{{ data.lec_type_name }}</td>
              <td>{{  }}</td>
              <td>{{  }}</td>
              <td>{{  }}</td>
              <td>{{  }}</td>
              <td>{{  }}</td>
              <td>{{  }}</td>
              <td><button>수정</button></td>
            </tr>
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
const dataList1 = ref([]);
const dataList2 = ref([]);

const TestList = (cpage = 1) => {
  let param = new URLSearchParams();
  param.append('cpage', cpage);
  param.append('pagesize', 5);

  axios.post('/tut/tutTestJsonList.do', param).then((res) => {
    if (res.data && res.data.listdata) {
      dataList.value = res.data.listdata;
    } else {
      console.error('Unexpected response structure:', res.data);
    }
  }).catch((error) => {
    console.error('Error fetching test list:', error);
  });
};

const detailTest = () => {
  let param = new URLSearchParams();
  // 필요한 매개변수 추가
  // param.append('key', 'value');

  axios.post('/tut/tutTestJsonDetail.do', param).then((res) => {
    if (res.data && res.data.listdata) {
      dataList1.value = res.data.listdata;
    } else {
      console.error('Unexpected response structure:', res.data);
    }
  }).catch((error) => {
    console.error('Error fetching test details:', error);
  });
};

const TList = () => {
  let param = new URLSearchParams();
  // 필요한 매개변수 추가
  // param.append('key', 'value');

  axios.post('/tut/testItemListJson.do', param).then((res) => {
    if (res.data && res.data.listData) {
      dataList2.value = res.data.listData;
    } else {
      console.error('Unexpected response structure:', res.data);
    }
  }).catch((error) => {
    console.error('Error fetching test items:', error);
  });
};

onMounted(() => {
  TestList();
  detailTest();
  TList();
});
</script>


<style>

</style>