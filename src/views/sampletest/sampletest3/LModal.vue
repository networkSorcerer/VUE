<template>
    <div class="backdrop">
        <div class="container">
            <dt>
                <br>
                <br>
                <strong style="font-size:150%; padding-left: 5%;">회원가입</strong>
                <br>
                <button type="button" class="btn btn-light" @click="$emit('closeModal', false)">닫기</button>
            </dt>
            <dd class="content">
                <div class="btn_area">
                    <br>
                    <a @click="userType('a')" class="btnType blue" id="register_instaff"><span>일반회원</span></a>
                    <a @click="userType('b')" class="btnType" id="register_outstaff"><span>강사회원</span></a>
                    <br>
                </div>
                <table class="row">
                    <caption>caption</caption>
                    <colgroup>
                        <col width="120px">
                        <col width="*">
                        <col width="100px">
                        <col width="*">
                    </colgroup>
                    <tbody>
                        <tr class="hidden">
                            <td><input type="text" name="user_type" id="user_type" /></td> 
                        </tr>
                        <tr>
                            <th scope="row">아이디<span class="font_red">*</span></th>
                            <td colspan="2"><input type="text" class="inputTxt p100" name="loginID" placeholder="숫자, 영문자 조합으로 6~20자리" v-model="user.loginID" id="registerId" /></td>
                            <td><input type="button" value="중복확인" @click="loginIdCheck()" style="width: 130px; height: 28px;" /></td>
                        </tr>
                        <tr>
                            <th scope="row">비밀번호 <span class="font_red">*</span></th>
                            <td colspan="3">
                                <input
                                    type="password"
                                    class="form-control"
                                    placeholder="숫자, 영문자, 특수문자 조합으로 8~15자리"
                                    v-model="newPwd"
                                />                            
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" style="padding: 0 0">비밀번호 확인<span class="font_red">*</span></th>
                            <td colspan="3">
                                <input
                                    type="password"
                                    class="form-control"
                                    placeholder="새 비밀번호와 동일한 비밀번호"
                                    v-model="newPwdCheck"
                                />                            
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" id="registerName_th">이름 <span class="font_red">*</span></th>
                            <td><input type="text" class="inputTxt p100" name="name" v-model="user.name" id="registerName" /></td>
                            <th scope="row" id="rggender_th">성별 <span class="font_red">*</span></th>
                            <td id="rggender_td">
                                <select name="gender_cd" v-model="user.gender_cd" id="gender_cd" style="width: 128px; height: 28px;">
                                    <option value="" selected="selected">선택</option>
                                    <option value="M">남자</option>
                                    <option value="F">여자</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">주민등록번호<span class="font_red"> *</span></th>
                            <td colspan="3">
                                <input type="text" class="inputTxt p48" name="birthday1" v-model="user.birthday1" id="birthday1" style="font-size: 15px" maxlength="6"/> - 
                                <input type="password" class="inputTxt p48" name="birthday2" v-model="user.birthday2" id="birthday2" style="font-size: 15px" maxlength="7"/>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">전화번호<span class="font_red">*</span></th>
                            <td colspan="3">
                                <input
                                type="text"
                                class="form-control"
                                placeholder="핸드폰 번호를 숫자만 입력됩니다."
                                maxlength="11"
                                v-model="user.tel"
                                @keydown="preventNotNumberInput"
                            />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">이메일<span class="font_red">*</span></th>
                            <td colspan="3">
                                <input type="text" class="inputTxt p100" name="user_email" v-model="user.user_email" id="registerEmail" />
                            </td> 
                        </tr>
                        <tr>
                            <th scope="row">우편번호<span class="font_red">*</span></th>
                            <td colspan="2"><span class="form-control textL">{{
                                user.zipcode
                            }}</span></td>
                            <td><input type="button" value="우편번호 찾기"   @click="postCodeModalFlag = true" style="width: 130px; height: 28px;" /></td>
                        </tr>
                        <tr>
                            <th scope="row">주소<span class="font_red">*</span></th>
                            <td colspan="3"><span class="form-control textL">{{
                                user.addr
                            }}</span></td>
                        </tr>
                        <tr>
                            <th scope="row">상세주소</th>
                            <td colspan="3"><input type="text" class="inputTxt p100" name="user_dt_address" v-model="user.user_dt_address" id="loginaddr1" /></td>
                        </tr>
                    </tbody>
                </table>
                <div class="btn_areaC mt30" style="margin-bottom: 50px;">
                    <a @click="RegisterVal()" class="btnType blue" id="RegisterCom" name="btn"><span>회원가입 완료</span></a>
                </div>
            </dd>
        </div>
    </div>
    <PostCodeModal
        v-if="postCodeModalFlag"
        @closeModal="postCodeModalFlag = false"
        @complete="addAddress"
    />
