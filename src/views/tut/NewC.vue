<template>
    <div class="backdrop">
      <div class="container">
        <div>
          <div>
            <div>
              <div>
                <p>수강상담 관리</p>
              </div>
              <div>
                <table class="table">
                  <tr>
                    <td>과정명</td>
                    <td colspan="3"><input type="text" class="form-control"></td>
                  </tr>
                  <tr>
                    <td>학생명</td>
                    <td colspan="3"><input type="text" class="form-control"></td>
                  </tr>
                  <tr>
                    <td>상담일자</td>
                    <td><input type="text" class="form-control"></td>
                    <td>상담장소</td>
                    <td><input type="text" class="form-control"></td>
                  </tr>
                  <tr>
                    <td>최종 수정일자</td>
                    <td><input type="text" class="form-control"></td>
                    <td>상담자</td>
                    <td><input type="text" class="form-control"></td>
                  </tr>
                  <tr>
                    <td colspan="4">
                      <textarea class="form-control"></textarea>
                    </td>
                  </tr>
                </table>
              </div>
              <div>
                <button class="btn btn-primary">수정</button>
                <button class="btn btn-danger">삭제</button>
                <button @click="$emit('closeModal', false)" class="btn btn-secondary">취소</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style>
  .backdrop {
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* 반투명한 배경 */
  }
  
  .container {
    padding: 1rem;
  }
  
  .table {
    width: 100%;
    margin-bottom: 1rem;
    background-color: #fff;
  }
  
  .btn {
    margin-right: 0.5rem;
  }
  </style>
  