<template>
  <div class="backdrop">
    <div class="container"> 
        <div v-if="lecrm_id"></div>
        <p>강의실 등록</p>
        <div  class="mb-3 row"> 
            <table class="table">
                <tr>
                    <td>강의실 명 </td>
                    <td colspan="3">
                        <input type="text" v-model="dataList.lecrm_name" class="form-control">
                    </td>
                </tr>
                <tr>
                    <td>강의실 크기</td>
                    <td>
                        <input type="text" v-model="dataList.lecrm_size" class="form-control">
                    </td>
                    <td>강의실 자리수</td>
                    <td>
                        <input type="text" v-model="dataList.lecrm_snum"  class="form-control">
                    </td>
                </tr>
                <tr>
                    <td>비고</td>
                    <td colspan="3">
                        <input type="text" v-model="dataList.lecrm_note"  class="form-control">
                    </td>
                </tr>
            </table>
        </div>
        <div> 
            <template v-if="!lecrm_id">
                <button @click="Update('I')"  class="btn btn-primary">등록</button>
            </template>
            <template v-else>
                <button @click="Update('U')" class="btn btn-secondary">저장</button>
                <button @click="Delete('D')" class="btn btn-danger">삭제</button>
            </template>
            <button @click="$emit('closeModal', false)" class="btn btn-primary">닫기</button>
        </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import {ref, onMounted} from 'vue';
import { nullcheck } from '@/common/common';

const emit = defineEmits(['closeAndSearch']);

const props = defineProps({
    lecrm_id: Number
})

const dataList = ref(new Object());

const LRD= () => {
    let param = new URLSearchParams();
    param.append('lecrm_id', props.lecrm_id);
    axios.post('/adm/lectureRoomDtl.do', param).then((res) => {
        dataList .value = res.data.selinfo;
    });
};

const Update = (data) => {
    let checkresult = nullcheck([
    {inval: dataList.lecrm_name, msg: '강의실 명을 입력해주세요'},
    {inval: dataList.lecrm_size, msg: '강의실 명을 입력해주세요'},
    {inval: dataList.lecrm_snum, msg: '강의실 명을 입력해주세요'},
    ]);
    if(!checkresult) return;
    let param = new URLSearchParams(dataList.value);
    param.append('lecrm_id', props.lecrm_id);
    param.append('action', data);
    axios.post('/adm/lectureRoomSave.do',param).then((res) => {
        emit('closeAndSearch', false);
    })
}

onMounted(()=> {
    props.lecrm_id ? LRD() : null;
})
</script>

<style>

</style>