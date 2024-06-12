<template>
<div class="backdrop"> 
    <div class="container"> 
        <div> 
            <div> 
                <div> 
                    <div> 
                        <p>수강목록 상세보기</p>       
                    </div>
                    <div> 
                        <table>
                            <tr v-for="data in detail" :key="data.loginID">
                                <td>강의명</td>
                                <td>{{ data.lec_name }}</td>
                                <td>강의분류</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>강사명</td>
                                <td></td>
                                <td>강의실</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>강의기간</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>수업목표</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </table>
                    </div>
                    <div> 
                        <button type="button" class="btn btn-light" @click="$emit('closeModal', false)">닫기</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>  
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
const detail = ref(0);

    const props = defineProps({
        lec_id: Number,
       
    });

const LecDetail = () => {
  let param = new URLSearchParams();
  param.append('lec_id', props.lec_id);
  axios.post('/std/myLecDetailJson.do', param).then((res) => {
    detail.value = res.data.data;
  })
} 

onMounted(()=> {
    LecDetail();
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
.container {
    background: white;
    padding: 1.5rem;
    height: 50%;
}
</style>