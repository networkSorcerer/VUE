<template>
    <div class="container mt-5"> 
      <div class="row mb-4">
        <div class="col">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="#">커뮤니티</a></li>
              <li class="breadcrumb-item active" aria-current="page">Q&A</li>
            </ol>
          </nav>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col">
          <h3>Q&A 게시판</h3>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-md-8">
          <input type="text" class="form-control" placeholder="제목을 입력하세요">
        </div>
        <div class="col-md-2">
          <button class="btn btn-primary w-100">검색</button>
        </div>
        <div class="col-md-2">
          <button class="btn btn-success w-100" @click="modalHandler2(qna_id)">글쓰기</button>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>등록일</th>
                <th>조회수</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="data in dataList" :key="data.qna_id">
                <td>{{ data.qna_id }}</td>
                <td @click="modalHandler(data.qna_id, data.qna_title, data.qna_con)">{{ data.qna_title }}</td>
                <td>{{ data.loginID }}</td>
                <td>{{ data.regdate }}</td>
                <td>{{ data.hit }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <Pagination v-bind="{currentPage, totalItems : Total, itemsPerPage : 5}" @search="QNA($event)" v-if="dataList.length > 0"/>
        </div>
      </div>
      <DQ
        v-if="modalBoolean" @closeModal="modalClose($event, false)" 
        :qna_id="qna_id"
        :qna_title="qna_title"
        :qna_con="qna_con"
      />
      <WriteQ
        v-if="modalBoolean2"
        @closeModal="modalClose(false, $event)"
        :qna_id="qna_id"
      />
    </div>
  </template>
  
  <script setup>
  import axios from "axios";
  import { ref, onMounted } from "vue";
  import Pagination from '@/components/common/PaginationComponent.vue';
  import DQ from './DQ.vue';
  import WriteQ from "./WriteQ.vue";
  
  const dataList = ref([]);
  const currentPage = ref(0);
  const Total = ref(0);
  const modalBoolean = ref(false);
  const modalBoolean2 = ref(false);
  const qna_id = ref(0);
  const qna_title = ref('');
  const qna_con = ref('');
  
  const QNA = (cpage) => {
    cpage = cpage || 1;
    let param = new URLSearchParams();
    param.append('cpage', cpage);
    param.append('pagesize', 5);
    param.append('searchtitle', '');
    axios.post('/qnaListjson.do', param).then((res) => {
      dataList.value = res.data.listData;
      currentPage.value = cpage;
      Total.value = res.data.listcnt;
    });
  };
  
  const modalClose = (param, param2) => {
    modalBoolean.value = param;
    modalBoolean2.value = param2;
    QNA();
  };
  
  const modalHandler = (paramId, paramTitle, paramCon) => {
    console.log(paramCon);
    modalBoolean.value = true;
    qna_id.value = paramId;
    qna_title.value = paramTitle;
    qna_con.value = paramCon;
  };
  
  const modalHandler2 = (paramId1) => {
    modalBoolean2.value = true;
    qna_id.value = paramId1;
  };
  
  onMounted(() => {
    QNA();
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
  }
  </style>
  