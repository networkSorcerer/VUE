<template>
    <div class="backdrop">
    <div class="container mt-4">
      <div class="row">
        <div class="col">
          <div class="card">
            <div class="card-header">
              <p class="mb-0"><strong>시험문제 등록</strong></p>
            </div>
            <div class="card-body">
              <form>
                <div class="mb-3 row">
                  <label class="col-sm-2 col-form-label">시험분류</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" v-model="examCategory">
                  </div>
                </div>
                <div class="mb-3 row">
                  <label class="col-sm-2 col-form-label">문제</label>
                  <div class="col-sm-10">
                    <textarea class="form-control" rows="3" v-model="question"></textarea>
                  </div>
                </div>
                <div class="mb-3 row">
                  <label class="col-sm-2 col-form-label">정답</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" v-model="answer">
                  </div>
                </div>
                <div class="mb-3 row">
                  <label class="col-sm-2 col-form-label">보기1</label>
                  <div class="col-sm-10">
                    <textarea class="form-control" rows="2" v-model="option1"></textarea>
                  </div>
                </div>
                <div class="mb-3 row">
                  <label class="col-sm-2 col-form-label">보기2</label>
                  <div class="col-sm-10">
                    <textarea class="form-control" rows="2" v-model="option2"></textarea>
                  </div>
                </div>
                <div class="mb-3 row">
                  <label class="col-sm-2 col-form-label">보기3</label>
                  <div class="col-sm-10">
                    <textarea class="form-control" rows="2" v-model="option3"></textarea>
                  </div>
                </div>
                <div class="mb-3 row">
                  <label class="col-sm-2 col-form-label">보기4</label>
                  <div class="col-sm-10">
                    <textarea class="form-control" rows="2" v-model="option4"></textarea>
                  </div>
                </div>
                <div class="mb-3 row">
                  <label class="col-sm-2 col-form-label">사용 여부</label>
                  <div class="col-sm-10">
                    <select class="form-select" v-model="isActive">
                      <option value="active">활성화</option>
                      <option value="inactive">비활성화</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
            <div class="card-footer text-end">
              <button class="btn btn-primary me-2" @click="saveQuestion">저장</button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="$emit('closeModal', false)">취소</button>
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

</style>