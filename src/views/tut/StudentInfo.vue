<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col">
        <div>
          <p class="mb-4"><strong>/ 학습 관리 / 시험 관리</strong></p>
          <h3>시험 문제 관리</h3>
          <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" id="inactiveQuestions" v-model="showInactive" @change="listPage">
            <label class="form-check-label" for="inactiveQuestions">비활성 문제</label>
          </div>
          <div class="mb-3">
            <select class="form-select" v-model="selectedLecture" @change="listPage" style="width: 200px;height: 50px">
              <option value="">시험분류 선택</option>
              <option v-for="lecture in lectureList" :key="lecture.lec_type_id" :value="lecture.lec_type_id">{{ lecture.lec_type_name }}</option>
            </select>
          </div>
          <div class="mb-3">
            <button class="btn btn-primary me-2" @click="newReg">문제등록</button>
          </div>
          <div>
            <table class="table table-striped">
              <caption>시험 문제 목록</caption>
              <colgroup>
                <col width="8%">
                <col width="8%">
                <col width="20%">
                <col width="5%">
                <col width="10%">
                <col width="10%">
                <col width="10%">
                <col width="10%">
                <col width="8%">
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">전체선택&nbsp;<input type="checkbox" v-model="selectAll" @change="toggleSelectAll"></th>
                  <th scope="col">시험분류</th>
                  <th scope="col">문제</th>
                  <th scope="col">정답</th>
                  <th scope="col">보기1</th>
                  <th scope="col">보기2</th>
                  <th scope="col">보기3</th>
                  <th scope="col">보기4</th>
                  <th scope="col"><div class="btn_areaC">
                    <button class="btn btn-secondary btn-sm" @click="deactivateSelected">비활성</button></div></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="test in testList" :key="test.que_id">
                  <td><input type="checkbox" v-model="test.selected"></td>
                  <td>{{ test.lec_type_name }}</td>
                  <td>{{ test.test_que }}</td>
                  <td>{{ test.que_ans }}</td>
                  <td>{{ test.que_ex1 }}</td>
                  <td>{{ test.que_ex2 }}</td>
                  <td>{{ test.que_ex3 }}</td>
                  <td>{{ test.que_ex4 }}</td>
                  <td><button class="btn btn-secondary btn-sm" @click="editTest(test)">수정</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Pagination v-bind="{ currentPage, totalItems: totalCount, itemsPerPage: pageSize }" @search="listPage"/>
      </div>
    </div>

    <!-- 모달팝업 -->
    <div v-if="showModal" class="modal fade show d-block" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalLabel">시험문제 등록</h5>
            <button type="button" class="close" @click="closeModal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveTest">
              <div class="form-group">
                <label for="lec_type_id">시험분류</label>
                <select class="form-control" id="lec_type_id" v-model="currentTest.lec_type_id">
                  <option v-for="lecture in lectureList" :key="lecture.lec_type_id" :value="lecture.lec_type_id">{{ lecture.lec_type_name }}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="test_que">문제</label>
                <textarea class="form-control" id="test_que" v-model="currentTest.test_que" rows="2"></textarea>
              </div>
              <div class="form-group">
                <label for="que_ans">정답</label>
                <input type="text" class="form-control" id="que_ans" v-model="currentTest.que_ans">
              </div>
              <div class="form-group">
                <label for="que_ex1">보기1</label>
                <textarea class="form-control" id="que_ex1" v-model="currentTest.que_ex1" rows="2"></textarea>
              </div>
              <div class="form-group">
                <label for="que_ex2">보기2</label>
                <textarea class="form-control" id="que_ex2" v-model="currentTest.que_ex2" rows="2"></textarea>
              </div>
              <div class="form-group">
                <label for="que_ex3">보기3</label>
                <textarea class="form-control" id="que_ex3" v-model="currentTest.que_ex3" rows="2"></textarea>
              </div>
              <div class="form-group">
                <label for="que_ex4">보기4</label>
                <textarea class="form-control" id="que_ex4" v-model="currentTest.que_ex4" rows="2"></textarea>
              </div>
              <div class="form-group">
                <label for="inactive">사용여부</label>
                <select class="form-control" id="inactive" v-model="currentTest.use_yn">
                  <option value="Y">활성화</option>
                  <option value="N">비활성화</option>
                </select>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary"  @click="closeModal">취소</button>
                <button type="submit" class="btn btn-primary">저장</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!--// 모달팝업 -->
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import Pagination from '@/components/common/PaginationComponent.vue';

const lectureList = ref([]);
const testList = ref([]);
const totalCount = ref(0);
const pageSize = ref(10);
const currentPage = ref(1);
const showInactive = ref(false);
const selectedLecture = ref("");
const selectAll = ref(false);
const showModal = ref(false);
const currentTest = ref({
  lec_type_id: '',
  test_que: '',
  que_ans: '',
  que_ex1: '',
  que_ex2: '',
  que_ex3: '',
  que_ex4: '',
  use_yn: 'Y'
});



const listPage = (page = 1) => {
  let param = new URLSearchParams();
  console.log('use_yn', showInactive.value)
  currentPage.value = page;
  const params = {
    lecList: selectedLecture.value,
    lec_type_id: selectedLecture.value,
    use_yn: showInactive.value ? 'N ':'Y',
    cpage: page,
    pagesize: pageSize.value,
  };
  param.append('cpage', page);
  axios.post('/tut/testListRtn.do', params, param).then((response) => {
    testList.value = response.data.listdata.map(item => ({
      ...item,
      selected: false
    }));
    totalCount.value = response.data.listcnt;
  });
};

const loadLectureList = () => {
  axios.post('/tut/testControlJson.do').then((response) => {
    lectureList.value = response.data.lecList;
  });
};

const newReg = () => {
  currentTest.value = {
    lec_type_id: '',
    test_que: '',
    que_ans: '',
    que_ex1: '',
    que_ex2: '',
    que_ex3: '',
    que_ex4: '',
    use_yn: 'Y'
  };
  showModal.value = true;
};

const editTest = (test) => {
  currentTest.value = { ...test };
  showModal.value = true;
};

const saveTest = () => {
  const action = currentTest.value.que_id ? 'U' : 'I';
  const params = {
    ...currentTest.value,
    action
  };
  axios.post('/tut/testSave.do', params).then((response) => {
    alert(response.data.resultMsg);
    if (response.data.result > 0) {
      showModal.value = false;
      listPage(currentPage.value);
    }
  });
};

const deactivateSelected = () => {
  const selectedIds = testList.value.filter(test => test.selected).map(test => test.que_id);
  if (selectedIds.length === 0) {
    alert('문제를 선택해주세요.');
    return;
  }
  const params = { que_id: selectedIds.join(',') };
  axios.post('/tut/testDeactivate.do', params).then((response) => {
    alert(response.data.deactResultMsg);
    if (response.data.result === 'SUCCESS') {
      listPage(currentPage.value);
    }
  });
};

const toggleSelectAll = () => {
  testList.value.forEach(test => test.selected = selectAll.value);
};

onMounted(() => {
  loadLectureList();
  listPage();
});
</script>

<style>
.container {
  padding: 20px;
}
.table th,
.table td {
  vertical-align: middle;
}
.modal.show {
  display: block;
  background: rgba(0, 0, 0, 0.5);
}
</style>
