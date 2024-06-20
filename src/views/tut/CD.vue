<template>
    <div class="backdrop">
      <div class="container">
        <div>
          <div>
            <div>
              <div>
                <p>수강상담 관리</p>
              </div>
              <div>
                <table  class="table table-bordered">
                  <tr>
                    <td>과정명</td>
                    <td colspan="3"><input type="text" v-model="dataList.lec_name" class="form-control"></td>
                  </tr>
                  <tr>
                    <td>학생명</td>
                    <td colspan="3"><input type="text" v-model="dataList.std_id" class="form-control"></td>
                  </tr>
                  <tr>
                    <td>상담일자</td>
                    <td><input type="text" v-model="dataList.adv_date" class="form-control"></td>
                    <td>상담장소</td>
                    <td><input type="text" v-model="dataList.adv_place" class="form-control"></td>
                  </tr>
                  <tr>
                    <td>최종 수정일자</td>
                    <td><input type="text" class="form-control" v-model="dataList.mod_date"></td>
                    <td>상담자</td>
                    <td><input type="text" class="form-control" v-model="dataList.tut_name"></td>
                  </tr>
                  <tr>
                    <td colspan="4">
                      <textarea class="form-control" v-model="dataList.adv_content"></textarea>
                    </td>
                  </tr>
                </table>
              </div>
              <div>
                <button @click="updateConsultation" class="btn btn-primary">수정</button>
                <button class="btn btn-danger">삭제</button>
                <button @click="$emit('closeModal', false)" class="btn btn-secondary">취소</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import axios from "axios";
  import { ref, onMounted, reactive } from 'vue';
  
  const props = defineProps({
      adv_id: Number,
      lec_id: Number
  });
  
  const dataList = reactive({ lec_name:'',std_id:'',adv_date:'',adv_place:'',adv_content:'',mod_date:'' , tut_name:''});
  
  // 상담 상세 정보 조회
  const fetchConsultationDetail = () => {
      let param = new URLSearchParams();
      param.append('adv_id', props.adv_id);
      param.append('lec_id', props.lec_id);
      
      axios.post('/adv/advDetailR.do', param)
        .then((res) => {
          dataList.lec_name = res.data.data.lec_name;
          dataList.std_id = res.data.data.std_id;
          dataList.adv_date = res.data.data.adv_date;
          dataList.adv_place = res.data.data.adv_place;
          dataList.adv_content = res.data.data.adv_content;
          dataList.tut_name = res.data.data.tut_name;
          dataList.mod_date = res.data.data.mod_date;
          dataList.tmp_lec_id = res.data.data.temp_lec_id;
        })
        .catch((error) => {
            console.error('Error fetching consultation detail:', error);
        });
  };
  
  // 상담 정보 수정
  const updateConsultation = () => {
      let param = new URLSearchParams(dataList);
      param.append('action','U');
      param.append('adv_id',props.adv_id);
      param.append('lec_id',props.lec_id);
      param.append('std_id', dataList.std_id);
      param.append('adv_place',dataList.adv_place);
      param.append('adv_date',dataList.adv_date);
      param.append('adv_content', dataList.adv_content);
      param.append('tmp_lec_id',dataList.temp_lec_id);
      axios.post('/adv/advSave.do', param)
        .then((res) => {
           if(res.data.result === 'SUCCESS') {
            alert(res.data.resultMsg);
           }
        })
        .catch((error) => {
            console.error('Error updating consultation:', error);
        });
  };
  
  onMounted(() => {
      fetchConsultationDetail();
  });
  </script>
  
  <style>
  .backdrop {
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* 반투명한 배경 */
  }
  
  .container {
    padding: 1rem;
  }
  
  .table {
    width: 100%;
    margin-bottom: 1rem;
    background-color: #fff;
  }
  
  .btn {
    margin-right: 0.5rem;
  }
  </style>
  