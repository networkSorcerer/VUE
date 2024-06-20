<template>
  <div class="backdrop">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">수강목록 상세보기</h5>

              <div v-if="detail.length > 0" class="my-3">
                <table class="table table-bordered">
                  <tr>
                    <th scope="row">강의명</th>
                    <td>{{ detail[0].lec_name }}</td>
                    <th scope="row">강의분류</th>
                    <td>{{ detail[0].lec_type_id }}</td>
                  </tr>
                  <tr>
                    <th scope="row">강사명</th>
                    <td>{{ detail[0].tut_name }}</td>
                    <th scope="row">강의실</th>
                    <td>{{ detail[0].lecrm_name }}</td>
                  </tr>
                  <tr>
                    <th scope="row">강의기간</th>
                    <td colspan="3">{{ detail[0].start_date }} ~ {{ detail[0].end_date }}</td>
                  </tr>
                  <tr>
                    <th scope="row">수업목표</th>
                    <td colspan="3">{{ detail[0].lec_goal }}</td>
                  </tr>
                </table>
              </div>

              <div v-for="(week, i) in detail" :key="i" class="my-3">
                <table class="table table-bordered">
                  <tr v-if="week.week != null">
                    <th rowspan="2" scope="row">{{ week.week }}</th>
                    <th scope="row">학습목표</th>
                    <td>{{ week.learn_goal }}</td>
                  </tr>
                  <tr>
                    <th scope="row">학습내용</th>
                    <td>{{ week.learn_con }}</td>
                  </tr>
                </table>
              </div>

              <div class="text-center">
                <button type="button" class="btn btn-secondary" @click="$emit('closeModal', false)">닫기</button>
              </div>
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

const fetchLecDetail = () => {
  let param = new URLSearchParams();
  param.append('lec_id', props.lec_id);
  param.append('loginID', props.loginID);
  
  axios.post('/std/myLecDetailJson.do', param)
    .then((res) => {
      console.log(res.data);  // API 응답 데이터 콘솔에 출력
      detail.value = res.data.listData;
    })
    .catch((error) => {
      console.error('Error fetching lecture details:', error);
    });
};

onMounted(() => {
  fetchLecDetail();
});
</script>

<style scoped>
.backdrop {
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 반투명한 배경 */
}

.container {
  padding: 1rem;
}

.card {
  width: 100%;
}

.my-3 {
  margin-bottom: 1.5rem; /* 각 섹션 간격 조정 */
}
</style>
