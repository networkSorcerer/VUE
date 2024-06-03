<template>
    <div class="col-sm-4">
        <div class="card" style="min-height: 150px">
            <div class="card-body">
                <p class="card-title" style="text-align: center">{{ data.lec_id }}</p>
                <h5 class="card-text" style="min-height: 40px">{{ data.lec_name }}</h5>
                <button @click="handleSearchStu" class="btn btn-light">학생정보</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    data: Object,
});

const emits = defineEmits(['searchStu']);

const handleSearchStu = () => {
    emits('searchStu', props.data.lec_id);
};
</script>

<style>
.col-sm-4 {
    margin-bottom: 10px;
}
.card {
    width: 100%;
}

.btn-sm {
    float: right;
}
</style>
