<template>
    <div class="backdrop">
      <div class="container">
        <div>
          <div>
            <div>
              <div>
                <p>수강목록 상세보기</p>
              </div>
              <div v-if="detail.length >0 ">
                <table>
                  <tr>
                    <td>강의명</td>
                    <td>{{ detail[0].lec_name }}</td>
                    <td>강의분류</td>
                    <td>{{ detail[0].lec_type_id }}</td>
                  </tr>
                  <tr>
                    <td>강사명</td>
                    <td>{{ detail[0].tut_name }}</td>
                    <td>강의실</td>
                    <td>{{ detail[0].lecrm_name }}</td>
                  </tr>
                  <tr>
                    <td>강의기간</td>
                    <td>{{ detail[0].start_date }} ~ {{ detail[0].end_date }}</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>수업목표</td>
                    <td>{{ detail[0].lec_goal }}</td>
                    <td></td>
                    <td></td>
                  </tr>
                </table>
              </div>
              
              <div v-for="(week, i) in detail" :key="i"> 
                <table>
                  <tr v-if="week.week != null">
                    <td rowspan="2">{{ week.week }}</td>
                    <td>학습목표</td>
                    <td>{{ week.learn_goal }}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>학습내용</td>
                    <td>{{ week.learn_con }}</td>
                  </tr>
                </table>
              </div>
              <div>
                <button type="button" class="btn btn-light" @click="$emit('closeModal', false)">닫기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import axios from 'axios';
  import { onMounted, ref } from 'vue';
  
  
  const detail = ref([]);
  const props = defineProps({
    lec_id: Number,
    loginID: String,
  });
  
  const LecDetail = () => {
    let param = new URLSearchParams();
    param.append('lec_id', props.lec_id);
    param.append('loginID', props.loginID);
    axios.post('/std/myLecDetailJson.do', param).then((res) => {
      console.log(res.data);  // API 응답 데이터 콘솔에 출력
      detail.value = res.data.listData;
    }).catch((error) => {
      console.error('Error fetching lecture details:', error);
    });
  };
  
  onMounted(() => {
    LecDetail();
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
  .container {
    background: white;
    padding: 1.5rem;
    height: 50%;
  }
  </style>
  