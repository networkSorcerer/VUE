<template>
  <div class="backdrop">
    <div class="container"> 
      <div class="text-center my-4"> 
        <p class="h4">설문 조사</p>
      </div>
      <div> 
        <table class="table table-bordered mb-4"> 
          <tr>
            <td class="table-secondary">강의명</td>
            <td>{{ lec_name }}</td>
            <td class="table-secondary">강사명</td>
            <td>{{ tut_name }}</td>
          </tr>
        </table>
        <div v-for="(data, i) in dataList" :key="i" class="mb-4">
          <table class="table table-bordered"> 
            <colgroup>
              <col width="10%">
              <col width="20%">
              <col width="10%">
              <col width="10%">
              <col width="30%">
              <col width="10%">
              <col width="10%">
            </colgroup>
            <tr>
              <td class="table-primary">{{ data.que_num }}</td>
              <td colspan="4">{{ data.que }}</td>
            </tr>
            <tr v-if="data.que_num != 11">
              <td>
                <input type="radio" :value="1" v-model="responses['survey_answer' + i]">
                {{ data.que_one }}
              </td>
              <td>
                <input type="radio" :value="2" v-model="responses['survey_answer' + i]">
                {{ data.que_two }}
              </td>
              <td>
                <input type="radio" :value="3" v-model="responses['survey_answer' + i]">
                {{ data.que_three }}
              </td>
              <td>
                <input type="radio" :value="4" v-model="responses['survey_answer' + i]">
                {{ data.que_four }}
              </td>
              <td>
                <input type="radio" :value="5" v-model="responses['survey_answer' + i]">
                {{ data.que_five }}
              </td>
            </tr>
            <tr v-else>
              <td colspan="5">
                <textarea class="form-control" rows="3" v-model="responses['survey_review']"></textarea>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="text-center my-4"> 
        <button class="btn btn-primary mx-2" @click="SubmitEvent">제출</button>
        <button @click="$emit('closeModal', false)" class="btn btn-light mx-2">닫기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from 'vue';

const props = defineProps({
  lec_id: Number,
  tut_name: String,
  lec_name: String
});

const emit = defineEmits(['closeAndSearch']);

const dataList = ref([]);
const responses = ref({});
const listCnt = ref(0);

const Survey = () => {
  let param = new URLSearchParams();
  param.append('lec_id', props.lec_id);  // 필요 시 추가
  axios.post('/std/surveyItemListJson.do', param).then((res) => {
    dataList.value = res.data.listData;
    listCnt.value = res.data.listCnt;
  });
};

const SubmitEvent = () => {
  let param = new URLSearchParams();
  param.append('lec_id', props.lec_id);
  param.append('listCnt', listCnt.value);
  param.append('lec_name', props.lec_name);
  param.append('tut_name', props.tut_name);

  Object.keys(responses.value).forEach(key => {
    param.append(key, responses.value[key]);
  });

  dataList.value.forEach((data, index) => {
    param.append('que_num' + index, data.que_num);
  });

  axios.post('/std/submitSurvey.do', param).then((res) => {
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
  
}

onMounted(() => {
  Survey();
});
</script>

<style scoped>
.table td {
  vertical-align: middle;
  text-align: center;
}

.table-secondary {
  background-color: #f7f7f7;
  font-weight: bold;
}

.table-primary {
  background-color: #e9f7fd;
}

textarea.form-control {
  resize: none;
}
</style>
