<template>
  
  <div> 
    <div> 
        <div> 
            <div> 
                <div> 
                    <div> 
                        <p>/학습 관리 / 과제 제출</p>
                    </div>
                    <div> 
                        <h3>과제 제출</h3>
                    </div>
                    <div> 
                        <table>
                            <tr>
                                <td>강의명</td>
                                <td>과제명</td>
                                <td>제출기한</td>
                                <td>다운로드</td>
                                <td>제출</td>
                                <td>제출여부</td>
                            </tr>
                            <tr v-for="data in dataList" :key="data.lec_id">
                                <td>{{ data.lec_name }}</td>
                                <td>{{ data.hwk_name }}</td>
                                <td>{{ data.submit_date }}</td>
                                <td> 다운로드{{ data.hwk_url }}</td>
                                <td v-if="data.yn =n">미제출</td>
                                <td v-if="data.yn =y">제출</td>
                                <td>{{ data.yn }}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
import axios from 'axios';
import {ref, onMounted} from 'vue';

const dataList = ref([]);

const HomeWork = (cpage) => {
    cpage = cpage || 1;
    let param = new URLSearchParams();
    param.append('cpage', cpage);
    param.append('pagesize', 10);
    axios.post('/std/submitListJson.do', param).then((res) => {
        dataList.value = res.data.listdata;
    })
} 

onMounted(() => {
    HomeWork();
})
</script>

<style>

</style>