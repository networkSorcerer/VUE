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
                    <select class="form-control" v-model="examCategory">
                      <option v-for="data in type" :key="data.lec_type_id" :value="lec_type_id">{{ data.lec_type_name }}</option>
                    </select>
                  </div>
                </div>
                <div class="mb-3 row">
                  <label class="col-sm-2 col-form-label">문제</label>
                  <div class="col-sm-10">
                    <textarea class="form-control" rows="3" v-model="props.paramObject.value.test_que"></textarea>
                  </div>
                </div>
                <div class="mb-3 row">
                  <label class="col-sm-2 col-form-label">정답</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" v-model="answer">
                  </div>
                </div>
                <div class="mb-3 row">
                  <label class="col-sm-2 col-form-label">보기1</label>
                  <div class="col-sm-10">
                    <textarea class="form-control" rows="2" v-model="option1"></textarea>
                  </div>
                </div>
                <div class="mb-3 row">
                  <label class="col-sm-2 col-form-label">보기2</label>
                  <div class="col-sm-10">
                    <textarea class="form-control" rows="2" v-model="option2"></textarea>
                  </div>
                </div>
                <div class="mb-3 row">
                  <label class="col-sm-2 col-form-label">보기3</label>
                  <div class="col-sm-10">
                    <textarea class="form-control" rows="2" v-model="option3"></textarea>
                  </div>
                </div>
                <div class="mb-3 row">
                  <label class="col-sm-2 col-form-label">보기4</label>
                  <div class="col-sm-10">
                    <textarea class="form-control" rows="2" v-model="option4"></textarea>
                  </div>
                </div>
                <div class="mb-3 row">
                  <label class="col-sm-2 col-form-label">사용 여부</label>
                  <div class="col-sm-10">
                    <select class="form-select" v-model="isActive">
                      <option value="active">활성화</option>
                      <option value="inactive">비활성화</option>
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

import { onMounted, ref  } from 'vue';


const props = defineProps({
    paramObject: Object
  });

  
  const examCategory = ref(0);

  const TypeList = () => {
  let param = new URLSearchParams();
  axios.post('/tut/testControlJson.do', param).then((res)=>{
    type.value = res.data.lecList;
    const chtype = dataList.value[0]?.lec_type_id;
    ChooseType.value = chtype;
  });
};
  console.log('타입이 나오려나', type.value);

  const saveQuestion = () => {
    let param = new URLSearchParams();
    param.append('lec_type_id', examCategory.value);
    param.append('test_que',question.value );
    param.append('que_ans',answer.value);
    param.append('que_ex1',option1.value);
    param.append('que_ex2',option2.value);
    param.append('que_ex3',option3.value);
    param.append('que_ex4',option4.value);
    param.append('use_yn', UseORNot.value);
    param.append('action', 'I');
    param.append('que_id','');
    axios.post('/tut/testSave.do', param).then((res)=>{
      if(res.data.reuslt < 0) {
        alert(res.data.resultMsg);
      } else {
        alert(res.data.resultMsg);
      }
    })
  };
  


  onMounted(()=>{
    TypeList();
  })
</script>

<style>

</style>