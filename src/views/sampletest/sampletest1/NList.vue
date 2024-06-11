<template>
  <div class="container mt-5">
    <h2>강사 관리</h2>
    <div class="search-bar d-flex mb-3">
      <select v-model="paramObj.searchKey" id="searchKey" name="searchKey" class="form-select me-2">
        <option value="all">전체</option>
        <option value="name">강사명</option>
        <option value="id">ID</option>
        <option value="tel">전화번호</option>
      </select>
      <input
        type="text"
        class="form-control d-inline-block w-auto ml-2"
        v-model="paramObj.searchWord"
        placeholder="검색어를 입력하세요"
      />
      <div class="date-picker d-flex align-items-center me-2">
        <label for="from_date" class="me-2">가입일 조회</label>
        <input type="date" class="form-control me-2" v-model="paramObj.from_date" />
        <span>~</span>
        <input type="date" class="form-control ms-2" v-model="paramObj.to_date" />
      </div>
      <button class="btn btn-primary" @click="searchData">검색</button>
    </div>

    <div class="d-flex justify-content-between align-items-center mb-3">
      <div>
        <b> 총 원 : {{ totCnt }} 현재 페이지 번호 : {{ currentPage }}</b>
      </div>
      <div class="user-type-buttons btn-group">
        <button type="button" class="btn btn-outline-primary" @click="changeUserType('B')">승인 강사</button>
        <button type="button" class="btn btn-outline-secondary" @click="changeUserType('E')">미승인 강사</button>
      </div>
    </div>

    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">강사명(ID)</th>
          <th scope="col">휴대전화</th>
          <th scope="col">가입일자</th>
          <th scope="col">승인여부</th>
          <th scope="col">작업</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="TutorList.length === 0">
          <tr>
            <td colspan="5" class="text-center">일치하는 검색 결과가 없습니다</td>
          </tr>
        </template>
        <template v-else>
          <tr v-for="(tutor, i) in TutorList" :key="i">
            <td @click="modalHandler(tutor)" class="cursor-pointer">{{ tutor.name }} ({{ tutor.loginID }})</td>
            <td>{{ tutor.tel }}</td>
            <td>{{ tutor.join_date }}</td>
            <td>
              <span class="badge" :class="{'bg-success': tutor.user_type === 'B', 'bg-danger': tutor.user_type !== 'B'}">
                {{ tutor.user_type === 'B' ? '승인' : '승인 거부' }}
              </span>
            </td>
            <td>
              <button @click="getApv(tutor)" class="btn btn-success btn-sm">승인</button>
              <button @click="getDapv(tutor)" class="btn btn-danger btn-sm">탈퇴</button>
            </td>
          </tr>
        </template>
      </tbody>
    </table>

    <Pagination
      v-if="totCnt > 0"
      :currentPage="currentPage"
      :totalItems="totCnt"
      @search="getTutorList"
    />

    <NModal
      v-if="modalState"
      @closeModal="modalState = $event"
      :detailProps="modalProps"
      :functionProps="getTutorList"
      :emitProps="currentPage"
    />
  </div>
</template>

<script>
import axios from 'axios';
import Pagination from '@/components/common/PaginationComponent.vue';
import NModal from './NModal.vue';

export default {
  data() {
    return {
      TutorList: [],
      paramObj: { searchKey: '', searchWord: '', from_date: '', to_date: '' },
      totCnt: 0,
      currentPage: 0,
      modalState: false,
      modalProps: {},
    };
  },
  components: { Pagination, NModal },
  mounted() {
    this.getTutorList();
  },
  methods: {
    getTutorList(cpage) {
      if (this.paramObj.from_date > this.paramObj.to_date) {
        alert('시작일이 더 크면 안돼요.');
        return;
      }
      cpage = cpage || 1;
      let param = new URLSearchParams(this.paramObj);
      param.append('currentPage', cpage);
      param.append('pageSize', 10);
      param.append('user_type','');
      axios.post('/adm/list_tut_json.do', param).then((res) => {
        this.TutorList = res.data.list_tut;
        this.totCnt = res.data.totalCnt;
        this.currentPage = cpage;
      });
    },
    getDapv(tutor) {
      let params = {
        loginID: tutor.loginID,
        user_type: 'E'
      };

      let param = new URLSearchParams(params);

      axios.post('/adm/apv_tut1.do', param).then((res) => {
        if (res.data.result === 'SUCCESS') {
          alert(res.data.msg || '승인이 취소되었습니다.');
          this.getTutorList(this.currentPage);
        } else {
          alert(res.data.msg || '작업에 실패했습니다.');
          this.getTutorList(this.currentPage);
        }
      });
    },
    getApv(tutor) {
      let params = {
        loginID: tutor.loginID,
        user_type: 'B'
      };

      let param = new URLSearchParams(params);

      axios.post('/adm/apv_tut.do', param).then((res) => {
        if (res.data.result === 'SUCCESS') {
          alert(res.data.msg || '승인되었습니다.');
          this.getTutorList(this.currentPage);
        } else {
          alert(res.data.msg || '작업에 실패했습니다.');
        }
      });
    },
    modalHandler(data) {
      this.modalState = true;
      this.modalProps = data;
    },
    changeUserType(user_type) {
      this.paramObj.searchKey = '';
      this.paramObj.searchWord = '';
      this.paramObj.user_type = user_type;
      this.getTutorList(1);
    },
    searchData() {
      this.getTutorList(1);
    },
  }
}
</script>

<style>
/* 스타일은 필요에 따라 추가하세요 */
</style>
