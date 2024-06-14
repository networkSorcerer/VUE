<template>
  <div class="backdrop">
    <div class="container mt-5">
      <div class="modal-dialog">
        <div class="modal-content p-4">
          <h3>Course Registration</h3>
          <div class="mt-3">
            <table class="table table-bordered">
              <tr>
                <td class="font-weight-bold">Select Course</td>
                <td>
                  <select class="form-control" v-model="selectedCourse">
                    <option v-for="course in dataList" :key="course.lec_id" :value="course.lec_id">
                      {{ course.lec_name }}
                    </option>
                  </select>
                </td>
              </tr>
            </table>
          </div>
          <div class="mt-3 d-flex justify-content-between">
            <button class="btn btn-primary" @click="registerLecture">Register</button>
            <button type="button" class="btn btn-secondary" @click="$emit('closeModal', false)">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
  import { onMounted, inject, ref } from 'vue';
  import axios from 'axios';
  
  const dataList = inject('dataList');
  const emit = defineEmits(['closeModal', 'closeAndSearch']);
  const props = defineProps({
    loginID: Number,
  });

  const selectedCourse = ref('');

  const registerLecture = () => {
    let param = new URLSearchParams();
    param.append('std_id', props.loginID);
    param.append('lec_id', selectedCourse.value);
    
    axios.post('/adm/std_lec_reg.do', param)
      .then((res) => {
        if (res.data.result === 'SUCCESS') {
          alert(res.data.resultMsg);
          emit('closeAndSearch', false);
        } else {
          alert('수강 신청에 실패했습니다');
          emit('closeAndSearch', false);
        }
      })
      .catch((error) => {
        console.error("Error registering lecture:", error);
        alert('수강 신청에 실패했습니다');
      });
  };

  onMounted(() => {
    if (props.loginID) {
      // 초기화 시 강의를 등록하는 부분이 의도된 것인지 확인 필요
      // registerLecture();
    }
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
    background: rgba(0, 0, 0, 0.5);
  }

  .container {
    background: white;
    padding: 1.5rem;
    height: 50%;
  }
</style>

