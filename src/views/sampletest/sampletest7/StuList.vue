<template>
  <div>
    <table>
        <tr>
            <td>학번</td>
            <td>수강강의</td>
            <td>학생 명</td>
            <td>휴대전화</td>
            <td>가입일자</td>
        </tr>
        <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
        </tr>
    </table>
  </div>
</template>

<script setup>

import { onMounted, ref } from 'vue';
import { SamplePage7 } from '@/api/api';
import {axiosAction} from '.';



const dataList = ref([]);
const total = ref(0);
const currentPage = ref(1);

const searchLecture = async (cpage) => {
    cpage = cpage || 1;
    let param = new URLSearchParams();
    param.append('currentPage', cpage);
    param.append('pagesize', 6);


    // axios.post('/adm/lectureRoomListjson.do', param).then((res) => {
    //     dataList.value = res.data.listdata;
    //     total.value = res.data.listcnt;
    //     currentPage.value = cpage;
    // });

    const std_list = await axiosAction(SamplePage7.std_list, param);

    if(std_list) {
        dataList.value =std_list.listdata;
        total.value =   std_list.listcnt;
        currentPage.value = cpage;
    }

};

onMounted(() => {
    searchLecture();
});
</script>

<style>
.lecure-name {
    height: 30px;
    border-radius: 5px;
}

.btn-sm {
    margin-left: 10px;
}
</style>