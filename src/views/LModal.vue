<template>
     <div>
        <teleport to="body">
            <div class="backdrop">
                <div class="container" style="width: 500px">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <p class="conTitle">
                                    <span>회원 가입</span>
                                </p>
                                <button>일반 회원</button>
                                <button>강사 회원</button>
                            </div>
                            <div class="modal-body">
                                <div class="input-group mb-3">
                                    <span class="input-group-text">제목</span>
                                    <input type="text" class="form-control" v-model="noticeDetail.notice_tit" />
                                </div>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">로그인 아이디</span>
                                    <input
                                        type="text"
                                        class="form-control"
                                        v-model="noticeDetail.loginID"
                                        v-if="detailProps"
                                        disabled
                                    />
                                    <input
                                        type="text"
                                        class="form-control"
                                        v-model="this.userInfo.loginId"
                                        v-else
                                        disabled
                                    />
                                </div>
                                <div class="input-group mb-3" v-show="detailProps">
                                    <span class="input-group-text">작성자</span>
                                    <input type="text" class="form-control" v-model="noticeDetail.name" disabled />
                                </div>
                                <div class="input-group mb-3" style="min-height: 200px">
                                    <span class="input-group-text">내용</span>
                                    <textarea
                                        style="resize: none"
                                        class="form-control"
                                        v-model="noticeDetail.notice_con"
                                    />
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button
                                    type="button"
                                    class="btn btn-info"
                                    @click="insertNoticeDetail"
                                    v-show="!detailProps"
                                >
                                    등록
                                </button>
                                <button
                                    type="button"
                                    class="btn btn-info"
                                    @click="updateNoticeDetail"
                                    v-show="detailProps"
                                >
                                    수정
                                </button>
                                <button
                                    type="button"
                                    class="btn btn-info"
                                    @click="deleteNoticeDetail"
                                    v-show="detailProps"
                                >
                                    삭제
                                </button>
                                <button type="button" class="btn btn-light" @click="$emit('closeModal', false)">
                                    닫기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </teleport>
    </div>
</template>

<script>
export default {

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
</style>