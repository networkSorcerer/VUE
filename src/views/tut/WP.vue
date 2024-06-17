<template>
        <div> 
            <div> 
                <div> 
                    <table>
                        <tr>
                            <td>주차수</td>
                            <td>학습목표</td>
                            <td>학습내용</td>
                        </tr>
                        <tr>
                            <td>{{ week.week }}</td>
                            <td>{{ week.learn_goal }}</td>
                            <td>{{ week.learn_con}}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
</template>

<script setup>
  defineProps({
        week: Object,
    });
</script>

<style>

</style>