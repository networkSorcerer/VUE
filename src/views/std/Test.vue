<template>
  
<div> 
    <div> 
        <div> 
            <div> 
                <div> 
                    <div> 
                        <p>/학습 관리 / 시험응시</p>  
                    </div>
                    <div> 
                        <h3>시험응시</h3>
                    </div>
                    <div> 
                        <select>
                            <option>전체 시험목록</option>
                            <option>진행중인 시험</option>
                            <option>지난 시험</option>
                        </select>
                    </div>
                    <div> 
                        <table>
                            <tr>
                                <td>과정명</td>
                                <td>시험명</td>
                                <td>강사명</td>
                                <td>응시기간</td>
                                <td>결과</td>
                                <td>시험응시</td>
                            </tr>
                            <tr v-for="data in dataList" :key="data.loginID">
                                <td>{{ data.lec_name }}</td>
                                <td>{{ data.test_name }}</td>
                                <td>{{ data.tut_name }}</td>
                                <td>{{ data.test_start }} ~ {{ data.test_end }}</td>
                                <td>{{  data.test_yn }}</td>
                                <td>시험응시</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Pagination v-bind="{currentPage, totalItems : Total, itemsPerPage : 5}" @search="TestList($event)" v-if="dataList.length > 0"/>
</div>
</template>

<script setup>
import axios from 'axios';
import {ref, onMounted} from 'vue';
import Pagination from '@/components/common/PaginationComponent.vue';

const dataList = ref([]);
const currentPage = ref(0);
const Total = ref(0);

const TestList =(cpage) => {
    cpage = cpage || 1;
    let param = new URLSearchParams();
    param.append('currentPage',cpage);
    param.append('pageSize', 5);
    param.append('searchKey','');
    axios.post('/std/myTestListJson.do', param).then((res)=> {
        dataList.value = res.data.listData;
        currentPage.value = cpage;
        Total.value = res.data.listCnt;
        console.log(dataList);
    });
};



onMounted(() => {
    TestList();
})
</script>

<style>

</style>