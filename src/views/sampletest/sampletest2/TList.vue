<template>
  <div>
    <button @click="newStu">뉴비 입성</button>
  </div>
  <div id="list">
    <table>
      <tr>
        <th>loginID</th>
        <th>user_type</th>
        <th>user_yn</th>
        <th>name</th>
        <th>passwd</th>
        <th>tel</th>
        <th>sex</th>
        <th>mail</th>
        <th>addr</th>
        <th>join_date</th>
        <th>std_num</th>
      </tr>
      <tr v-for="student in StuList" :key="student.loginID">
        <td>{{ student.loginID }}</td>
        <td>{{ student.user_type }}</td>
        <td>{{ student.user_yn }}</td>
        <td>{{ student.name }}</td>
        <td>{{ student.passwd }}</td>
        <td>{{ student.tel }}</td>
        <td>{{ student.sex }}</td>
        <td>{{ student.mail }}</td>
        <td>{{ student.addr }}</td>
        <td>{{ student.join_date }}</td>
        <td>{{ student.std_num }}</td>
      </tr>
    </table>
  </div>
  <!-- <PaginationComponent/> -->
</template>

<script>
import axios from 'axios';
import PaginationComponent from '@/components/common/PaginationComponent.vue';


export default {
  components: { PaginationComponent },
  data() {
    return {
      StuList: [], // Corrected to initialize as an array
    };
  },
  methods: {
    getStuList() {
      let param = new URLSearchParams();
      
      axios.post('/adm/list_stu_json.do', param).then((res) => {
        this.StuList = res.data.list_stu;
      });
    },
    newStu() {
      let param = new URLSearchParams();
     
      axios.post('/adm/new_stu.do', param).then((res) => {
        if(res.data.result == 'sucess') {
          alert(res.data.msg);
        } else {
          alert(res.data.msg);
        }
      })
    }
  },
 
  mounted() {
    this.getStuList();
    this.newStu();
  }
}
</script>

<style>
/* Add your CSS styles here if needed */
</style>
