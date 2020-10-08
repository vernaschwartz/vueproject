<template>
    <div class="user-profile">
        <div class="user-profile_user-panel">
            <h1 class="user-profile_username">@{{user.username}}</h1>
            <div class="user-profile_admin-badge" v-if="user.isAdmin">
                Admin
            </div>
            <div class="user-profile_follower-count">
                <p><strong>Followers:</strong> {{followers}}</p>
            </div>
            <form class="user-profile_create-twoot" @submit.prevent="createNewTwoot">
                <label for="newTwoot"><strong>New Twoot</strong></label>
                <textarea id="newTwoot" rows="4" v-model="newTwootContent" />

                <div class="user-profile_create-twoot-type">
                    <label for="newTwootType"><strong>Type: </strong></label>
                    <select id="newTwootType" v-model="selectedTwootType" >
                        <option :value="option.value" v-for="(option, index) in twootTypes" :key="index" >
                            {{option.name}}
                        </option>
                    </select>
                </div>
                <button v-if="selectedTwootType === 'instant'">
                    Twoot!
                </button>
                <button v-else disabled>
                    Twoot!
                </button>
            </form>
        </div>
        <div class="user-profile_twoots-wrapper">
            <TwootItem
                v-for="twoot in user.twoots" 
                :key="twoot.id" 
                :username="user.username" 
                :twoot="twoot" 
                @favorite="toggleFavorite" 
            />
        </div>
    </div>
</template>

<script>
import TwootItem from "./TwootItem"

export default {
  name: 'UserProfile',
  components: {TwootItem},
  data(){
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
  },
  //these watch computed methods and mounted can go in any order

  //this watches a data point and when it changes you can run a function
  watch:{
    followers(newFollowerCount, oldFollowercount){
      if(oldFollowercount < newFollowerCount){
        console.log(`${this.user.username} has gained a follower!`)
      }
    }
  },
  //goes through the data and returns what you ask of it
  computed: {
    fullName(){
      return `${this.user.firstName} ${this.user.lastName}`
    }
  },
  //used for changing things like buttons and such
  methods: {
    followUser(){
      this.followers++
    },
    toggleFavorite(id){
        console.log(`Favorited Twoot #${id}`)
    },
    createNewTwoot(){
        if(this.newTwootContent && this.selectedTwootType !== 'draft'){
            this.user.twoots.unshift({
                id: this.user.twoots.length + 1,
                content: this.newTwootContent
            })
            this.newTwootContent = ''
        }
    }
  },
  /*this function runs when the app loads here it is adding one follower
  because it is running the followUser function which adds a follower*/
  mounted(){
    this.followUser()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
}
button{
  max-width: 60px;
  height:30px;
  background-color:#ff9999;
  color: white;
  font-size: 14px;
  border: .5px solid rgb(255,153,153, 0.50);
  box-shadow: 5px -2px 8px -2px rgba(211,211,211,0.79);
  border-radius: 4px;
  margin: 10px 0px;
  cursor: pointer;
}
button:focus {
    outline: none;
    border: .5px solid rgb(255,153,153, 0.50);

}
button:active{
    border: .5px solid rgb(255,153,153, 0.50);
    box-shadow:none;
    outline:none;
}
button:hover{
    box-shadow:none;
    background-color:rgb(255,153,153,0.85);
}
button:disabled{
    background-color: gray;
    border: gray;
    cursor:default;
}

.user-profile{
    display: grid;
    grid-template-columns: 1fr 3fr;
    width: 90%;
    padding: 50px 5%;
}

.user-profile_user-panel{
    display: flex;
    flex-direction: column;
    margin-right: 50px;
    padding: 20px;
    background-color: white;
    border-radius: 5px;
    border: 1px solid #DFE3E8;
}

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

.user-profile_twoots-wrapper{
    display: grid;
    grid-gap: 10px;
}
.user-profile_create-twoot{
    padding-top: 20px;
    display: flex;
    flex-direction: column;
}
.user-profile_create-twoot-type{
    margin-top: 5px;
}
</style>
