<template>
<div>
    <div> 
        <div> 
            <div> 
                <div> 
                    <p>/ 학습 지원 / 강의 계획서</p>
                </div>
                <div> 
                    <h3>강의 계획서 관리</h3>
                </div>
                <div> 
                    <label>
                        <input type="text">
                    </label>
                </div>
                <div> 
                    <button>검색</button>
                </div>
                <div> 
                    <button>진행중 강의</button>
                </div>
                <div> 
                    <button>종료된 강의</button>
                </div>
                <div> 
                    <table>
                        <tr>
                            <td>분류</td>
                            <td>강의명</td>
                            <td>기간</td>
                            <td>수강인원</td>
                        </tr>
                        <tr v-for="data in dataList" :key="data.lec_id">
                            <td>{{ data.lec_sort }}</td>
                            <td>{{ data.lec_name }}</td>
                            <td>{{ data.start_date }} ~ {{ data.end_date }}</td>
                            <td>{{ data.max_pnum }}</td>
                        </tr>
                    </table>
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
const totalCount = ref(0);

const LecPlanList = (cpage) => {
    cpage = cpage || 1;
    let param = new URLSearchParams();
    param.append('searchWord','' );
    param.append('currentPage',cpage);
    param.append('pageSize',10);
    param.append('progress','');
    axios.post('/tut/fLectureListJson.do', param).then((res) => {
        dataList.value = res.data.lecList;
        totalCount .value = res.data.totalCnt;
    });
};

onMounted(()=> {
    LecPlanList();
})

</script>

<style>

</style>