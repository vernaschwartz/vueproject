<template>
    <form class="create-twoot-panel" @submit.prevent="createNewTwoot" :class="{'exceeded': newTwootCharacterCount > 180}">
        <label for="newTwoot"><strong>New Twoot</strong> ({{newTwootCharacterCount}}/180)</label>
        <textarea id="newTwoot" rows="4" v-model="newTwootContent" />

        <div class="create-twoot-panel_submit">
            <div class="create-twoot-type">
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
        </div>
    </form>
</template>

<script>
export default {
  name: 'CreateTwootPanel',
  data(){
    return{
        newTwootContent: '',
        selectedTwootType: 'instant',
        twootTypes:[
            { value: 'draft', name: 'Draft'},
            { value: 'instant', name: 'Instant'}
        ],
    }
  },
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
  computed: {
    newTwootCharacterCount(){
        return this.newTwootContent.length
    }
  },
  //used for changing things like buttons and such
  methods: {
    createNewTwoot(){
        if(this.newTwootContent && this.selectedTwootType !== 'draft'){
            this.$emit('add-twoot', this.newTwootContent)
            this.newTwootContent= ''
        }
    }
  }
  /*this function runs when the app loads here it is adding one follower
  because it is running the followUser function which adds a follower*/
 /*mounted(){
    this.followUser()
  }*/
}
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
}

.create-twoot-panel{
    margin-top: 20px;
    padding: 20px 0;
    display: flex;
    flex-direction: column;

    textarea{
        border: 1px solid #DFE3E8;
        border-radius: 5px;
    }
    .create-twoot-panel_submit{
        display:flex;
        justify-content: space-between;

        .create-twoot-type{
            padding: 10px 0;
        }
    }

    &.exceeded{
        color: red;
        border-color: red;
    }
}



</style>
