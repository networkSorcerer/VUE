<template>
    <div>
        <teleport to="body">
            <div class="backdrop">
                <div class="container" style="width: 500px">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <p class="conTitle">
                                    <span>상세정보</span>
                                </p>
                            </div>
                            <div class="modal-body">
                                <div class="input-group mb-3">
                                    <span class="input-group-text">제목</span>
                                    <input type="text" class="form-control"  />
                                </div>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">로그인 아이디</span>
                                    <input
                                        type="text"
                                        class="form-control"
                                       
                                        disabled
                                    />
                                    <input
                                        type="text"
                                        class="form-control"
                                        disabled
                                    />
                                </div>
                                <div class="input-group mb-3" v-show="detailProps">
                                    <span class="input-group-text">작성자</span>
                                    <input type="text" class="form-control" disabled />
                                </div>
                                <div class="input-group mb-3" style="min-height: 200px">
                                    <span class="input-group-text">내용</span>
                                    <textarea
                                        style="resize: none"
                                        class="form-control"
                                    />
                                </div>
                            </div>
                            <div class="modal-footer">
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
import axios from 'axios';

export default {
    props: ['detailProps', 'functionPros', 'emitProps'],
    data() {
        return {
            noticeDetail: {},
        };
    },
    computed: {
        userInfo() {
            return this.$store.getters.getLoginInfo;
        },
    },
    methods: {
        getTutorDetail() {
            let param = new URLSearchParams();
            param.append('loginID', this.detailProps);

            axios.post('/adm/list_tut_json.do', param).then((res) => {
                this.tutorDetail = res.data.selinfo;
            });
        },

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
  </style>