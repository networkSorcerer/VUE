<template>
    <div class="col-sm-4"> 왜 안나와
        <div class="card" style="min-height: 150px">
            <div class="card-body">
                <h5 class="card-title" style="text-align: center">{{ data.lec_id }}</h5>
                <p class="card-text" style="min-height: 40px">{{ data.lec_name }}</p>
                <a class="btn btn-info btn-sm" @click="$router.push(`detail/${data.lec_id}`)">상세보기</a>
            </div>
        </div>
    </div>
</template>

<script setup>
    defineProps({
        data: Object,
    });
</script>
s
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
