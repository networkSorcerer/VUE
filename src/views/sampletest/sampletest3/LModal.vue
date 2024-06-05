<template>
     <div>
        <teleport to="body">
            <div class="backdrop">
                <div class="container" style="width: 500px">
                    <div class="modal-dialog">
                      <button type="button" class="btn btn-light" @click="$emit('closeModal', false)">닫기</button>
                        <div class="modal-content">
                           <table>
                            <tr>
                              <td>1</td>
                              <td>2</td>
                              <td>3</td>
                              <td>4</td>
                              <td>5</td>
                            </tr>
                            <tr>
                              <td>123123123123123</td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </tr>
                            <tr>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </tr>
                            <tr>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </tr>
                           </table>
                        </div>
                    </div>
                </div>
            </div>
        </teleport>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['detailProps', 'functionProps', 'emitProps'],
  data() {
    return {
      
    }
  },
  methods: {
    joinMemer() {
      let param = new URLSearchParams();
    }
  }
}
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
table {
    width: 100%;
    border-collapse: collapse; /* 셀 간의 간격을 없애줌 */
  }

  th, td {
    border: 1px solid black; /* 셀 경계선 추가 */
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2; /* 헤더 배경색 */
  }
</style>