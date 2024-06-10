<template>
    <div class="backdrop" >
        <div class="container">
            <dl>
                <dt>
                    <strong>아이디/비밀번호 찾기</strong>
                </dt>
				<button type="button" class="btn btn-light" @click="$emit('closeModal', false)">닫기</button>
                <dd style="padding-bottom: 0;">
                    <div class="btn_areaC mt30">
                        <a href="javascript:fSelectId();" class="btnType gray" id="findId">
                            <span>아이디 찾기</span>
                        </a> 
                        <a href="javascript:fSelectPwd();" class="btnType gray"	id="findPwd">
                            <span>비밀번호 찾기</span>
                        </a>
                    </div>
                </dd>

                <dd class="content">
                    <div id="findForm">
                        <!-- 아이디 찾기 폼 -->
                        <table class="row" v-if="isFindIdFormVisible">
                            <caption>caption</caption>
                            <colgroup>
                                <col width="100px">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th scope="row">
                                        이름
                                    </th>
                                    <td>
                                        <input type="text" v-model="regiName" class="inputTxt p100"
                                            placeholder="가입하신 이름을 입력하세요"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        이메일
                                    </th>
                                    <td>
                                        <input type="text" v-model="emailName" class="inputTxt p100"
                                            placeholder="가입하신 이메일을 입력하세요" size="30"
                                            style="height: 30px;" /> 
                                    </td>
                                </tr>
                                <tr>
                                    <td scope="row" colspan="2" 
                                        style="border: none; text-align: center; background-color: #F3F3F3;">
                                        <a href="javascript:fMyId();" class="btnType blue" id="findIdSubmit">
                                        <span>확인</span></a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <!-- 비밀번호 찾기 폼 -->
                        <table class="row" v-if="isFindPwdFormVisible">
                            <tbody>
                                <tr>
                                    <th scope="row">
                                        아이디
                                    </th>
                                    <td>
                                        <input type="text" v-model="regiId" class="inputTxt p100"
                                            placeholder="가입하신 아이디를 입력하세요"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        이메일
                                    </th>
                                    <td>
                                        <input type="text" v-model="emailPwd" class="inputTxt p100"
                                            placeholder="가입하신 이메일을 입력하세요" size="30"
                                            style="height: 30px;" /> 
                                    </td>
                                </tr>
                                <tr>
                                    <td scope="row" colspan="2" style="border: none; text-align: center; background-color: #F3F3F3; ">
                                        <a href="javascript:fMyPw();" class="btnType blue" id="findIdSubmit"
                                            style="margin: 20;">
                                        <span>확인</span></a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </dd>
            </dl>
            
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

    const emit = defineEmits(['closeAndSearch']);
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
