<template>
    <div class="col-sm-4">
        <div class="card" style="min-height: 150px">
            <div class="card-body">
                <h5 class="card-title" style="text-align: center">{{ data.name }}</h5>
                <p class="card-text" style="min-height: 40px">{{  }}</p>
                <a class="btn btn-info btn-sm">상세보기</a>
            </div>
        </div>
    </div>
</template>

<script setup>
    defineProps({
        data: Object,
    });
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
