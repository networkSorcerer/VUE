<template>
  <div class="backdrop">
    <div class="container">
      <div>
        <div>
          <button type="button" class="btn btn-light" @click="SubmitEvent">제출</button>
          <button type="button" class="btn btn-light" @click="$emit('closeModal', false)">닫기</button>
        </div>
        <div>
          <div>
            <div>
              <table>
                <tr v-if="lecId">
                    <td>강의명</td>
                    <td> <input type="text" v-model="dataList.lec_name"></td>
                    <td>강사명</td>
                    <td><input type="text" v-model="dataList.tut_name"></td>
                </tr>
                <tr v-for="q in datalist " :key="q.que_num" >
                  <td>{{ data.que }}</td>
                </tr>
                <tr v-for="data in dataList" :key="'input-' + data.que_num">
                  <td>
                    <div v-if="data.que_num === 11">
                      <textarea v-model="responses[data.que_num]" placeholder="의견을 입력하세요"></textarea>
                    </div>
                    <div v-else>
                      <label>
                        <input type="radio" :name="'rating-' + data.que_num" :value="data.que_one" v-model="responses[data.que_num]">
                        {{ data.que_one }}
                      </label>
                      <label>
                        <input type="radio" :name="'rating-' + data.que_num" :value="data.que_two" v-model="responses[data.que_num]">
                        {{ data.que_two }}
                      </label>
                      <label>
                        <input type="radio" :name="'rating-' + data.que_num" :value="data.que_three" v-model="responses[data.que_num]">
                        {{ data.que_three }}
                      </label>
                      <label>
                        <input type="radio" :name="'rating-' + data.que_num" :value="data.que_four" v-model="responses[data.que_num]">
                        {{ data.que_four }}
                      </label>
                      <label>
                        <input type="radio" :name="'rating-' + data.que_num" :value="data.que_five" v-model="responses[data.que_num]">
                        {{ data.que_five }}
                      </label>
                    </div>
                  </td>
                </tr>
              </table>
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
    lecId: Number,
    tut_name: String,
    lec_name: Object,
    });
console.log(props.lecId);
console.log(props.tut_name);
console.log(props.lec_name);


const dataList = ref([]);
const responses = ref({});

const SubmitEvent = () => {
  let param = new URLSearchParams();
  param.append('lec_id', props.lecId);
  param.append('listCnt','');
  Object.keys(responses.value).forEach(key => {
    param.append(key, responses.value[key]);
  });
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
  param.append('lec_id', props.lec_id);
  param.append('lec_name', props.lec_name);
  param.append('tut_name', props.tut_name);
  axios.post('/std/surveyItemListJson.do', param).then((res) => {
    dataList.value = res.data.listData;
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
  background: rgba(255, 255, 255, 0.5);
}
.container {
  background: white;
  padding: 1.5rem;
  height: 50%;
}
</style>
