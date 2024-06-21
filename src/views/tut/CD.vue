<template>
  <div class="backdrop">
    <div class="container">
      <div>
        <div>
          <div>
            <p>수강상담 관리</p>
          </div>
          <div>
            
            <table class="table table-bordered">
              <div v-if="adv_id"></div>
              <tr>
                <td>과정명</td>
                <td colspan="3">
                  <template v-if="!adv_id">
                    <select v-model="CHLec" class="form-control" style="height: 40px">
                      <option v-for="lecture in dataList1" :key="lecture.lec_id" :value="lecture.lec_id">
                        {{ lecture.lec_name }}
                      </option>
                    </select>
                  </template>
                  <template v-else>
                    <input type="text" v-model="dataList.lec_name" class="form-control">
                  </template>
                </td>
              </tr>
              <tr>
                <td>학생명</td>
                <template v-if="!adv_id">
                  <select v-model="dataList.std_id" style="height: 40px;">
                    <option v-for="data in stlist" :key="data.std_id" :value="data.std_id">{{ data.std_name }}</option>
                  </select>
                </template>
                <template v-else>
                  <td colspan="3"><input type="text" v-model="dataList.std_id" class="form-control"></td>
                </template>
              </tr>
              <tr>
                <td>상담일자</td>
                <td><input type="date" v-model="dataList.adv_date" class="form-control"></td>
                <td>상담장소</td>
                <td><input type="text" v-model="dataList.adv_place" class="form-control"></td>
              </tr>
              <tr v-if="adv_id">
                <td>최종 수정일자</td>
                <td><input type="text" v-model="dataList.mod_date" class="form-control"></td>
                <td>상담자</td>
                <td><input type="text" v-model="dataList.tut_name" class="form-control"></td>
              </tr>
              <tr>
                <td colspan="4">
                  <textarea class="form-control" v-model="dataList.adv_content"></textarea>
                </td>
              </tr>
            </table>
          </div>
          <div>
            <button type="button" class="btn btn-info" @click="CC" v-if="!adv_id">등록</button>
            <template v-else>
              <button @click="updateConsultation" class="btn btn-primary">수정</button>
              <button class="btn btn-danger" @click="CDelete">삭제</button>
            </template>
            <button @click="$emit('closeModal', false)" class="btn btn-secondary">취소</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted, reactive, watch ,computed} from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const userInfo = computed(() => store.getters.getLoginInfo);

const props = defineProps({
  adv_id: Number,
  lec_id: Number,
  lecture: Object,
  lectureId : Number,
});


console.log('useStore는 뭘까?????',userInfo.value);

const dataList = reactive({ lec_name:'',std_id:'',adv_date:'',adv_place:'',adv_content:'',mod_date:'' , tut_name:'' });
const dataList1 = ref([]);
const CHLec = ref(0);
const stlist = ref([]);




const fetchConsultationDetail = () => {
  if (props.adv_id) {
    let param = new URLSearchParams();
    param.append('adv_id', props.adv_id);
    param.append('lec_id', props.lec_id);
    
    axios.post('/adv/advDetailR.do', param)
      .then((res) => {
        const data = res.data.data;
        dataList.lec_name = data.lec_name;
        dataList.std_id = data.std_id;
        dataList.adv_date = data.adv_date;
        dataList.adv_place = data.adv_place;
        dataList.adv_content = data.adv_content;
        dataList.tut_name = data.tut_name;
        dataList.mod_date = data.mod_date;
      })
      .catch((error) => {
        console.error('Error fetching consultation detail:', error);
      });
  }
};

const updateConsultation = () => {
  let param = new URLSearchParams(dataList);
  param.append('action','U');
  param.append('adv_id', props.adv_id);
  param.append('lec_id', props.lec_id);
  axios.post('/adv/advSave.do', param)
    .then((res) => {
       if(res.data.result === 'SUCCESS') {
        alert(res.data.resultMsg);
        emit('closeAndSearch', false);
       }
    })
    .catch((error) => {
        console.error('Error updating consultation:', error);
    });
};

const LecList = () => {
  let param = new URLSearchParams();
  param.append('currentPage', 1);
  param.append('pageSize', 999);
  axios.post('/adv/lecListR.do', param).then((res) => {
    dataList1.value = res.data.listData;
  }).catch((error) => {
    console.error('Error fetching lecture list:', error);
  });
};

const STList = () => {
  let param = new URLSearchParams();
  param.append('lec_id',CHLec.value);
  axios.post('/adv/stdListJson.do', param).then((res) => {
    stlist.value = res.data.listData;
  
  })
}

const CC = () => {

  let param = new URLSearchParams(dataList);
  param.append('action', 'I');
  param.append('lec_id', CHLec.value);
  axios.post('/adv/advSave.do', param).then((res) => {
    if (res.data.result === 'SUCCESS') {
      alert(res.data.resultMsg);
    }
  }).catch((error) => {
    console.error('Error saving consultation:', error);
  });
};

const CDelete = () => {
  let param = new URLSearchParams();
  param.append('adv_id', props.adv_id);
  axios.post('/adv/advDelete.do', param).then((res) =>{
    if(res.data.result === 'SUCCESS') {
      alert(res.data.resultMsg);
    } else {
      alert('삭제에 실패하였습니다');
    }
  })
}

watch(CHLec, ()=> {
  STList();
});



onMounted(() => {
  fetchConsultationDetail();
  LecList();
  STList();
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
