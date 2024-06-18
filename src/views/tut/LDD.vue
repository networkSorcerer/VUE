<template>
    <div class="backdrop">
      <div class="modal-dialog modal-dialog-centered"> 
        <div class="modal-content"> 
          <div class="modal-header">
            <h5 class="modal-title">자료 등록</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body"> 
            <table class="table">
              <tr>
                <td>제목</td>
                <td>
                  <input type="text" class="form-control" v-model="dataList.learnTitle">
                </td>
              </tr>
              <tr>
                <td>등록일자</td>
                <td>
                  <input type="text" class="form-control" v-model="formattedWriteDate">
                </td>
              </tr>    
              <tr> 
                <td>자료내용</td>
                <td>
                  <input type="text" class="form-control" v-model="dataList.learnContent">
                </td>
              </tr>
              <tr>
                <td>첨부파일</td>
                <td>
                  <input type="file" class="form-control">
                </td>
              </tr>
            </table>
          </div>
          <div class="modal-footer"> 
            <button type="button" class="btn btn-primary" @click="updateLD">수정</button>
            <button type="button" class="btn btn-danger" @click="DelLD(dataList.learn_data_id)">삭제</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="$emit('closeModal', false)">취소</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import axios from 'axios';
  import { ref, onMounted, computed } from 'vue';
  
  const props = defineProps({
    learn_data_id: Number,
  });
  
  const emit = defineEmits(['closeModal', 'updateSuccess', 'updateFailure']);
  
  const dataList = ref({});
  
  const loadDetailData = () => {
    let param = new URLSearchParams();
    param.append('learnDataId', props.learn_data_id);
  
    axios.post('/tut/getDetailLearnMat.do', param).then((res) => {
      dataList.value = res.data.detailLearnMat;
    });
  };
  
  const updateLD = () => {
    let param = new URLSearchParams();
    param.append('learnMatId', dataList.value.learn_data_id);
    param.append('updateLearnTitle', dataList.value.learnTitle);
    param.append('updateLearnContent', dataList.value.learnContent);
    param.append('file', null);  // 파일 처리 로직 필요 시 추가
  
    axios.post('/tut/updateLearnMat.do', param).then((res) => {
      if (res.data === true) {
        alert('수정에 성공했습니다');
        emit('updateSuccess', '수정에 성공했습니다');
      } else {
        alet('수정에 실패했습니다');
        emit('updateFailure', '수정에 실패했습니다');
      }
    });
  };
  
  const formattedWriteDate = computed({
    get() {
      return dataList.value.writeDate ? new Date(dataList.value.writeDate).toLocaleDateString() : '';
    },
    set(value) {
      const dateParts = value.split('.');
      if (dateParts.length === 3) {
        const [year, month, day] = dateParts;
        dataList.value.writeDate = new Date(year, month - 1, day).getTime();
      }
    }
  });

  const DelLD = () => {
    let param = new URLSearchParams();
    param.append('learn_data_id',dataList.value.learn_data_id);
    axios.post('/tut/deleteLearnMat.do/{learnMatId}',param).then((res) =>{
        
    })
  }
  
  onMounted(() => {
    loadDetailData();
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
  .modal-dialog {
    width: 100%;
    max-width: 600px;
    margin: auto;
  }
  </style>
  