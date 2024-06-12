<template>
    <div class="backdrop">
      <div class="container">
        <div>
          <p>강의 정보</p>
          <div>
            <table>
              <tr v-if="lecInfo">
                <td>강의명</td>
                <td>{{ lecInfo.lec_name }}</td>
                <td>수강대상</td>
                <td>{{ lecInfo.lec_sort }}</td>
              </tr>
              <tr v-if="lecInfo">
                <td>강사명</td>
                <td>{{ lecInfo.name }}</td>
                <td>연락처</td>
                <td>{{ lecInfo.tel }}</td>
              </tr>
              <tr v-if="lecInfo">
                <td>이메일</td>
                <td>{{ lecInfo.mail }}</td>
                <td>강의실</td>
                <td>{{ lecInfo.lecrm_name }}</td>
              </tr>
              <tr v-if="lecInfo">
                <td>수업목표</td>
                <td colspan="3">{{ lecInfo.learn_goal }}</td>
              </tr>
            </table>
          </div>
          <div>
            <h3>강의 계획</h3>
            <table v-if="lecInfo.weeks">
              <tr>
                <td>주차수</td>
                <td>학습목표</td>
                <td>학습내용</td>
              </tr>
              <tr v-for="(week, index) in lecInfo.weeks" :key="index">
                <td>{{ week.week }}</td>
                <td>{{ week.goal }}</td>
                <td>{{ week.content }}</td>
              </tr>
            </table>
          </div>
        </div>
        <div>
          <button class="btn btn-light" @click="regi">수강신청</button>
          <button type="button" class="btn btn-light" @click="$emit('closeModal', false)">닫기</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import axios from 'axios';
 
  
  const emit = defineEmits(['closeAndSearch']);
  const props = defineProps({
    loginID: Number,
    lec_id: Number,
    lecInfo: Object,
    weekplan: Object,
  });
  
  const regi = () => {
    let param = new URLSearchParams();
    param.append('lec_id', props.lec_id);
    
    axios.post('/std/lecReg.do', param).then((res) => {
      if (res.data.result === 'SUCCESS') {
        alert('수강신청에 성공했습니다');
        emit('closeAndSearch', false);
      } else {
        alert('수강신청에 실패했습니다');
      }
    }).catch((error) => {
      console.error('Error during registration:', error);
    });
  };
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
  