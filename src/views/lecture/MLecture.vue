<template>
    <div class="backdrop">
      <div class="container mt-8">
        <div v-if="lec_id"></div>
        <h3>과정 등록</h3>
        <div>
          <table class="table">
            <tr>
              <td>강의명 </td>
              <td><input type="text" class="form-control" v-model="dataList.lec_name"> </td>
            </tr>
            <tr>
              <td>강의 분류</td>
              <td>
                <select v-model="dataList.lec_type_id" class="form-select" style="height: 40px; width: 500px;">
                  <option v-for="type in typeList" :key="type.lec_type_id" :value="type.lec_type_id">{{ type.lec_type_name }}</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>최대인원</td>
              <td><input type="text" class="form-control" v-model="dataList.max_pnum"></td>
            </tr>
            <tr>
              <td>강사명</td>
              <td>
                
                <select v-model="dataList.tutor_id" class="form-select" style="height: 40px;width: 500px;" v-if="lec_id">
                  <option v-for="tut in tutList" :key="tut.tutor_id" :value="tut.tutor_id">{{ tut.t_name }}</option>
                </select>
                <input type="text" v-else disabled>
              </td>
            </tr>
            <tr>
              <td>강의실</td>
              <td>
                <select v-model="dataList.lecrm_id" class="form-select" style="height: 40px; width: 500px;">
                  <option v-for="lecrm in lecrmList" :key="lecrm.lecrm_id" :value="lecrm.lecrm_id">{{ lecrm.lecrm_name }}</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>과정일수</td>
              <td><input type="text" class="form-control" v-model="dataList.process_day"></td>
            </tr>
            <tr>
              <td>개강일</td>
              <td><input type="date" class="form-control" v-model="dataList.start_date"></td>
            </tr>
            <tr>
              <td>종강일</td>
              <td><input type="date" class="form-control" v-model="dataList.end_date"></td>
            </tr>
          </table>
        </div>
        <div class="mt-3">
          <template v-if="!lec_id">
            <button class="btn btn-primary" @click="Update('I')">등록</button>
          </template>
          <template v-else>
            <button class="btn btn-primary"  @click="Update('U')">수정</button>
          </template>
          <button type="button" class="btn btn-light" @click="$emit('closeModal', false)">닫기</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import axios from "axios";
  import { ref, onMounted } from 'vue';
  
  const lecrmList = ref([]);
  const tutList = ref([]);
  const typeList = ref([]);

  const props = defineProps({
    lec_id: Number
  })
  
  const Sort = () => {
    let param = new URLSearchParams();
    axios.post('/register/registerListControljson.do', param).then((res) => {
      tutList.value = res.data.tutList; // 강사 이름 로그인 ID
      lecrmList.value = res.data.lecrmList; // 강의실 정보 가져오기 lecrm_id, lecrm_name
      typeList.value = res.data.typeList; // 강의 분류 lec_type_id , lec_type_name
    });
  };
  
  const emit = defineEmits(['closeAndSearch']);
  
  const dataList = ref(new Object());
  
  const MLecture = () => {
    let param = new URLSearchParams();
    param.append('lec_id', props.lec_id);
    axios.post('/register/lecInfo.do', param).then((res) => {
      dataList.value = res.data.lecinfo;
    });
  };
  
  const Update =(data) => {
    let param = new URLSearchParams(dataList.value);
    param.append('lec_id', props.lec_id);
    param.append('action',data );
    axios.post('/register/saveRegister.do', param).then((res) => {
        if(res.data.result === 'S') {
            alert(res.data.resultMsg);
        }
    });
  };


  onMounted(() => {
    if (props.lec_id) {
      MLecture();
    }
    Sort();
  })
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
  .container {
    background: white;
    padding: 1.5rem;
    height: auto;
  }
  </style>
  