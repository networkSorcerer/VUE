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
</div>
</template>

<script setup>
import axios from 'axios';
import {ref, onMounted} from 'vue';


const dataList = ref([]);


const TestList =(cpage) => {
    cpage = cpage || 1;
    let param = new URLSearchParams();
    param.append('currentPage',cpage);
    param.append('pageSize', 10);
    param.append('searchKey','');
    axios.post('/std/myTestListJson.do', param).then((res)=> {
        dataList.value = res.data.listData;
    });
};



onMounted(() => {
    TestList();
})
</script>

<style>

</style>