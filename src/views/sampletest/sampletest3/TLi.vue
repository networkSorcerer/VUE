<template>
    <div>
        <p class="Location">
            <span class="btn_nav bold">인원 관리</span>
            <span class="btn_nav bold"> 강사 리스트</span>
        </p>
        <p class="conTitle">
            <span class="conNm">강사</span>
            <span class="fr">
                <span>강사 명</span>
                <input type="text" class="lecure-name" />
                <button class="btn btn-light btn-sm" @click="$router.push('write')">강사 신규등록</button>
                <button class="btn btn-secondary btn-sm" >검색</button>
            </span>
        </p>
        <div>
            <b> 총 원 : {{ total }} 현재 페이지 번호 : {{ currentPage }} </b>
        </div>
        <div class="row">
         <CT  />
        </div>
        <!-- <Pagination v-bind="{currentPage, totalItems : total, itemsPerPage : 6}" @search="searchLecture($event)" v-if="dataList.length > 0"/> -->

     </div>
</template>
<script>
import CT from '../sampletest3/CT.vue'


export default {

}
</script>

<style>

</style>