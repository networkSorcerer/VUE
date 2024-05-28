<template>
    <form id="myForm" action="" method="">
        <input type="hidden" id="currentPage_lec" value="1"> 
        <input type="hidden" id="currentPage_std" value="1"> 
        <input type="hidden" id="tmp_lec" value=""> 
        <input type="hidden" id="tmp_user" name="loginID" value=""> 
        <input type="hidden" name="action" id="action" value="">

        <!-- 모달 배경 -->
        <div id="mask"></div>

        <div id="wrap_area">

            <h2 class="hidden">header 영역</h2>
            <!-- 헤더 영역 컴포넌트를 import하고 사용 -->
            <HeaderComponent />

            <h2 class="hidden">컨텐츠 영역</h2>
            <div id="container">
                <ul>
                    <li class="lnb">
                        <!-- lnb 영역 컴포넌트를 import하고 사용 --> 
                        <LnbMenuComponent />
                    </li>
                    <li class="contents">
                        <h3 class="hidden">contents 영역</h3>
                        <div class="content">

                            <p class="Location">
                                <router-link to="/notice/aNotice.do" class="btn_set home">메인으로</router-link>
                                <router-link to="" class="btn_nav">인원 관리</router-link>
                                <span class="btn_nav">학생 관리</span>
                                <router-link to="/adm/studentControl.do" class="btn_set refresh">새로고침</router-link>
                            </p>

                            <p class="conTitle" id="searcharea">
                                <span>강의 목록</span>
                                <span class="fr">
                                    <strong>강 의 명</strong>
                                    <input type="text" id="searchWord_lec" name="searchWord_lec" style="height: 28px;">
                                    <button class="btnType blue" @click="fLecList">검색</button>
                                </span>
                            </p>

                            <!-- 강의 리스트 -->
                            <div class="lectureList" id="lectureList">
                                <table class="col">
                                    <caption>caption</caption>
                                    <colgroup>
                                        <col width="5%">
                                        <col width="30%">
                                        <col width="10%">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th scope="col">과정 ID</th>
                                            <th scope="col">과정명 명</th>
                                            <th scope="col">기간</th>
                                        </tr>
                                    </thead>
                                    <tbody id="lecList">
                                        <tr v-for="data in dataList" :key="data.lec_id" :data="data" >
                                            <td>{{ data.lec_id }}</td>
                                            <td>{{ data.lec_name }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <PaginationComponent :current-page="currentPage" :total-items="totalItems" @page-changed="searchLecture" />

                            <!-- 학생 목록 -->
                            <p class="conTitle mt50">
                                <span>학생 목록</span>
                                <span class="fr">
                                    <select id="searchKey_std" name="searchKey_std" style="width: 80px;">
                                        <option value="all" id="option1" selected>전체</option>
                                        <option value="stdNm" id="option1">학생명</option>
                                        <option value="stdId" id="option2">id</option>
                                        <option value="tel" id="option2">전화번호</option>
                                    </select>
                                    <input type="text" id="searchWord_std" name="searchWord_std" @input="formatPhoneNumber" style="height: 28px;">
                                    <button class="btnType blue" @click="flist_std">검색</button>
                                </span>
                            </p>
                            
                            <p class="Location fr">
                                <strong>가입일 조회 </strong>
                                <input type="date" id="from_date">~<input type="date" id="to_date">
                                <button class="btnType blue" @click="flist_std">조회</button>
                            </p>
                            
                            <span class="fl"> 
                                <button class="btnType3 color2" @click="flist_std">전체 학생</button>
                                <button class="btnType3 color1" @click="flist_std(1, '미수강')">미수강 학생</button>
                            </span>
                            
                            <!-- 학생 리스트 -->
                            <div class="div_list_student" id="div_list_student">
                                <table class="col">
                                    <caption>caption</caption>
                                    <colgroup>
                                        <col width="10%">
                                        <col width="10%">
                                        <col width="20%">
                                        <col width="10%">
                                        <col width="10%">
                                        <col width="10%">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th scope="col">학번</th>
                                            <th scope="col">수강강의</th>
                                            <th scope="col">학생 명(ID)</th>
                                            <th scope="col">휴대전화</th>
                                            <th scope="col">가입일자</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody id="std_list">
                                        <tr v-for="student in studentList" :key="student.id">
                                            <td>{{ student.studentNumber }}</td>
                                            <td>{{ student.course }}</td>
                                            <td>{{ student.name }}</td>
                                            <td>{{ student.phone }}</td>
                                            <td>{{ student.joinDate }}</td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <PaginationComponent :current-page="currentPage" :total-items="totalItems" @page-changed="searchStudent" />
                        </div>

                        <FooterComponent />
                    </li>
                </ul>
            </div>
        </div>
    </form>

    <!-- 모달팝업 -->
    <div id="layer1" class="layerPop layerType2" style="width: 600px;">
        <dl>
            <dt><strong>학생 정보</strong></dt>
            <dd class="content">
                <table class="row">
                    <caption>caption</caption>
                    <colgroup>
                        <col width="10%">
                        <col width="10%">
                        <col width="10%">
                        <col width="10%">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th scope="row">ID</th>
                            <td id="std_id"></td>
                            <th scope="row">학번</th>
                            <td id="std_num"></td>
                        </tr>
                        <tr>
                            <th scope="row">이름</th>
                            <td id="std_name"></td>
                            <th scope="row">생년월일</th>
                            <td id="std_birth"></td>
                        </tr>
                        <tr>
                            <th scope="row">전화 번호</th>
                            <td id="std_tel"></td>
                            <th scope="row">성별</th>
                            <td id="std_sex"></td>
                        </tr>
                        <tr>
                            <th scope="row">이메일</th>
                            <td id="std_mail" colspan="6"></td>
                        </tr>
                        <tr>
                            <th scope="row">주소</th>
                            <td id="std_addr" colspan="6"></td>
                        </tr>
                        <tr>
                            <td colspan="6">
                                <p class="conTitle mt20">
                                    <span>수강 내역</span>
                                    <span class="fr" style="margin-right: 20px">
                                        <button class="btnType3 color2" @click="fPopModal_std_lec_reg">수강 등록</button>
                                    </span>
                                </p>
                                
                                <table class="col">
                                    <caption>caption</caption>
                                    <colgroup>
                                        <col width="5%">
                                        <col width="10%">
                                        <col width="20%">
                                        <col width="10%">
                                        <col width="10%">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th scope="col">강의ID</th>
                                            <th scope="col">강의명</th>
                                            <th scope="col">기간</th>
                                            <th scope="col">상태</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody id="slec_list">
                                        <tr v-for="course in studentCourses" :key="course.id">
                                            <td>{{ course.id }}</td>
                                            <td>{{ course.name }}</td>
                                            <td>{{ course.period }}</td>
                                            <td>{{ course.status }}</td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div class="btn_areaC mt30">
                    <button class="btnType gray" @click="closeModal">닫기</button>
                </div>
            </dd>
        </dl>
        <button class="closePop" @click="closeModal">닫기</button>
    </div>
    
    <!-- 강의 등록 모달 -->
    <form id="lec_reg_form">
        <div id="layerB" class="layerPop layerType2" style="width: 600px;">
            <input type="hidden" value="" name="std_id" id="rstdval">
            <dl>
                <dt><strong>수강 등록</strong></dt>
                <dd class="content">
                    <table class="row">
                        <caption>caption</caption>
                        <colgroup>
                            <col width="20%">
                            <col width="30%">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>과정선택</th>
                                <td colspan="4">
                                    <select id="reg_lec" name="lec_id" style="width:350px">
                                        <option v-for="lecture in lectureOptions" :key="lecture.lec_id" :value="lecture.lec_id">
                                            {{ lecture.lec_name }} ({{ lecture.start_date }} ~ {{ lecture.end_date }})
                                        </option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="btn_areaC mt30">
                        <button class="btnType blue" @click="registerLecture">수강 등록</button>
                        <button class="btnType gray" @click="closeModal">닫기</button>
                    </div>
                </dd>
            </dl>
            <button class="closePop" @click="closeModal">닫기</button>
        </div>
    </form>
</template>

<script setup>

import { onMounted, ref } from 'vue';
import Pagination from '@/components/common/PaginationComponent.vue';
import { SamplePage7 } from '@/api/api';
import {axiosAction} from '.';
import CardStu from './CardStu.vue';

const dataList = ref([]);
const total = ref(0);
const currentPage = ref(1);

const searchLecture = async (currentPage) => {
    currentPage = currentPage || 1;
    let param = new URLSearchParams();
    param.append('currentPage', currentPage);
    param.append('pageSize', 6);

    // axios.post('/adm/lectureRoomListjson.do', param).then((res) => {
    //     dataList.value = res.data.listdata;
    //     total.value = res.data.listcnt;
    //     currentPage.value = cpage;
    // });

    const stuList = await axiosAction(SamplePage7.std_list, param);

    if(stuList) {
        dataList.value =stuList.listdata;
        total.value =   stuList.listcnt;
        currentPage.value = currentPage;
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