<template>
    <div class="backdrop">
    <div class="container mt-4">
      <div class="row">
        <div class="col">
          <div class="card">
            <div class="card-header">
              <p class="mb-0"><strong>시험문제 등록</strong></p>
            </div>
            <div class="card-body">
              <form>
                <div class="mb-3 row">
                  <label class="col-sm-2 col-form-label">시험분류</label>
                  <div class="col-sm-10">
                    <p>{{ dataList.lec_type_name }}</p>
                    <select class="form-control" v-model="examCategory" style="height: 50px">
                      <option v-for="data in type" :key="data.lec_type_id" :value="data.lec_type_id" >{{data.lec_type_name }}</option>
                    </select>
                    
                  </div>
                </div>
                <div class="mb-3 row">
                  <label class="col-sm-2 col-form-label">문제</label>
                  <div class="col-sm-10">
                    <textarea class="form-control" rows="3" v-model="dataList.test_que">
                  </div>
                </div>
                <div class="mb-3 row">
                  <label class="col-sm-2 col-form-label">정답</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" v-model="dataList.que_ans">
                  </div>
                </div>
                <div class="mb-3 row">
                  <label class="col-sm-2 col-form-label">보기1</label>
                  <div class="col-sm-10">
                    <textarea class="form-control" rows="2" v-model="dataList.que_ex1"></textarea>
                  </div>
                </div>
                <div class="mb-3 row">
                  <label class="col-sm-2 col-form-label">보기2</label>
                  <div class="col-sm-10">
                    <textarea class="form-control" rows="2" v-model="dataList.que_ex2"></textarea>
                  </div>
                </div>
                <div class="mb-3 row">
                  <label class="col-sm-2 col-form-label">보기3</label>
                  <div class="col-sm-10">
                    <textarea class="form-control" rows="2" v-model="dataList.que_ex3"></textarea>
                  </div>
                </div>
                <div class="mb-3 row">
                  <label class="col-sm-2 col-form-label">보기4</label>
                  <div class="col-sm-10">
                    <textarea class="form-control" rows="2" v-model="dataList.que_ex4"></textarea>
                  </div>
                </div>
                <div class="mb-3 row">
                  <label class="col-sm-2 col-form-label">사용 여부</label>
                  <div class="col-sm-10">
                    <select class="form-select" v-model="isActive" style="height: 50px">
                      <option value="Y">활성화</option>
                      <option value="N">비활성화</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
            <div class="card-footer text-end">
              <button class="btn btn-primary me-2" @click="saveQuestion">저장</button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="$emit('closeModal', false)">취소</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</div> 
</template>

<script setup>
import axios from 'axios';

import { onMounted, reactive, ref, watch  } from 'vue';

const props =defineProps({
    que_id: Number
  });
  

  const type = ref([]);
  const examCategory = ref(0);
  const isActive = ref('Y');

  const dataList = reactive({  
    que_id: props.que_id,
    lec_type_id:0,
    que_ans: '',
    lec_type_name: '',
     test_que: '',
     que_ex1: '',
     que_ex2: '',
     que_ex3: '',
     que_ex4: ''});

 
  const TypeList = () => {
  let param = new URLSearchParams();
  axios.post('/tut/testControlJson.do', param).then((res)=>{
    type.value = res.data.lecList;
   
  });
};

  const DT = () => {
    let param = new URLSearchParams();
    param.append('que_id',props.que_id);
    axios.post('/tut/testModifyList.do', param).then((res) =>{
      dataList.lec_type_id = res.data.selinfo.lec_type_id;
      dataList.lec_type_name = res.data.selinfo.lec_type_name;
      dataList.test_que = res.data.selinfo.test_que;
      dataList.que_ans = res.data.selinfo.que_ans;
      dataList.que_ex1 = res.data.selinfo.que_ex1;
      dataList.que_ex2 = res.data.selinfo.que_ex2;
      dataList.que_ex3 = res.data.selinfo.que_ex3;
      dataList.que_ex4 = res.data.selinfo.que_ex4;
    });
  }

  const saveQuestion = (dataList) => {
    let param = new URLSearchParams();
    param.append('que_id', props.que_id);
    axios.post('/tut/testSave.do', param).then((res)=>{
      if(res.data.reuslt < 0) {
        alert(res.data.resultMsg);
      } else {
        alert(res.data.resultMsg);
      }
    })
  };
  
  watch(examCategory, ()=>{
    saveQuestion();
  })

  onMounted(()=>{
    TypeList();
    DT();
  })
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
.modal-dialog {
  width: 100%;
  max-width: 600px;
  margin: auto;
}
</style>