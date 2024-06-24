<template>
  <div class="backdrop"> 
    <div class="container"> 
      <div>  
        <div >  
          <div  v-if="que_id"></div>
          <table >
            <tr>
              <td>시험분류</td>
              <td>
                <select v-model="dataList.lec_type_id">
                  <option v-for="sortdata in sortList" :key="sortdata.lec_type_id" :value="sortdata.lec_type_id">{{ sortdata.lec_type_name }}</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>문제</td>
              <td>
                <input type="text" v-model="dataList.test_que">
              </td>
            </tr>
            <tr>
              <td>정답</td>
              <td>
                <input type="text" v-model="dataList.que_ans">
              </td>
            </tr>
            <tr>
              <td>보기1</td>
              <td>
                <input type="text" v-model="dataList.que_ex1">
              </td>
            </tr>
            <tr>
              <td>보기2</td>
              <td>
                <input type="text" v-model="dataList.que_ex2">
              </td>
            </tr>
            <tr>
              <td>보기3</td>
              <td>
                <input type="text" v-model="dataList.que_ex3">
              </td>
            </tr>
            <tr>
              <td>보기4</td>
              <td>
                <input type="text" v-model="dataList.que_ex4">
              </td>
            </tr>
            <tr>
              <td>사용여부</td>
              <td>
                <select v-model="dataList.use_yn">
                  <option value="Y">활성화</option>
                  <option value="N">비활성화</option>
                </select>
              </td>
            </tr>
          </table>
        </div>
        <div>
          <template v-if="!que_id">
            <button   @click="Update('I')">저장</button>
          </template> 
          <template v-else>
            <button  @click="Update('U')"  >수정</button>
          </template>
          <button @click="$emit('closeModal', false)">취소</button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import axios from 'axios';
import {ref, onMounted, watch} from 'vue';

const props = defineProps({
  que_id : Number,
  sortList: Array
});

const emit = defineEmits(['closeAndSearch'])

const dataList = ref(new Object());
const sort = ref(0);

console.log('dataList',dataList.value);
console.log('sortList', props.sortList);
console.log('que_id', props.que_id)

const DT =()=> {
  let param = new URLSearchParams();
  param.append('que_id',props.que_id);
  axios.post('/tut/testModifyList.do', param).then((res) =>{
    dataList.value = res.data.selinfo;
  });
};

const Update = (data) =>{
  let param = new URLSearchParams(dataList.value);
  if (props.que_id != null) {
    param.append('que_id', props.que_id);
  } 
  param.append('action', data);
  axios.post('/tut/testSave.do',param).then((res)=>{
    alert(res.data.resultMsg)
      emit('closeAndSearch',false);
  })
}

watch(sort, ()=> {
  console.log('분류',sort.value);
})

onMounted(()=>{
  props.que_id ? DT() : null;//  중요하다 까먹으면 안된다 
})
</script>


