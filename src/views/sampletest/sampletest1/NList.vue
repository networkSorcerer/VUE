<template>
  <h2>강사 관리</h2>
    <div class="search-bar">
      <select v-model="searchWord" id="searchWord" name="searchKey">
        <option value="all">전체</option>
        <option value="name">강사명</option>
        <option value="id">ID</option>
        <option value="tel">전화번호</option>
      </select> 
      <input
        type="text"
        style="width: 200px"
        class="form-control"
        v-model="paramObj.searchWord"
      />
    <div class="date-picker">
      <label for="from_date">가입일 조회</label>
      <input
        type="date"
        style="width: 15%"
        class="form-control"
        v-model="paramObj.from_date"
      />
     ~
      <input
        type="date"
        style="width: 15%"
        class="form-control"
        v-model="paramObj.to_date"
      />
     <span class="fr">
        <a class="btn btn-light" @click="getTutorList()">
            <span>검 색</span>
        </a>
      </span>
      </div>
    </div>
    <div class="divComGrpCodList">
      
      <div style="float: left">
        <b> 총 원 : {{totCnt }}현재 페이지 번호 : {{ currentPage }}</b>
      </div>
      <div class="user-type-buttons">
        <button type="button"  class="btn btn-light" @click="changeUserType('B')">승인</button>
        <button type="button"  class="btn btn-light" @click="changeUserType('E')">
            미승인
        </button>
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
            <template v-if="TutorList.length < 0">
              <tr>
                <td colspan="7">일치하는 검색 결과가 없습니다</td>
              </tr>
              </template>
              <template v-else>
              <tr v-for="(tutor, i) in TutorList" :key="i">  
                <td @click="modalHandler(tutor)">{{ tutor.name }} ({{ tutor.loginID }})</td>
                <td>{{ tutor.tel }}</td>
                <td>{{ tutor.join_date }}</td>
                <td v-if="tutor.user_type === 'B'">승인</td>
                <td v-else>승인 거부</td>
                <td><button @click="getDapv(tutor)" v-show="getTutorList" class="btn btn-light">탈퇴</button></td>
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
      user_type: 'B',
      loginID:'',

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
    getDapv(tutor) {
      // 필요한 데이터를 객체로 만듭니다.
      let params = {
        loginID: tutor.loginID,
        user_type: 'E'
      };

      // URLSearchParams 객체로 변환합니다.
      let param = new URLSearchParams(params);

      axios.post('/adm/apv_tut1.do', param).then((res) => {
        if (res.data.result === 'success') {
          alert(res.data.msg || '승인이 취소되었습니다.');
          // 리스트를 다시 불러와서 업데이트합니다.
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
  },
  mounted(){
    this.getTutorList();
  }
}
</script>

<style>

</style>