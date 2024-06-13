<template>
  <div class="backdrop">
      <div class="container"> 
          <div> 
              <div> 
                  <div> 
                      <span @click="ModQ()">수정</span>
                      <span @click="delQ()">삭제</span>
                  </div>
                  <div> 
                      <table>
                          <tr>
                              <td>제목</td>
                              <td>{{ qna_title }}</td>
                          </tr>
                          <tr>
                              <td>내용</td>
                              <td>{{ qna_con }}</td>
                          </tr>
                      </table>
                  </div>
                  <div> 
                      <p>댓글</p>
                      <input type="text" v-model="newComment" placeholder="댓글을 입력하세요">
                  </div>
                  <div>
                      <button @click="NewComment()">등록</button>
                  </div>
              </div>
              <table v-for="(data, i) in qna" :key="data.qna_id">
                  <tr >
                      <td rowspan="2">{{ i }}</td>
                      <td>{{ data.loginID }}</td>
                      <td>
                          <span @click="modComment(data.rv_id)">수정</span>
                          <span @click="delComment(data.rv_id)">삭제</span>
                      </td>
                  </tr>
                  <tr>
                      <td></td>
                      <td>{{ data.rv_con }}</td>
                      <td>{{ data.regdate }}</td>
                  </tr>
              </table>
          </div>
          <button type="button" class="btn btn-light" @click="$emit('closeModal', false)">닫기</button>
      </div>
  </div>  
  </template>
  
  <script setup>
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  
  const props = defineProps({
      qna_id: Number,
      qna_title: String,
      qna_con: String,
  });
  
  const qna = ref([]);
  const newComment = ref(''); // 새로운 댓글 입력값
  
  const qnaView = () => {
      let param = new URLSearchParams();
      param.append('qna_id', props.qna_id);
      axios.post('/qnaViewJson.do', param).then((res) => {
          qna.value = res.data.commentData;
      });
  };
  
  const NewComment = () => {
      if (!newComment.value.trim()) {
          alert('댓글을 입력하세요.');
          return;
      }
  
      let param = new URLSearchParams();
      param.append('qna_id', props.qna_id);
      param.append('comment', newComment.value); // 새로운 댓글 추가
      axios.post('/commentSave.do', param).then((res) => {
          if (res.data.result === 'F') {
              alert(res.data.msg);
          } else {
              alert(res.data.msg);
              qnaView(); // 댓글 등록 후 목록 갱신
              newComment.value = ''; // 입력 필드 초기화
          }
      });
  };
  
  const modComment = (rv_id) => {
      let param = new URLSearchParams();
      param.append('rv_id', rv_id); // 수정할 댓글의 ID 추가
      axios.post('/commentModify.do', param).then((res) => {
          qnaView(); // 수정 후 목록 갱신
      });
  };
  
  const delComment = (rv_id) => {
      let param = new URLSearchParams();
      param.append('rv_id', rv_id); // 삭제할 댓글의 ID 추가
      axios.post('/commentDelete.do', param).then((res) => {
          if (res.data.result === 'SUCCESS') {
              qnaView(); // 삭제 후 목록 갱신
          } else {
              alert('댓글 삭제에 실패했습니다.');
          }
      });
  };
  
  const Old = (rv_id) => {
      let param = new URLSearchParams();
      param.append('rv_id', rv_id);
      axios.post('/commentOldView.do', param).then((res) => {
          qna.value = res.data.commentData;
      });
  };
  
  const ModQ = () => {
      // 질문 수정 로직
  };
  
  const delQ = () => {
      // 질문 삭제 로직
  };
  
  onMounted(() => {
      qnaView();
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
  