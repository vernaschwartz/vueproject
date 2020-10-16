<template>
    <div class="user-profile">
        <div class="user-profile_sidebar">
            <div class="user-profile_user-panel">
                <h1 class="user-profile_username">@{{state.user.username}}</h1>
                <!--<h2>{{userId}}</h2>-->
                <div class="user-profile_admin-badge" v-if="state.user.isAdmin">
                    Admin
                </div>
                <div class="user-profile_follower-count">
                    <p><strong>Followers:</strong> {{state.followers}}</p>
                </div>
            </div>
            <CreateTwootPanel @add-twoot="addTwoot"/>
        </div>
        <div class="user-profile_twoots-wrapper">
            <TwootItem
                v-for="twoot in state.user.twoots" 
                :key="twoot.id" 
                :username="state.user.username" 
                :twoot="twoot" 
            />
        </div>
    </div>
</template>

<script>
import {reactive, computed} from 'vue'
import {useRoute} from 'vue-router'
import {users} from '../assets/users'
import TwootItem from "../components/TwootItem"
import CreateTwootPanel from "../components/CreateTwootPanel"

export default {
  name: 'UserProfile',
  components: {CreateTwootPanel, TwootItem},
  setup(){
    const route = useRoute()
    const userId = computed(()=>route.params.userId )
    const state = reactive({
      followers: 0,
      user: users[userId.value - 1] || users[0]
    })

    function addTwoot(twoot){
      state.user.twoots.unshift({id: state.user.twoots.length +1, content: twoot})
    }

    return{
      state,
      addTwoot,
      userId
    }
  },

  /* data(){
    return{
        newTwootContent: '',
        selectedTwootType: 'instant',
        twootTypes:[
            { value: 'draft', name: 'Draft'},
            { value: 'instant', name: 'Instant'}
        ],
      followers: 0,
      user:{
        id: 1,
        username: 'vernaschwartz',
        firstName: 'Verna',
        lastName: 'Schwartz',
        email: 'verna.schwartz@navient.com',
        isAdmin: true,
        twoots:[
            { id: 1, content:'Twotter is Amazing!'},
            { id: 2, content: "Don't forget to subscribe!"}
        ]
      }
    } 
  },*/
  //these watch computed methods and mounted can go in any order

  //this watches a data point and when it changes you can run a function
  /*watch:{
    followers(newFollowerCount, oldFollowercount){
      if(oldFollowercount < newFollowerCount){
        console.log(`${this.user.username} has gained a follower!`)
      }
    }
  },*/
  //goes through the data and returns what you ask of it
  /* computed: {
    fullName(){
      return `${this.user.firstName} ${this.user.lastName}`
    },
    newTwootCharacterCount(){
        return this.newTwootContent.length
    }
  }, */
  //used for changing things like buttons and such
  /*methods: {
      addTwoot(twoot){
          this.user.twoots.unshift({id:this.user.twoots.length +1, content: twoot})
      }*/
    /*followUser(){
      this.followers++
    },
    toggleFavorite(id){
        console.log(`Favorited Twoot #${id}`)
    },*/
    /*createNewTwoot(){
        if(this.newTwootContent && this.selectedTwootType !== 'draft'){
            this.user.twoots.unshift({
                id: this.user.twoots.length + 1,
                content: this.newTwootContent
            })
            this.newTwootContent = ''
        }
    }*/
  //}

  /*this function runs when the app loads here it is adding one follower
  because it is running the followUser function which adds a follower*/
  /*mounted(){
    this.followUser()
  }*/
}
</script>

<style lang="scss" scoped>
.user-profile{
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-gap: 50px;
    width: 90%;
    padding: 50px 5%;

    .user-profile_user-panel{
        display: flex;
        flex-direction: column;
        margin-right: 50px;
        padding: 20px;
        background-color: white;
        border-radius: 5px;
        border: 1px solid #DFE3E8;
        margin-bottom: auto;

        .user-profile_admin-badge{
            background: rebeccapurple;
            color: white;
            border-radius: 5px;
            margin-right: auto;
            margin-top: 10px;
            padding: 5px 10px;
            font-weight: bold;
        }

        h1{
            margin:0;
        }

        .user-profile_create-twoot-type{
            margin-top: 5px;
        }
    }

    .user-profile_twoots-wrapper{
        display: grid;
        grid-gap: 10px;
    }
   
}


</style>
