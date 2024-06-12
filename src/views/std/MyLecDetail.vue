<template>
    <div class="backdrop">
      <div class="container">
        <div>
          <div>
            <div>
              <div>
                <p>수강목록 상세보기</p>
              </div>
              <div v-for="data in detail" :key="data.loginID" >
                <table>
                  <tr>
                    <td>강의명</td>
                    <td>{{ data.lec_name }}</td>
                    <td>강의분류</td>
                    <td>{{ data.lec_type_id }}</td>
                  </tr>
                  <tr>
                    <td>강사명</td>
                    <td>{{ data.tut_name }}</td>
                    <td>강의실</td>
                    <td>{{ data.lecrm_name }}</td>
                  </tr>
                  <tr>
                    <td>강의기간</td>
                    <td>{{ data.start_date }} ~ {{ data.end_date }}</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>수업목표</td>
                    <td>{{ data.lec_goal }}</td>
                    <td></td>
                    <td></td>
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
  