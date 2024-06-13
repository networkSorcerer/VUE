<template>
<div>
    <div> 
        <div> 
            <div> 
                <div> 
                    <p>/학습 관리 / 학습 자료</p>
                </div>
                <div> 
                    <h3>학습 자료</h3>
                </div>
                <div> 
                    <select>
                        <option>전체</option>
                        <option>제목</option>
                        <option>강의명</option>
                    </select>
                </div>
                <div> 
                    <input type="text">
                </div>
                <div> 
                    <button>검색</button>
                </div>
                <div> 
                    <table>
                        <tr>
                            <td>NO</td>
                            <td>강의명</td>
                            <td>제목</td>
                            <td>등록일</td>
                        </tr>
                        <tr v-for="data in dataList" :key="data.learn_data_id">
                            <td>{{ data.learn_data_id }}</td>
                            <td>{{ data.lec_name }}</td>
                            <td>{{ data.learn_tit }}</td>
                            <td>{{ data.w_date }}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <Pagination v-bind="{currentPage, totalItems : Total, itemsPerPage : 10}" @search="LearnData($event)" v-if="dataList.length > 0"/>
</div>

</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import Pagination from '@/components/common/PaginationComponent.vue';

const dataList = ref([]);
const currentPage = ref(0);
const Total = ref(0);


const LearnData =(cpage) => {
    cpage = cpage || 1;
   
    let param = new URLSearchParams();
    param.append('currentPage', cpage);
    param.append('pageSize', 10);
    axios.post('/std/stdLearnMatListJson', param).then((res) => {
        dataList.value = res.data.learningMatList;
        Total.value =res.data.totalCount;
        currentPage.value = cpage;
    });
};

onMounted(()=> {
    LearnData();
})
</script>

<style>

</style>