<template>
  <div>
    <h2>강사 관리</h2>
    <div class="search-bar">
      <!-- <select v-model="searchKey" id="searchKey" name="searchKey">
        <option value="all">전체</option>
        <option value="name">강사명</option>
        <option value="id">ID</option>
        <option value="tel">전화번호</option>
      </select> -->
      <input type="text" id="searchWord" v-model="searchWord" @input="formatPhoneNumber">
      <button @click="searchTutors">검색</button>
      <div class="date-picker">
        <label for="from_date">가입일 조회</label>
        <!-- <input type="date" id="from_date" v-model="fromDate">
        ~
        <input type="date" id="to_date" v-model="toDate"> -->
        <button @click="searchTutors">조회</button>
      </div>
      <div class="user-type-buttons">
        <button @click="filterTutors('B')">승인 강사</button>
        <button @click="filterTutors('E')">미승인 강사</button>
      </div>
    </div>
    <table >
      <thead>
        <tr>
          <th>강사명 (ID)</th>
          <th>휴대전화</th>
          <th>가입일자</th>
          <th>승인여부</th>
          <th></th>
        </tr>
      </thead>
      <!-- <template v-if="TutorList.length <= 0">
              <tr>
                <td colspan="7">일치하는 검색 결과가 없습니다</td>
              </tr>
            </template>
      <tbody>
        <tr v-for="(tutor, i) in TutorList" :key="i">
          <td>{{ tutor.name }} ({{ tutor.loginID }})</td>
          <td>{{ tutor.tel }}</td>
          <td>{{ tutor.registerDate }}</td>
          <td>{{ tutor.approvalStatus }}</td>
          <td>
            <button @click="showTutorInfo(tutor.loginID)">정보 보기</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination" v-if="totalPages > 1">
      <Pagination></Pagination>
      </div>
    <Modal v-model="showTutorModal" :tutor="selectedTutor">
      </Modal>
  </div> -->
  </table>
  </div>
</template>
<!-- <script>
import axios from 'axios';
import Pagination from '@/components/common/PaginationComponent.vue';
import Modal from './Modal.vue';


export default {
  data() {
    return {
      TutorList : [],
      paramObj: { searchtitle: '', searchstdate: '', searcheddate: ''},
      totCnt: 0,
      currentPage: 0,
      modalState: false,
      modalProps: 0,
    };
  },
  components: { Pagination, Modal},
  methods: {
    getTutorList() {
      if(this.paramObj.searchstdate > this.paramObj.searcheddate) {
        alert('시작일이 더 크면 안돼요.');
        return;
      }
    
      let param = new URLSearchParams(this.paramObj);
      axios.post('/adm/list_tut_json.do', param).then((res) => {
        this.TutorList = res.data.list_tut;
  
      });
    },
    modalHandler(loginID) {
      this.modalState = true;
      this.modalProps = loginID;
    },
  },
  mounted(){
    this.getTutorList();
  }
}
</script> -->