</template>

<script setup>
import axios from 'axios';
import PostCodeModal from "./PostCodeModal.vue";
import { validatePassword } from "@/common/validation";
import { ref } from 'vue';
import { nullcheck } from "@/common/common";
  import {
    preventNotNumberInput,
    validateEmail,
    validateTel,
  } from "@/common/validation";
  const user = ref({});


const loginID = ref('');
const name = ref('');
const gender_cd = ref('');
const birthday1 = ref('');
const birthday2 = ref('');
const tel = ref('');
const user_email = ref('');
const user_zipcode = ref('');
const user_address = ref('');
const user_dt_address = ref('');
const user_type = ref('');
const newPwd = ref('');
const newPwdCheck = ref('');



const postCodeModalFlag = ref(false);

const addAddress = (data) => {
    user.value.addr = data.address;
    user.value.zipcode = data.zonecode;
    postCodeModalFlag.value = false;
};

const userType = (data) => {
    user_type.value = data;
    console.log('이것이 바로 user_type', data);
};

const loginIdCheck = async () => {
    let param = new URLSearchParams();
    param.append('loginID', loginID.value);

    axios.post('/check_loginID', param).then((res) => {
        console.log(res);
        if (loginID.value === '') {
            alert('ID를 입력하세요');
        } else if (res.data === 0) {
            alert('가입 가능한 ID입니다');
        } else {
            alert('이미 가입된 ID입니다');
        }
    }).catch((error) => {
        console.error(error);
        alert('서버 오류가 발생했습니다.');
    });

  
};

const RegisterVal = async () => {
    let param = new URLSearchParams();
    param.append('loginID', loginID.value);
    param.append('name', name.value);
    param.append('gender_cd', gender_cd.value);
    param.append('birthday1', birthday1.value);
    param.append('birthday2', birthday2.value);
    param.append('tel', tel.value);
    param.append('user_email', user_email.value);
    param.append('user_zipcode', user_zipcode.value);
    param.append('user_address', user_address.value);
    param.append('user_dt_address', user_dt_address.value);
    param.append('user_type', user_type.value);
    param.append('newPwd', newPwd.value);
    axios.post('/register.do', param).then((res) => {
        console.log(res);

        if (!validateTel(user.value.tel)) {
        alert("올바른 전화번호를 입력해 주세요.");
        return;
    }

    if (!validateEmail(user.value.mail)) {
        alert("올바른 이메일을 입력해 주세요.");
        return;
    }

    if (!validatePassword(newPwd.value)) {
        alert("올바른 새 비밀번호를 입력해 주세요.");
        return;
    }

    if (newPwd.value !== newPwdCheck.value) {
        alert("새 비밀번호와 새 비밀번호 확인은 같아야합니다.");
        return;
    }

    let checkresult = nullcheck([
        { inval: user.value.zipcode, msg: "주소를 입력해 주세요." },
        { inval: user.value.addr, msg: "주소를 입력해 주세요." },
    ]);
    if (!checkresult) return;
        if (res.data.result === 'FAIL') {
            alert('가입에 실패 했습니다');
        } else {
            alert('가입에 성공했습니다');
        }
    }).catch((error) => {
        console.error(error);
        alert('서버 오류가 발생했습니다.');
    });
    

  }
</script>


<style scoped>
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