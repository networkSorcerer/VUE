<template>
    <div class="backdrop" >
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
                    <a  class="btnType blue" id="register_instaff"><span>일반회원</span></a>
                    <a  class="btnType " id="register_outstaff"><span>강사회원</span></a>
                    <br>
                </div>
                <!-- s : 여기에 내용입력 -->
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
                                <td colspan="2"><input type="text" class="inputTxt p100"
                                    name="loginID" placeholder="숫자, 영문자 조합으로 6~20자리 "
									v-model="loginID"
                                    id="registerId" /></td>
                                <td><input type="button" value="중복확인"
                                    @click="loginIdCheck(loginID)" style="width: 130px; height: 28px;" /></td>
                            </tr>
                            <tr>
                                <th scope="row">비밀번호 <span class="font_red">*</span></th>
                                <td colspan="3">
                                    <input type="password"
                                    placeholder="숫자, 영문자, 특수문자 조합으로 8~15자리 " class="inputTxt p100"
                                    name="password" id="registerPwd" />
                                </td>
                            </tr>

                            <tr>
                                <th scope="row" style="padding: 0 0">비밀번호 확인<span
                                    class="font_red">*</span></th>
                                <td colspan="3">
                                    <input type="password"
                                    class="inputTxt p100" name="password1" id="registerPwdOk" />
                                </td>
                            </tr>
                            
                            <tr>
                                <th scope="row" id="registerName_th">이름 <span class="font_red">*</span></th>
                                <td><input type="text" class="inputTxt p100" name="name"
                                    id="registerName" /></td>
                            
                                <th scope="row" id="rggender_th">성별 <span class="font_red">*</span></th>
                                <td id="rggender_td">
                                <select name="gender_cd" id="gender_cd" style="width: 128px; height: 28px;">
                                        <option value="" selected="selected">선택</option>
                                        <option value="M">남자</option>
                                        <option value="F">여자</option>
                                </select></td>
                            </tr>
                            <tr>
                                <th scope="row">주민등록번호<span class="font_red"> *</span></th>
                                <td colspan="3">
                                    <input type="text" class="inputTxt p48"
                                        name="birthday1" id="birthday1" style="font-size: 15px" 
                                        maxlength="6"/> - 
                                    <input type="password" class="inputTxt p48"
                                        name="birthday2" id="birthday2" style="font-size: 15px" 
                                        maxlength="7"/>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">전화번호<span class="font_red">*</span></th>
                                <td colspan="3">
                                    <input type="text" id="tel" name="tel" placeholder="숫자만 입력"
                                    class="inputTxt p100" @input="formatPhoneNumber()" />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">이메일<span class="font_red">*</span></th>
                                <td colspan="3">
                                    <input type="text" class="inputTxt p100" name="user_email" id="registerEmail" />
                                </td> 
                            </tr>

                            
                            <tr>
                                <th scope="row">우편번호<span class="font_red">*</span></th>
                                <td colspan="2"><input type="text" class="inputTxt p100"
                                    name="user_zipcode" id="detailaddr" /></td>

                                <td><input type="button" value="우편번호 찾기"
                                    @click="execDaumPostcode()"
                                    style="width: 130px; height: 28px;" /></td>
                            </tr>
                            <tr>
                                <th scope="row">주소<span class="font_red">*</span></th>
                                <td colspan="3"><input type="text" class="inputTxt p100"
                                    name="user_address" id="loginaddr" /></td>
                            </tr>
                            <tr>
                                <th scope="row">상세주소</th>
                                <td colspan="3"><input type="text" class="inputTxt p100"
                                    name="user_dt_address" id="loginaddr1" /></td>
                            </tr>

                        </tbody>
                </table>
                    
                <div class="btn_areaC mt30" style="margin-bottom: 50px;">
                    <a @click=RegisterVal() class="btnType blue"
                        id="RegisterCom" name="btn"> <span>회원가입 완료</span></a>  
						
                </div>
            </dd>
            
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const loginID = ref('');

const loginIdCheck = () => {
    let param = new URLSearchParams();
    param.append('loginID', loginID.value);

    axios.post('/check_loginID', param).then((res) => {
		console.log(res)
        if (res.data === 0) {
            alert('가입 가능한 ID 입니다');
        } else {
            alert('다른 ID를 입력해라 ');
        }
    }).catch((error) => {
        console.error(error);
        alert('서버 오류가 발생했습니다.');
    });
};

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