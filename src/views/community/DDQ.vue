<template>
    <div class="backdrop"> 
      <div class="container p-4 bg-light rounded shadow"> 
        <div class="mb-4"> 
          <h4>Q&A 수정</h4>
        </div>
        <form>
          <div class="mb-3">
            <label for="qnaTitle" class="form-label">제목</label>
            <input type="text" class="form-control" id="qnaTitle" v-model="localQnaTitle">
          </div>
          <div class="mb-3">
            <label for="qnaContent" class="form-label">내용</label>
            <input type="text" class="form-control" id="qnaContent" v-model="localQnaCon">
          </div>
          <div class="d-flex justify-content-end">
            <button type="button" class="btn btn-primary me-2" @click="UpdateQNA">등록</button>
            <button type="button" class="btn btn-secondary" @click="$emit('closeModal', false)">취소</button>
          </div>
        </form>
      </div>
    </div>  
  </template>
  
  <script setup>
  import axios from "axios";
  import { ref } from "vue";
  
  const props = defineProps({
    qna_id: Number,
    qna_title: String,
    qna_con: String
  });
  
  const emit = defineEmits(['closeModal', 'QNA']);
  
  // 로컬 상태로 props 값을 복사합니다.
  const localQnaTitle = ref(props.qna_title);
  const localQnaCon = ref(props.qna_con);
  
  const UpdateQNA = () => {
    let param = new URLSearchParams();
    param.append('qna_id', props.qna_id);
    param.append('qna_title', localQnaTitle.value);
    param.append('qna_con', localQnaCon.value);
    
    axios.post('/qnaModify.do', param).then((res) => {
      alert(res.data.msg);
      if (res.data.result === true) {
        emit('closeModal', false);
        emit('QNA');
      }
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
    background: rgba(0, 0, 0, 0.5);
  }
  .container {
    background: white;
    padding: 1.5rem;
    max-width: 600px;
    width: 100%;
  }
  </style>
  