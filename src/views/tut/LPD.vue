<template>
    <div class="backdrop"> 
      <div class="container mt-4">
        <div class="row">
          <div class="col">
            <div>
              <div>
                <div>
                  <div>
                    <div>
                      <p class="mb-3"><strong>강의 계획서</strong></p>
                    </div>
                    <div>
                      <table class="table table-bordered" @change="LecInfo()">
                        <tr>
                          <td>과목</td>
                          <td>
                            <select class="form-select" v-model="selectLec">
                              <option value="">과목명 선택</option>
                              <option v-for="data in lecname" :key="data.lec_id" :value="data.lec_id">{{ data.lec_name }}</option>
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>강의분류</td>
                          <td>
                            <select class="form-select" v-model="selectedLecType">
                              <option value="">과정명 선택</option>
                              <option v-for="type in lectype" :key="type.lec_type_id" :value="type.lec_type_id">{{ type.lec_type_name }}</option>
                            </select>
                          </td>
                          <td>대상자</td>
                          <td>
                            <select class="form-select" v-model="slectsort"> 
                              <option value="">대상자 선택</option>
                              <option value="실업자">실업자</option>
                              <option value="직장인">직장인</option>
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>강사명</td>
                          <td><input type="text" class="form-control" v-model="dataList.name" disabled></td>
                          <td>강의실</td>
                          <td>
                            <select class="form-select" v-model="selectedLecRoom">
                              <option value="">강의실 선택</option>
                              <option v-for="room in lecroom" :key="room.lecrm_id" :value="room.lecrm_id">{{ room.lecrm_name }}</option>
                            </select>
                            현재 강의 실 :{{ dataList.lecrm_name}}
                          </td>
                        </tr>
                        <tr>
                          <td>이메일</td>
                          <td><input type="text" class="form-control" v-model="dataList.mail" disabled></td>
                          <td>연락처</td>
                          <td><input type="text" class="form-control" v-model="dataList.tel" disabled></td>
                        </tr>
                        <tr>
                          <td>수업목표</td>
                          <td colspan="3"><textarea class="form-control" v-model="dataList.lec_goal"></textarea></td>
                        </tr>
                      </table>
                    </div>
                    <div class="mb-3">
                      <button class="btn btn-primary me-2">주차 추가</button>
                      <button class="btn btn-danger">주차 삭제</button>
                    </div>
                    <div> 
                      <WEEK v-for="week in weekdata" :key="week.lec_id" :week="week"/>
                    </div>
                  </div>
                  <div> 
                    <button class="btn btn-primary" @click="UpdateLecInfo()">저장</button>
                    <button class="btn btn-primary" @click="$emit('closeModal', false)">닫기</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import axios from "axios";
  import WEEK from './WP.vue';
  import { ref, onMounted, watch } from 'vue';
  
  const props = defineProps({
    propsObject: Object
  });
  
  const emit = defineEmits(['closeAndSearch']);
  
  const dataList = ref({});
  const weekdata = ref([]);
  const lecname = ref([]);
  const lectype = ref([]);
  const lecroom = ref([]);
  
  
  const selectedLecType = ref(props.propsObject.lec_type_id);
  const selectedLecRoom = ref(dataList.lecrm_name);
  const selectLec = ref(props.propsObject.lec_id);
  const slectsort = ref(props.propsObject.lec_sort);

  const LecInfo = () => {
    let param = new URLSearchParams();
    param.append('lec_id', props.propsObject.lec_id);
    axios.post('/tut/fLecInfo.do', param).then((res) => {
      dataList.value = res.data.lec_info;
      weekdata.value = res.data.week_plan;
    });
  };
  
  const LecName = () => {
    let param = new URLSearchParams();
    axios.post('/tut/lecturePlanJson1.do', param).then((res) => {
      lecname.value = res.data.lecList;
      lectype.value = res.data.typeList;
      lecroom.value = res.data.lecRoom;
    });
  };
  
  const UpdateLecInfo = () => {
    let param = new URLSearchParams();
    param.append('lec_id', props.propsObject.lec_id);
    param.append('tutor_id', dataList.value.loginID); // Ensure this is set correctly
    param.append('lec_name', dataList.value.lec_name);
    param.append('lec_type_id', selectedLecType.value); // Use selected type ID
    param.append('lec_sort', slectsort.value);
    param.append('lecrm_id', selectedLecRoom.value); // Use selected room ID
    param.append('lec_goal', dataList.value.lec_goal);
    
    axios.post('/tut/savePlan.do', param).then((res) => {
      if (res.data.result === 'SUCCESS') {
        alert(res.data.resultMsg);
        emit('closeAndSearch', false);
      } else {
        alert('저장에 실패하였습니다');
      }
    });
  };
  
  const onGoingLecture = () => {
    
  }

  const termiantedLecture =()=> {
    
  }

  onMounted(() => {
    LecInfo();
    LecName();
  });
  
  watch(() => props.propsObject, (newVal) => {
    selectedLecType.value = newVal.lec_type_id;
    selectedLecRoom.value = newVal.lecrm_id;
    selectLec.value = newVal.lec_id;
    LecInfo();
  }, { immediate: true });
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
    height: 50%;
  }
  </style>
  