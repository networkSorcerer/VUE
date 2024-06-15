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
                                <td @click="modalHandler(data.qna_id, data.qna_title, data.qna_con)">{{ data.qna_title }}</td>
                                <td>{{ data.loginID }}</td>
                                <td>{{ data.regdate }}</td>
                                <td>{{ data.hit }}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Pagination v-bind="{currentPage, totalItems : Total, itemsPerPage : 5}" @search="QNA($event)" v-if="dataList.length > 0"/>
     <DQ
     v-if="modalBoolean" @closeModal="modalBoolean= $event" 
        :qna_id="qna_id"
        :qna_title="qna_title"
        :qna_con="qna_con"
        @closeAndSearch="modalClose"
     />
</div>  
</template>

<script setup>
import axios from "axios";
import {ref, onMounted} from "vue";
import Pagination from '@/components/common/PaginationComponent.vue';
import DQ from './DQ.vue';

const dataList = ref([]);
const currentPage = ref(0);
const Total = ref(0);
const modalBoolean = ref(false);
const qna_id = ref(0);
const qna_title =ref('');
const qna_con = ref('');

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

// 모달 팝업창 클로즈
const modalClose = (param) => {
    modalBoolean.value = param;
    QNA();
}

//팝업 창 
const modalHandler = (paramId, paramTitle, paramCon) => {
    modalBoolean.value = true;
    qna_id.value = paramId;
    qna_title.value = paramTitle;
    qna_con.value = paramCon;
}
onMounted(() => {
    QNA();
})
</script>

<style>

</style>