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
                            <input type="text" class="form-control" v-model="props.paramObject.value.equ_name" >
                        </td>
                    </tr>
                    <tr>
                        <td>장비수 </td>
                        <td>
                            <input type="text" class="form-control"  v-model="props.paramObject.value.equ_num"> 
                        </td>
                        <td>강의실({{ props.paramObject.value.lecrm_name }})</td>
                        <td>
                            <select class="form-control" v-model="Lecture"  style="height: 50px"> 
                                <option 
                                v-for="data in dataList" 
                                :key="data.lecrm_id" 
                                :value="data.lecrm_id"
                                >{{ data.lecrm_name }} </option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>비고</td>
                        <td colspan="3">
                            <input type="text" class="form-control"  v-model="props.paramObject.value.equ_note"> 
                        </td>
                    </tr>
                </table>
            </div>
            <div> 
                <button @click="UpdateEQ()" class="btn btn-primary">수정</button> 
                <button @click="DelEQ()" class="btn btn-danger">삭제</button> 
                <button @click="$emit('closeModal', false)" class="btn btn-secondary">취소</button>
            </div>
        </div>
    </div>  
</template>

<script setup>
  import axios from "axios";
  import {ref, onMounted} from 'vue';

  const props = defineProps({
    paramObject: Object
  });


    console.log('paramObject 는 과연 나오는가 ',props.paramObject.value)
   
   
    const Lecture =ref(0);


    const dataList = ref([]);

const UpdateEQ = () =>{
    let param = new URLSearchParams();
    param.append('equ_name', props.paramObject.value.equ_name);
    param.append('equ_num',  props.paramObject.value.equ_num);
    param.append('lecrm_id',Lecture.value);
    param.append('equ_note',props.paramObject.value.equ_note);
    param.append('action', 'U');
    param.append('equ_id',props.paramObject.value.equ_id);
    axios.post('/adm/equSave.do', param).then((res) =>{
        if(res.data.result === 'S'){
            alert(res.data.resultmsg);
        }else {
            alert(res.data.resultmsg);
        }
    });
};

const DelEQ = ()=>{
    let param = new URLSearchParams();
    param.append('equ_name', props.paramObject.value.equ_name);
    param.append('equ_num',  props.paramObject.value.equ_num);
    param.append('lecrm_id',Lecture.value);
    param.append('equ_note',props.paramObject.value.equ_note);
    param.append('action', 'D');
    param.append('equ_id',props.paramObject.value.equ_id);
    axios.post('/adm/equSave.do', param).then((res) =>{
        if(res.data.result === 'S'){
            alert(res.data.resultmsg);
        }else {
            alert(res.data.resultmsg);
        }
    });
}

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