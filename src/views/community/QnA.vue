<template>
<div> 
    <div> 
        <div> 
            <div> 
                <div> 
                    <div> 
                        <p>/ 커뮤니티 / Q&A </p>      
                    </div>
                    <div> 
                        <h3>Q&A게시판</h3>
                    </div>
                    <div><p>제목</p></div>
                    <div> 
                        <input type="text">
                    </div>
                    <div> 
                        <button>검색</button>
                        <button>글쓰기</button>
                    </div>
                    <div> 
                        <table>
                            <tr >
                                <td>번호</td>
                                <td>제목</td>
                                <td>작성자</td>
                                <td>등록일</td>
                                <td>조회수</td>
                            </tr>
                            <tr v-for="data in dataList" :key="data.loginID">
                                <td>{{ data.qna_id }}</td>
                                <td>{{ data.qna_title }}</td>
                                <td>{{ data.loginID }}</td>
                                <td>{{ data.regdate }}</td>
                                <td>{{  }}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Pagination v-bind="{currentPage, totalItems : Total, itemsPerPage : 5}" @search="QNA($event)" v-if="dataList.length > 0"/>

</div>  
</template>

<script setup>
import axios from "axios";
import {ref, onMounted} from "vue";
import Pagination from '@/components/common/PaginationComponent.vue';

const dataList = ref([]);
const currentPage = ref(0);
const Total = ref(0);

const QNA = (cpage) => {
    cpage = cpage || 1;
    let param = new URLSearchParams();
    param.append('cpage',cpage);
    param.append('pagesize',5);
    param.append('searchtitle','');
    axios.post('/qnaListJson.do',param).then((res) => {
        dataList.value = res.data.listData;
        currentPage.value = cpage;
        Total.value = res.data.listcnt;
    });
};

onMounted(() => {
    QNA();
})
</script>

<style>

</style>