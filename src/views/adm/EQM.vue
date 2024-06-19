<template>
    <div class="backdrop">
        <div class="container"> 
            <div class="mb-3"> 
                <p>장비 등록</p>
            </div>
            <div > 
                <table class="table" > 
                    <tr>
                        <td>장비 명 </td>
                        <td colspan="3">
                            <input type="text" class="form-control"  v-model="Ename">
                        </td>
                    </tr>
                    <tr>
                        <td>장비수 </td>
                        <td>
                            <input type="text" class="form-control" v-model="Enumber"> 
                        </td>
                        <td>강의실</td>
                        <td>
                            <select class="form-control" v-model="Lecture"  style="height: 50px"> 
                                <option v-for="data in dataList" :key="data.lecrm_id" :value="data.lecrm_id">{{ data.lecrm_name }} </option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>비고</td>
                        <td colspan="3">
                            <input type="text" class="form-control" v-model="Note"> 
                        </td>
                    </tr>
                </table>
            </div>
            <div> 
                <button @click="Save()" class="btn btn-primary">저장</button> 
                <button @click="$emit('closeModal', false)" class="btn btn-secondary">취소</button>
            </div>
        </div>
    </div>
    </template>
    
    <script setup>
    import axios from "axios";
    import {ref, onMounted} from 'vue';

   const emit = defineEmits(['closeAndSearch']);

    const Ename =ref('');
    const Enumber = ref(0);
    const Lecture =ref(0);
    const Note = ref('');
    const dataList = ref([]);

    const Save = () => {
        let param = new URLSearchParams();
        param.append('equ_name', Ename.value);
        param.append('equ_num', Enumber.value);
        param.append('lecrm_id',Lecture.value);
        param.append('equ_note',Note.value);
        param.append('action', 'I');
        param.append('equ_id','');
        axios.post('/adm/equSave.do', param).then((res) =>{
            if(res.data.result === 'SUCCESS'){
                alert(res.data.resultmsg);
                emit('closeAndSearch', false);
            } else {
                alert(res.data.resultmsg);
            }
        });
    };
    
    const LRList = () => {
        let param = new URLSearchParams();

        axios.post('/adm/equManagementJson.do', param).then((res) =>{
            dataList.value = res.data.roomlist;
        });
    };
    onMounted(()=>{
        LRList();
    })
    </script>
    
    <style>
     .backdrop {
        display: flex;
        position: fixed;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.5);
      }
      .container {
        background: white;
        padding: 1.5rem;
        height: 50%;
      }
    </style>
    