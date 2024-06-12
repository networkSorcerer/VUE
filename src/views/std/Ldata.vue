<template>
<div> 
    <div> 
        <div> 
            <div> 
                <div> 
                    <div> 
                       <p>학습자료</p>       
                    </div>
                    <div> 
                        <table>
                            <tr v-for="data in dataList " :key="data" >
                                <td>제목</td>
                                <td><input type="text" disabled></td>
                                <td>등록일자</td>
                                <td><input type="text" disabled></td>
                            </tr>
                            <tr>
                                <td>내용</td>
                                <td colspan="3"><input type="textarea" disabled></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>첨부파일</td>
                                <td colspan="3"></td>
                                <td></td>
                                <td></td>
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
const dataList =ref([]);

const Ldata = () => {
    let param = new URLSearchParams();
    axios.post('/std/surveyItemListJson.do', param).then((res) => {
        dataList.value = res.data.data;
    });
};

onMounted (() => {
    Ldata();
})
</script>

<style>

</style>