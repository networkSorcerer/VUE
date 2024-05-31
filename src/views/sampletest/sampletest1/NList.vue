<template>
  <h2>강사 관리</h2>
    <div class="search-bar">
      <select v-model="searchKey" id="searchKey" name="searchKey">
        <option value="all">전체</option>
        <option value="name">강사명</option>
        <option value="id">ID</option>
        <option value="tel">전화번호</option>
      </select> 
      <input type="text" id="searchWord" v-model="searchWord" @input="formatPhoneNumber">
      <button @click="searchTutors">검색</button>
    </div>
    <div class="user-type-buttons">
      <button @click="filterTutors('B')">승인 강사</button>
      <button @click="filterTutors('E')">미승인 강사</button>
    </div>
    <div class="date-picker">
      <label for="from_date">가입일 조회</label>
        <input type="date" id="from_date" v-model="fromDate">
      ~
      <input type="date" id="to_date" v-model="toDate"> 
      <button @click="searchTutors">조회</button>
    </div>
    <div class="divComGrpCodList">
      <div style="float: left">
        <b> 총 원 : {{totCnt }}현재 페이지 번호 : {{ currentPage }}</b>
      </div>
      <table class="col">
          <caption></caption>
          <colgroup>
              <col width="20%" />
              <col width="20%" />
              <col width="20%" />
              <col width="20%" />
          </colgroup>

          <thead>
              <tr>
                  <th scope="col">강사명(ID)</th>
                  <th scope="col">휴대전화</th>
                  <th scope="col">가입일자</th>
                  <th scope="col">승인여부</th>
                  <th scope="col"></th>
              </tr>
          </thead>
          <tbody>
            <template v-if="TutorList.length <= 0">
              <tr>
                <td colspan="7">일치하는 검색 결과가 없습니다</td>
              </tr>
              </template>
              <template v-else>
              <tr v-for="(tutor, i) in TutorList" :key="i">
                <td @click="modalHandler(tutor)">{{ tutor.name }} ({{ tutor.loginID }})</td>
                <td>{{ tutor.tel }}</td>
                <td>{{ tutor.join_date }}</td>
                <td v-if="tutor.use_yn === 'y'">승인</td>
                <td v-else>승인 거부</td>
                <td><button @click="removeTutor(tutor.loginID)">탈퇴</button></td>
              </tr>
              </template>

          </tbody>
      </table>
        <Pagination
          v-if="totCnt > 0"
          :currentPage="currentPage"
          :totalItems="totCnt"
          @search="getTutorList($event)"/>
    </div>
    <NModal 
      v-if="modalState"
     @closeModal="modalState = $event"
     :detailProps="modalProps"
     :functionProps="getTutorList"
     :emitProps="currentPage"
     
      /> 
  
  
</template>

<script>
import axios from 'axios';
import Pagination from '@/components/common/PaginationComponent.vue';
import NModal from './NModal.vue';


export default {
  data() {
    return {
      TutorList : [],
      paramObj: { searchWord: '', from_date: '', to_date: ''},
      totCnt: 0,
      currentPage: 0,
      modalState: false,
      modalProps: {},
    };
  },
  components: { Pagination, NModal},
  methods: {
    getTutorList(cpage) {
      if(this.paramObj.from_date > this.paramObj.to_date) {
        alert('시작일이 더 크면 안돼요.');
        return;
      }
      cpage = cpage || 1;
      let param = new URLSearchParams(this.paramObj);
      param.append('currentPage', cpage);
      param.append('pageSize', 10);
      param.append('searchKey', '');
      param.append('user_type','');

      axios.post('/adm/list_tut_json.do', param).then((res) => {
        this.TutorList = res.data.list_tut;
        this.totCnt = res.data.totalCnt;
        this.currentPage = cpage;
      });
    },

    modalHandler(data) {
      this.modalState = true;
      this.modalProps = data;
    },
  },
  mounted(){
    this.getTutorList();
  }
}
</script>

<style>

</style>