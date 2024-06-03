<template>
  <div id="app">
  <h2>강의 목록</h2>
  <input type="text" v-model="searchWord_lec" @keyup.enter="fLecList" placeholder="검색어 입력">
  <button @click="fLecList">검색</button>
  <ul>
    <li v-for="lec in lecList" :key="lec.lec_id">
      <span>{{ lec.lec_id }}</span>
      <span>{{ lec.lec_name }}</span>
      <span>{{ lec.start_date }} ~ {{ lec.end_date }}</span>
    </li>
  </ul>
  <button @click="fPopModal_std_lec_reg">수강 등록</button>
  <!-- 모달 강의 등록 -->
  <div v-if="showModal" class="modal">
    <div class="modal-content">
      <span class="close" @click="showModal = false">&times;</span>
      <h3>수강 등록</h3>
      <select v-model="selectedLec" style="width:350px">
        <option v-for="lec in list_lec" :value="lec.lec_id">{{ lec.lec_name }} ({{ lec.start_date }} ~ {{ lec.end_date }})</option>
      </select>
      <button @click="std_lec_reg">수강 등록</button>
    </div>
  </div>
  <h2>학생 목록</h2>
  <!-- 학생 목록 표시 -->
  <ul>
    <li v-for="std in stdList" :key="std.std_id">
      <span>{{ std.std_id }}</span>
      <span>{{ std.std_name }} ({{ std.std_num }})</span>
      <span>{{ std.tel }}</span>
      <span>{{ std.join_date }}</span>
      <button @click="fstd_info(std.std_id)">상세 보기</button>
      <button @click="ban_user(std.std_id)">탈퇴</button>
    </li>
  </ul>
  <!-- 학생 상세 정보 모달 -->
  <div v-if="showStdModal" class="modal">
    <div class="modal-content">
      <span class="close" @click="showStdModal = false">&times;</span>
      <h3>학생 상세 정보</h3>
      <!-- 학생 상세 정보 표시 -->
      <p>ID: {{ stdInfo.std_id }}</p>
      <p>학번: {{ stdInfo.std_num }}</p>
      <p>이름: {{ stdInfo.std_name }}</p>
      <p>생년월일: {{ stdInfo.std_birth }}</p>
      <p>전화번호: {{ stdInfo.std_tel }}</p>
      <p>가입일자: {{ stdInfo.join_date }}</p>
      <!-- 학생의 수강 목록 표시 -->
      <ul>
        <li v-for="lec in stdLecList" :key="lec.lec_id">
          <span>{{ lec.lec_id }}</span>
          <span>{{ lec.lec_name }}</span>
          <span>{{ lec.start_date }} ~ {{ lec.end_date }}</span>
          <button @click="std_lec_del(lec.lec_id)">수강 취소</button>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
export default {

}
</script>
const app = Vue.createApp({
    data() {
      return {
        searchWord_lec: '',
        lecList: [],
        stdList: [],
        list_lec: [], // 수강 등록용 강의 목록
        selectedLec: '', // 선택된 강의
        showModal: false,
        showStdModal: false,
        stdInfo: {}, // 선택된 학생 정보
        stdLecList: [], // 선택된 학생의 수강 목록
      };
    },
    mounted() {
      this.fLecList();
      this.flist_std();
    },
    methods: {
      fLecList() {
        axios.post('/adm/plist_lec.do', { searchWord_lec: this.searchWord_lec })
          .then(response => {
            this.lecList = response.data;
          })
          .catch(error => {
            console.error('Error fetching lecture list:', error);
          });
      },
      flist_std() {
        axios.post('/adm/list_std.do', {
          searchWord_std: this.searchWord_std,
          searchKey_std: this.searchKey_std,
          from_date: this.from_date,
          to_date: this.to_date,
        })
        .then(response => {
          this.stdList = response.data;
        })
        .catch(error => {
          console.error('Error fetching student list:', error);
        });
      },
      fstd_info(loginID) {
        axios.post('/adm/user_info.do', { loginID })
          .then(response => {
            this.stdInfo = response.data.user_model;
            this.stdLecList = response.data.lecture_list;
            this.showStdModal = true;
          })
          .catch(error => {
            console.error('Error fetching student info:', error);
          });
      },
      ban_user(loginID) {
        if (confirm('정말 탈퇴시키시겠습니까?')) {
          axios.post('/adm/ban_user.do', { loginID })
            .then(response => {
              alert(response.data.resultMsg);
              this.flist_std();
            })
            .catch(error => {
              console.error('Error banning user:', error);
            });
        }
      },
      fPopModal_std_lec_reg() {
        axios.post('/adm/lecture_list.do')
          .then(response => {
            this.list_lec = response.data;
            this.showModal = true;
          })
          .catch(error => {
            console.error('Error fetching lecture list for registration:', error);
          });
      },
      std_lec_reg() {
        axios.post('/adm/std_lec_reg.do', { lec_id: this.selectedLec })
          .then(response => {
            std_lec_reg_result(response.data);
          })
          .catch(error => {
            console.error('수강 등록 중 오류 발생:', error);
          });
      }
<style>

</style>