<template>
    <div class="backdrop">
      <div class="container p-4 bg-light rounded shadow"> 
        <div class="mb-4">
          <h4>Q&A 등록</h4>
        </div>
        <div> 
          <form>
            <div class="mb-3">
              <label for="qnaTitle" class="form-label">제목</label>
              <input type="text" class="form-control" id="qnaTitle" v-model="insertObject.qna_title">
            </div>
            <div class="mb-3">
              <label for="qnaContent" class="form-label">내용</label>
              <textarea class="form-control" id="qnaContent" rows="4" v-model="insertObject.qna_con"></textarea>
            </div>
            <div class="d-flex justify-content-end">
              <button type="button" class="btn btn-primary me-2" @click="WriteQNA">등록</button>
              <button type="button" class="btn btn-secondary" @click="$emit('closeModal', false)">닫기</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import axios from 'axios';
  import { ref } from 'vue';
  
  const props = defineProps({
    qna_id: Number
  });
  
  const emit = defineEmits(['closeModal', 'QNA']);
  const insertObject = ref({ qna_title: '', qna_con: '' });
  
  const WriteQNA = () => {
    let param = new URLSearchParams();
    param.append('qna_id', props.qna_id);
    param.append('qna_title', insertObject.value.qna_title);
    param.append('qna_con', insertObject.value.qna_con);
    
    axios.post('/qnaSave.do', param).then((res) => {
      alert(res.data.msg);
      if (res.data.result === 'S') {
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
  