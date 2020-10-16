<template>
  <div class="home">
    <h1>Home</h1>
    <div class="users-list">
      <router-link v-for="user in users" :to="{name:'UserProfile', params:{userId: user.id}}" :key="user.id">
       <h4> {{ user.username }} </h4>
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {users} from "../assets/users"
export default {
  name: 'Home',
  setup(){
    return{
      users
    }
  }
}
</script>

<style lang="scss" scoped>
.home{
  padding: 50px 5%;
}
.users-list{
  
  & h4:hover{
    color:$pink;
  }
}
</style>
