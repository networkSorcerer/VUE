<template>
  <div class="backdrop">
    <div class="container bg-white p-4 rounded">
      <div>
        <div class="d-flex justify-content-end mb-3">
          <button type="button" class="btn btn-primary me-2" @click="SubmitEvent">제출</button>
          <button type="button" class="btn btn-secondary" @click="$emit('closeModal', false)">닫기</button>
        </div>
        <div>
          <div class="mb-4">
            <table class="table">
              <tbody>
                <tr>
                  <td>강의명</td>
                  <td>{{ lec_name }}</td>
                  <td>강사명</td>
                  <td>{{ tut_name }}</td>
                </tr>
              </tbody>
            </table>
            <div>
              <div v-for="(data, i) in dataList" :key="i" class="mb-4">
                <table class="table table-bordered">
                  <tbody>
                    <tr>
                      <td colspan="5">{{ data.que }}</td>
                    </tr>
                    <tr>
                      <td v-if="data.que_num === 11" colspan="5">
                        <textarea v-model="responses['survey_review']" class="form-control" placeholder="의견을 입력하세요"></textarea>
                      </td>
                      <template v-else>
                        <td>
                          <label class="form-check-label">
                            <input type="radio" class="form-check-input" value="1" v-model="responses['survey_answer' + i]">
                            {{ data.que_one }}
                          </label>
                        </td>
                        <td>
                          <label class="form-check-label">
                            <input type="radio" class="form-check-input" value="2" v-model="responses['survey_answer' + i]">
                            {{ data.que_two }}
                          </label>
                        </td>
                        <td>
                          <label class="form-check-label">
                            <input type="radio" class="form-check-input" value="3" v-model="responses['survey_answer' + i]">
                            {{ data.que_three }}
                          </label>
                        </td>
                        <td>
                          <label class="form-check-label">
                            <input type="radio" class="form-check-input" value="4" v-model="responses['survey_answer' +i]">
                            {{ data.que_four }}
                          </label>
                        </td>
                        <td>
                          <label class="form-check-label">
                            <input type="radio" class="form-check-input" value="5" v-model="responses['survey_answer' + i]">
                            {{ data.que_five }}
                          </label>
                        </td>
                      </template>
                    </tr>
                  </tbody>
                </table>
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
import { ref, onMounted } from 'vue';

const emit = defineEmits(['closeAndSearch']);
const props = defineProps({
  lec_id: Number,
  tut_name: String,
  lec_name: String,
});

const listCnt = ref(0);
const dataList = ref([]);
const responses = ref({});
const que_num = ref('');

const SubmitEvent = () => {
  let param = new URLSearchParams();
  param.append('lec_id', props.lec_id);
  param.append('listCnt', listCnt.value);
  param.append('lec_name', props.lec_name);
  param.append('tut_name', props.tut_name);
  
  Object.keys(responses.value).forEach(key => {
    param.append(key, responses.value[key]);
  });
  dataList.value.map((a) => {
    param.append('que_num'+a.que_num, a.que_num);
  })

  console.log('응답 리스트', responses);
  axios.post('/std/submitSurvey.do', param).then((res) => { // 실제 API 경로에 맞게 수정 필요
    if (res.data.result === 'SUCCESS') {
      alert('제출에 성공했습니다');
      emit('closeAndSearch', false);
    } else {
      alert('제출에 실패했습니다');
    }
  }).catch((error) => {
    console.error('Error submitting survey:', error);
    alert('제출 중 오류가 발생했습니다');
  });
};

const Survey = () => {
  let param = new URLSearchParams();
  axios.post('/std/surveyItemListJson.do', param).then((res) => {
    dataList.value = res.data.listData;
    listCnt.value = res.data.listCnt;
    que_num.value = res.data.que_num;
  }).catch((error) => {
    console.error('Error fetching survey items:', error);
  });
};

onMounted(() => {
  Survey();
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
  background: rgba(0, 0, 0, 0.5); /* Updated for better contrast */
}
.container {
  background: white;
  padding: 1.5rem;
  height: auto; /* Updated for dynamic content */
  border-radius: 0.25rem; /* Bootstrap border radius */
}
</style>
