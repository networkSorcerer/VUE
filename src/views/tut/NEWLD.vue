<template>
    <div class="backdrop">
      <div class="modal-dialog modal-dialog-centered"> 
        <div class="modal-content"> 
          <div class="modal-header">
            <h5 class="modal-title">자료 등록</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body"> 
            <table class="table">
              <tr>
                <td>제목</td>
                <td><input type="text" class="form-control"></td>
              </tr>
              <tr>
                <td>등록일자</td>
                <td><input type="text" class="form-control"></td>
              </tr>    
              <tr> 
                <td>자료내용</td>
                <td colspan="3"><input type="text" class="form-control"></td>
              </tr>
              <tr>
                <td>첨부파일</td>
                <td colspan="3"><input type="file" class="form-control"></td>
              </tr>
            </table>
          </div>
          <div class="modal-footer"> 
            <button type="button" class="btn btn-primary" @click="NewLD">등록</button>
            <button type="button" class="btn btn-danger">삭제</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="$emit('closeModal', false)">취소</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import axios from 'axios';
import {ref} from 'vue';

const NewLD = () =>{
    let param = new URLSearchParams();
    
    axios.post('/tut/saveLearningMaterials.do', param).then((res) =>{

    })
}

  </script>
  
  <style>
    backdrop {
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
    }
    .modal-dialog {
      width: 100%;
      max-width: 600px;
      margin: auto;
    }
  </style>
  