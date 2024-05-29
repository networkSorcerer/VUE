<template>
  <div id="">
      <p class="Location">
          <a href="/dashboard/home" class="btn_set home"></a>
          <span class="btn_nav bold">기준정보</span>
          <span class="btn_nav bold">공지사항 관리</span>
    </p>
    <p class="conTitle">
      <span>강사 리스트</span>
      <span>
        <table style="border: 1px #50bcdf" width="100%" cellpadding="5" cellspacing="0" border="1" align="left">
          <tr style="border: 0px; border-color: blue">
            <td width="50" height="25" style="font-size: 100%; text-align: left">
              <div id="searchArea" class="d-flex justify-content-around mb-2 mt-2">
                <span style="font-size: large">검색어를 입력하세요</span>
                  <input
                    type="text"
                    style="width: 200px"
                    class="form-control"
                    v-model="paramObj.searchtitle"
                  >
                  <span class="fr">
                  <a class="btn btn-primary mx-2">
                      <span>검 색</span>
                  </a>
                  <a class="btn btn-primary mx-2" >
                      <span>신규등록</span>
                  </a>
                </span>
              </div>
            </td>
          </tr>
        </table>
      </span>
    </p>

    <div class="divComGrpCodList">
      <div style="float: left">
        <b> 총 원 : {{totCnt }}현재 페이지 번호 : {{ currentPage }}</b>
      </div>
      <table class="col">
          <caption></caption>
          <colgroup>
              <col width="10%" />
              <col width="50%" />
              <col width="30%" />
              <col width="10%" />
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
              <tr v-for="(tutor, i) in TutorList" :key="i" >
                <td @click="modalHandler(tutor.loginID)">{{ tutor.name }}  ({{ tutor.loginID }})</td>
                <td>{{ tutor.tel}}</td>
                <td>{{ tutor.join_date }}</td>
                <td></td>
                <td></td>
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
  </div>
  
</template>

<script>
import axios from 'axios';
import Pagination from '@/components/common/PaginationComponent.vue';
import NModal from './NModal.vue';


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
  components: { Pagination, NModal},
  methods: {
    getTutorList(cpage) {
      if(this.paramObj.searchstdate > this.paramObj.searcheddate) {
        alert('시작일이 더 크면 안돼요.');
        return;
      }
      cpage = cpage || 1;
      let param = new URLSearchParams(this.paramObj);
      param.append('currentPage', cpage);
      param.append('pageSize', 10);

      axios.post('/adm/list_tut_json.do', param).then((res) => {
        this.TutorList = res.data.list_tut;
        this.totCnt = res.data.totalCnt;
        this.currentPage = cpage;
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
</script>

<style>

</style>