<template>
    <div id="background_board">
      <div class="login_form shadow" align="center">
        <div class="login-form-right-side" style="font-size: 15px">
          <div class="top-logo-wrap">
            <!-- <img id="login-logo" src="@/assets/images/admin/login/logo_img.png" /> -->
          </div>
          <h3>로그인 해보기</h3>
          <p>로그인</p>
          <p>아아아아아 모달은 무슨 일인가</p>
        </div>
        <div class="login-form-left-side">
          <fieldset>
            <legend>로그인</legend>
            <p class="id">
              <label for="userId">아이디</label>
              <input
                v-model="loginId"
                type="text"
                placeholder="아이디"
                style="ime-mode: inactive"
                id="userId"
                ref="userId"
              />
            </p>
            <p class="pw">
              <label for="userPwd">비밀번호</label>
              <input
                v-model="pwd"
                type="password"
                placeholder="비밀번호"
                onfocus="this.placeholder=''; return true"
                id="userPwd"
                ref="userPwd"
              />
            </p>
            <p class="member_info">
              <input v-model="saveId" id="cb_saveId" type="checkbox" />
              <span class="id_save">ID저장</span>
            </p>
            <div>
              <a @click="joinM()" id="RegisterBtn" name="modal"><strong>[회원가입]</strong></a>
              <a @click="findM()"><strong>[아이디/비밀번호 찾기]</strong></a>
            </div>
            <!-- Login Btn -->
            <a class="btn_login" id="btn_login" @click="fLoginProc">
              <strong>Login</strong>
            </a>
          </fieldset>
        </div>
      </div>
      <LModal v-if="join" @closeModal="join = $event" 
      @closeAndSearch="modalClose"
      />
      <FModal v-if="find" @closeModal="find = false" 
      @closeAndSearch="modalClose"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import LModal from './LModal.vue';
  import FModal from './FModal.vue';
  
  const loginId = ref('');
  const pwd = ref('');
  const saveId = ref(false);
  const join = ref(false);
  const find = ref(false);
  
  const getCookie = (name) => {
    let cookie = document.cookie + ';';
    let idx = cookie.indexOf(name, 0);
    let val = '';
    if (idx > -1) {
      cookie = cookie.substring(idx, cookie.length);
      let begin = cookie.indexOf('=', 0) + 1;
      let end = cookie.indexOf(';', begin);
      val = unescape(cookie.substring(begin, end));
    }
    return val;
  };
  
  const setCookie = (name, value, day) => {
    let today = new Date();
    today.setDate(today.getDate() + day);
    document.cookie = `${name}=${value}; path=/; expires=${today.toUTCString()};`;
  };
  
  const fLoginProc = () => {
    setCookie('LOGIN_ID', loginId.value, saveId.value ? 7 : -1);
  
    if (loginId.value === '') {
      alert('로그인 ID를 입력하세요.');
      return false;
    } else if (pwd.value === '') {
      alert('비밀번호를 입력하세요.');
      return false;
    }
  
    const params = new URLSearchParams();
    params.append('lgn_Id', loginId.value);
    params.append('pwd', pwd.value);
    axios.post('/loginProc.do', params).then((res) => {
      let data = res.data;
      if (data.result === 'SUCCESS') {
        // Handle success
      } else {
        alert('ID 혹은 비밀번호가 틀립니다.');
      }
    }).catch((error) => {
      console.log(error);
    });
  };
  
  onMounted(() => {
    let id = getCookie('LOGIN_ID');
    loginId.value = id;
    saveId.value = id !== '';
  });
  
  const joinM = () => {
    join.value = true;
  };
  
  const findM = () => {
    find.value = true;
  };
  </script>
  <script>

</script>
  <style>
  .member_info > .id_save {
    font-size: 15px;
  }
  #login-logo {
    width: 300px;
    margin-bottom: 50px;
  }
  #cb_saveId {
    vertical-align: baseline;
    margin-right: 5px;
  }
  </style>
  