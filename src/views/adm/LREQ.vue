<template>
  <div  class="container mt-4">
    <div  class="mb-3 row"> 
        <h3>장비 목록</h3>
        <div> 
            <button class="btn btn-success">장비 신규 등록</button>
        </div>
        <div> 
            <table class="table"> 
                <tr> 
                    <td>강의실 명 </td>
                    <td>장비 명</td>
                    <td>장비 수</td>
                    <td>비고</td>
                    <td></td>
                </tr>
                <tr v-for="data in dataList" :key="data.lecrm_id"> 
                    <td>{{ data.lecrm_name }}</td>
                    <td>{{ data.equ_name }}</td>
                    <td>{{ data.equ_num }}</td>
                    <td>{{ data.equ_note }}</td>
                    <td>
                        <button class="btn btn-primary">수정</button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import {ref, onMounted, watch} from 'vue';

const props = defineProps({
    lecrm_id : Number
});

const dataList = ref([]);
const totalCnt = ref(0);

const LREQ = (cpage) => {
    cpage = cpage || 1;
    let param = new URLSearchParams();
    param.append('lecrm_id', props.lecrm_id);
    param.append('cpage', cpage);
    param.append('pagesize', 10);
    axios.post('/adm/equListjson.do', param).then((res)=> {
        dataList.value = res.data.listdata;
        totalCnt.value = res.data.listcnt;
        
    })
}

watch(props, () => {
    LREQ();
})

onMounted(()=>{
    LREQ();
})
</script>

<style>

</style>