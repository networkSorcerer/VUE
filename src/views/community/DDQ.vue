<template>
<div class="backdrop"> 
    <div class="container"> 
        <div> 
            <div> 
                <div> 
                    <table>
                        <tr>
                            <td>제목</td>
                            <td><input type="text" v-model="props.qna_title"></td>
                        </tr>
                        <tr>
                            <td>내용</td>
                            <td><input type="text" v-model="props.qna_con"></td>
                        </tr>
                    </table>
                </div>
            </div>
            <div> 
                <button @click="UpdateQNA()">등록</button>
            </div>
            <div> 
                <button class="btn btn-light" @click="$emit('closeModal', false)">취소</button>
            </div>
        </div>
    </div>
</div>  
</template>

<script setup>
import axios from "axios";

const props = defineProps({
    qna_id: Number,
    qna_title: String,
    qna_con: String 
});
const emit = defineEmits(['closeModal', 'QNA']);

const UpdateQNA =() => {
    let param = new URLSearchParams();
    param.append('qna_id',props.qna_id);
    param.append('qna_title', props.qna_title);
    param.append('qna_con',props.qna_con);
    axios.post('/qnaModify.do', param).then((res) => {
        if(res.data.result === true) {
            alert(res.data.msg);
        } else {
            alert(res.data.msg);
        }
        emit('closeModal', false);
            emit('QNA');
    });
};




</script>

<style>
  .backdrop {
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    width: flex;
    height: flex;
    background: rgba(255, 255, 255, 0.5);
  }
  .container {
    background: white;
    padding: 1.5rem;
    height: 50%;
  }
</style>