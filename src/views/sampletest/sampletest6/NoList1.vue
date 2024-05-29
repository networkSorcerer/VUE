<template>이거 왜 안나옴 
  <div id="">
      <p class="Location">
          <a href="/dashboard/home" class="btn_set home"></a>
          <span class="btn_nav bold">기준정보</span>
          <span class="btn_nav bold">공지사항 관리</span>
    </p>
    <p class="conTitle">
      <span>공지사항</span>
      <span>
        <table style="border: 1px #50bcdf" width="100%" cellpadding="5" cellspacing="0" border="1" align="left">
          <tr style="border: 0px; border-color: blue">
            <td width="50" height="25" style="font-size: 100%; text-align: left">
              <div id="searchArea" class="d-flex justify-content-around mb-2 mt-2">
                <span style="font-size: large">검색 조건을 입력하세요</span>
                  <input
                    type="text"
                    style="width: 200px"
                    class="form-control"
                  >
                  <input
                    type="date"
                    style="width: 15%"
                    class="form-control"
                    
                  />
                  ~
                  <input
                    type="date"
                    style="width: 15%"
                    class="form-control"
                   
                  />
                  <span class="fr">
                  <a class="btn btn-primary mx-2" @click="getNoticeList()">
                      <span>검 색</span>
                  </a>
                  <a class="btn btn-primary mx-2" @click="modalHandler()">
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
        <b> 총 원 : {{ totCnt }} 현재 페이지 번호 : {{ currentPage }}</b>
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
                  <th scope="col">번호</th>
                  <th scope="col">제목</th>
                  <th scope="col">작성일</th>
                  <th scope="col">작성자</th>
              </tr>
          </thead>
          <tbody>
            <template v-if="NoticeList.length <= 0">
              <tr>
                <td colspan="7">일치하는 검색 결과가 없습니다</td>
              </tr>
            </template>
            <template v-else>
              <tr v-for="(notice, i) in noticeList" :key="i">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </template>
          </tbody>
      </table>
      <Pagination/>
    </div>
    <NoModal /> 
  </div>
  
</template>

<script>
import axios from 'axios';
import Pagination from '@/components/common/PaginationComponent.vue';
import NoModal from './NoModal.vue';


export default {
  data() {
    return {
      noticeList : [],
      paramObj: { searchtitle: '', searchstdate: '', searcheddate: ''},
      totCnt: 0,
      currentPage: 0,
      modalState: false,
      modalProps: 0,
    };
  },
  components: { Pagination, NoModal},
  methods: {
    getNoticeList(cpage) {
      if(this.paramObj.searchstdate > this.paramObj.searcheddate) {
        alert('시작일이 더 크면 안돼요.');
        return;
      }
      cpage = cpage || 1;
      let param = new URLSearchParams(this.paramObj);
      param.append('cpage', cpage);
      param.append('pagesize', 10);

      axios.post('/notice/noticelistjson.do', param).then((res) => {
        this.noticeList = res.data.listdata;
        this.totCnt = res.data.listcnt;
        this.currentPage = cpage;
      });
    },
    modalHandler(noticeId) {
      this.modalState = true;
      this.modalProps = noticeId;
    },
  },
  mounted(){
    this.getNoticeList();
  }
}
</script>

<style>

</style>