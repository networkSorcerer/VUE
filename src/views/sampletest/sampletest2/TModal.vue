<template>
  <div> 
    <div> 
      <div> 
        <div v-if="que_id"></div>
        <div> 
          <table>
            <tr>
              <td>시험분류</td>
              <td>
                <select>
                  <option></option>
                </select>
              </td>
            </tr>
            <tr>
              <td>문제</td>
              <td>
                <input type="text">
              </td>
            </tr>
            <tr>
              <td>정답</td>
              <td>
                <input type="text">
              </td>
            </tr>
            <tr>
              <td>보기1</td>
              <td>
                <input type="text">
              </td>
            </tr>
            <tr>
              <td>보기2</td>
              <td>
                <input type="text">
              </td>
            </tr>
            <tr>
              <td>보기3</td>
              <td>
                <input type="text">
              </td>
            </tr>
            <tr>
              <td>보기4</td>
              <td>
                <input type="text">
              </td>
            </tr>
            <tr>
              <td>문제</td>
              <td>
                <select>
                  <option></option>
                  <option></option>
                </select>
              </td>
            </tr>
          </table>
        </div>
        <div> 
          <button>저장</button>
          <button>취소</button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import axios from 'axios';
import {ref, onMounted} from 'vue';

const props = defineProps({
  que_id : Number
});

const dataList = ref([]);

const Update =()=> {
  let param = new URLSearchParams();
  axios.post('/tut/testModifyList.do', param).then((res) =>{
    dataList.value = res.data.data;
  });
};

onMounted(()=>{
  Update();
})
</script>


