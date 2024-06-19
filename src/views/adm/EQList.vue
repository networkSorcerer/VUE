<template>
    <div class="container">
        <div class="row mb-3"> 
            <div class="col"> 
                <p class="breadcrumb-item">/ 시설 관리 / 장비 관리</p>
            </div>
            <div class="col"> 
                <h3>장비 관리</h3>
            </div>
            <div class="col"> 
                <select class="form-control" style="height: 50px" v-model="searchOption">
                    <option value="room">강의실 명 </option>
                    <option value="equ">장비명 </option>
                </select>
            </div>
            <div class="col"> 
                <input type="text" class="form-control" v-model="searchName">
            </div>
            <div class="col">
                <button class="btn btn-primary" @click="EQList(searchOption.value,searchName.value )">검색</button>
                <button @click="modalHandler()" class="btn btn-success">장비 신규 등록</button>
            </div>
            <div class="col-12"> 
                <table class="table table-bordered mt-3" @change="EQList()">
                    <thead class="thead-light">
                        <tr>
                            <th>강의실 명</th>
                            <th>장비명</th>
                            <th>장비 수</th>
                            <th>비고</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="data in dataList" :key="data.lec_id">
                            <td>{{ data.lecrm_name }}</td>
                            <td>{{ data.equ_name }}</td>
                            <td>{{ data.equ_num }}</td>
                            <td>{{ data.equ_note }}</td>
                            <td>
                                <button class="btn btn-warning" 
                                @click="modalHandler1(data.equ_name, data.equ_num, data.lecrm_name, data.equ_note, data.equ_id,data.lecrm_id)">수정</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Pagination  v-bind="{ currentPage, totalItems: totalCnt, itemsPerPage: 10 }" @search="EQList($event)"/>  
        </div>
    </div>
    
    <EQM v-if="modalBoolean" 
    @closeModal="modalBoolean=$event"
   
    />
    <UEQ v-if="modalBoolean1"
    @closeModal="modalBoolean1=$event"
    :paramObject="paramObject"
    />
    </template>
    
    <script setup>
    import axios from "axios";
    import {ref , onMounted} from 'vue';
    import Pagination from "@/components/common/PaginationComponent.vue";
    import EQM from "./EQM.vue";
    import UEQ from "./UEQ.vue";

    const dataList = ref([]);
    const totalCnt = ref(0);
    const currentPage = ref(0);
    const modalBoolean = ref(false);
    const modalBoolean1 = ref(false);

    
    const paramObject = ({
        equ_name: '', equ_num: 0, lecrm_name: '', equ_note: '', equ_id:0 ,lecrm_id:0 ,lecrm_name:''
    })

    const searchOption = ref('');
    const searchName = ref('');

    const EQList = (cpage) => {
        cpage = cpage | 1;
        let param = new URLSearchParams();
        param.append('cpage',cpage);
        param.append('pageSize', 10);
        param.append('searchOption',searchOption.value);
        param.append('searchName',searchName.value);
        axios.post('/adm/equManagementListJson.do', param).then((res) => {
            dataList.value = res.data.listdata;
            totalCnt.value = res.data.listcnt;
            currentPage = cpage
        });
    };
    
    const modalHandler=() => {
        modalBoolean.value = true;
       
    };
    
    const modalHandler1=(equ_name,equ_num, lecrm_name, equ_note,equ_id,lecrm_id) =>{
        modalBoolean1.value= true;
        paramObject.value = {equ_name,equ_num, lecrm_name, equ_note,equ_id,lecrm_id};
    }


    onMounted(() => {
        EQList();
    })
    </script>
    
    <style>
    
    </style>
    