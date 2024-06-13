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
                                <td v-if="data.yn === n">미제출</td>
                                <td v-if="data.yn === y">제출</td>
                                <td>{{ data.yn }}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Pagination v-bind="{currentPage, totalItems : Total, itemsPerPage : 5}" @search="HomeWork($event)" v-if="dataList.length > 0"/>
</div>
</template>

<script setup>
import axios from 'axios';
import {ref, onMounted} from 'vue';
import Pagination from '@/components/common/PaginationComponent.vue';

const dataList = ref([]);
const currentPage = ref(0);
const Total = ref(0);

const HomeWork = (cpage) => {
    cpage = cpage || 1;
    let param = new URLSearchParams();
    param.append('cpage', cpage);
    param.append('pagesize', 5);
    axios.post('/std/submitListJson.do', param).then((res) => {
        dataList.value = res.data.listdata;
        currentPage.value = cpage;
        Total.value = res.data.listcnt;
    })
} 

onMounted(() => {
    HomeWork();
})
</script>

<style>

</style>