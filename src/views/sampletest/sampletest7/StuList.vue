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
                <td>{{ data.std_num }}</td>
                <td>{{ data.lec_name }}</td>
                <td>{{ data.name }}</td>
                <td>{{ data.tel }}</td>
                <td>{{ data.start_date }}</td>
            </tr> 
        </table>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    data: Object,
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
