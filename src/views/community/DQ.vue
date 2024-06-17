<template>
  <div class="backdrop">
    <div class="container p-4 rounded bg-light shadow">
      <div class="mb-3 d-flex justify-content-end">
        <button class="btn btn-primary me-2" @click="modalHandler(props.qna_id, props.qna_title, props.qna_con)">수정</button>
        <button class="btn btn-danger" @click="DeleteQNA(props.qna_id)">삭제</button>
      </div>
      <div class="mb-3">
        <table class="table table-bordered">
          <tbody>
            <tr>
              <th>제목</th>
              <td>{{ props.qna_title }}</td>
            </tr>
            <tr>
              <th>내용</th>
              <td>{{ props.qna_con }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mb-3">
        <p>댓글</p>
        <div class="input-group">
          <input type="text" class="form-control" v-model="newComment" placeholder="댓글을 입력하세요">
          <button class="btn btn-success" @click="isEditMode ? modComment(editingCommentId) : NewComment()">등록</button>
        </div>
      </div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>작성자</th>
            <th>댓글</th>
            <th>등록일</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, i) in qna" :key="data.rv_id">
            <td>{{ i + 1 }}</td>
            <td>{{ data.loginID }}</td>
            <td>{{ data.rv_con }}</td>
            <td>{{ data.regdate }}</td>
            <td>
              <button class="btn btn-link p-0 me-2" @click="startEditComment(data.rv_id, data.rv_con)">수정</button>
              <button class="btn btn-link p-0 text-danger" @click="delComment(data.rv_id)">삭제</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="d-flex justify-content-end">
        <button type="button" class="btn btn-secondary" @click="$emit('closeModal', false)">닫기</button>
      </div>
    </div>
    <DDQ 
      v-if="modalBoolean"
      :qna_id="qna_id"
      :qna_title="qna_title"
      :qna_con="qna_con"
      @closeModal="modalBoolean=$event"
      @QNA="QNA"
    />
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import DDQ from './DDQ.vue';

const props = defineProps({
  qna_id: Number,
  qna_title: String,
  qna_con: String,
});

console.log(props);
const emit = defineEmits(['closeModal', 'QNA']);
const qna = ref([]);
const newComment = ref('');
const isEditMode = ref(false); // 댓글 수정 모드인지 여부
const editingCommentId = ref(null); // 수정 중인 댓글의 ID
const modalBoolean = ref(false);
const qna_id = ref(0);
const qna_title = ref('');
const qna_con = ref('');

const qnaView = () => {
  let param = new URLSearchParams();
  param.append('qna_id', props.qna_id);
  axios.post('/qnaViewJson.do', param).then((res) => {
    qna.value = res.data.commentData;
  });
};

const DeleteQNA = () => {
  let param = new URLSearchParams();
  param.append('qna_id', props.qna_id);
  axios.post('/qnaDelete.do', param).then((res) => {
    alert(res.data.msg);
    if (res.data.result === true) {
      emit('closeModal', false);
      emit('QNA');
    }
  });
};

const NewComment = () => {
  if (!newComment.value.trim()) {
    alert('댓글을 입력하세요.');
    return;
  }

  let param = new URLSearchParams();
  param.append('qna_id', props.qna_id);
  param.append('rv_con', newComment.value);
  axios.post('/commentSave.do', param).then((res) => {
    alert(res.data.msg);
    if (res.data.result !== 'F') {
      qnaView();
      newComment.value = '';
    }
  });
};

const modComment = (rv_id) => {
  let param = new URLSearchParams();
  param.append('rv_id', rv_id);
  param.append('rv_con', newComment.value);
  axios.post('/commentModify.do', param).then((res) => {
    qnaView();
    isEditMode.value = false; // 수정 모드 종료
    newComment.value = ''; // 입력 필드 초기화
  });
};

const delComment = (rv_id) => {
  let param = new URLSearchParams();
  param.append('rv_id', rv_id);
  axios.post('/commentDelete.do', param).then((res) => {
    if (res.data.result === true) {
      qnaView();
    } else {
      alert('댓글 삭제에 실패했습니다.');
      qnaView();
    }
  });
};

const startEditComment = (rv_id, rv_con) => {
  editingCommentId.value = rv_id;
  newComment.value = rv_con;
  isEditMode.value = true;
};

const modalHandler = (paramId, paramTitle, paramCon) => {
  modalBoolean.value = true;
  qna_id.value = paramId;
  qna_title.value = paramTitle;
  qna_con.value = paramCon;
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
  background: rgba(0, 0, 0, 0.5);
  overflow-y: auto;
}
.container {
  background: white;
  padding: 1.5rem;
  max-width: 600px;
  width: 100%;
}
</style>
