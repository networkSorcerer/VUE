<template>
  <div>
    <div class="backdrop">
      <div class="container" style="width: 500px"> 
        <div  class="modal-dialog"> 
          <div class="modal-content"> 
            <div> 
              <div class="modal-student"> 
                <table>
                  <tr>
                    <td>ID</td>
                    <td>{{ }}</td>
                    <td>학번</td>
                    <td>{{  }}</td>
                  </tr>
                  <tr>
                    <td>이름</td>
                    <td>{{  }}</td>
                    <td>생년월일</td>
                    <td>{{  }}</td>
                  </tr>
                  <tr>
                    <td>전화번호</td>
                    <td>{{  }}</td>
                    <td>성별</td>
                    <td>{{  }}</td>
                  </tr>
                  <tr>
                    <td colspan="4">이메일</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td colspan="4">주소</td>
                    <td></td>
                  </tr>
                </table>
              </div>
              <div> 
                <p>수강 내역</p>
                <button>수강등록</button>
              </div>
              <div> 
                <table>
                  <tr>
                    <td>강의ID</td>
                    <td>강의명</td>
                    <td>기간</td>
                    <td>상태</td>
                    <td>상태</td>
                  </tr>
                  <tr>
                    <td>강의ID</td>
                    <td>강의명</td>
                    <td>기간</td>
                    <td>상태</td>
                    <td>상태</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

//상위 객체에서 가져온 메소드를 실행하기 위함 
const emit = defineEmits(['closeAndSearch']);

  const props = defineProps({
    std_num: Number,
    loginID: Number    
  });
  
//학생 상세 정보를 출력하기 위한 변수
const student = ref(new Object());

//학생의 상세 정보를 출력
  const getStudent = () => {
    let param = new URLSearchParams();
    param.append('std_num', props.std_num);
    axios.post('/adm/list_std_json.do', param).then((res) => {
      student.value = res.data.list_std; 
    });
  }

//훅을 걸어서 메소드 작동
  onMounted(() => {
    props.std_num ? getStudent() : null; 
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
    height: 70%;
}
</style>