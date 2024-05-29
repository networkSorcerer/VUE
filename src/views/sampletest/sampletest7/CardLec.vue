<template>
    <div class="col-sm-4">
        <div class="card" style="min-height: 150px">
            <div class="card-body">
                <p class="card-title" style="text-align: center"> {{ data.lec_id }}</p>
                <h5 class="card-text" style="min-height: 40px"> {{ data.lec_name }}</h5>
                <a class="btn btn-info btn-sm" @click="$router.push(`detail/${data.lec_id}`)">학생정보</a>
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
