<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-center">
       <h1>
         Movies
       </h1> 
    </nav>
<div class="row mr-0">
  <div class="col-md-4"></div>
  <div class="col-md-4 col-sm-6">
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="Search" @input="search" aria-describedby="basic-addon1" v-model="title">
    </div>
    <div class="list-group" v-if="dispSug">
      <a class="list-group-item list-group-item-action" v-for="(match, index) in bestmatches"  :key="index" @click="add(match.Title)">{{ match.Title }}</a>
    </div>
    </div>
</div>
<div class="row mr-0">
    <div class="col-md-4">
    <div class="input-group mb-3">
    <input type="text" class="form-control" placeholder="Title" aria-label="Username" aria-describedby="basic-addon1" v-model="playName">
    <button type="button" class="btn btn-primary" @click="createPlaylist">Create Playlist</button>
    </div> 
  </div>
  <div class="col-md-4"></div>
  <div class="col-4" v-if="dispDesc">
    <div class="input-group mb-3">
    <input type="text" class="form-control" placeholder="Name of Playlist" aria-label="Username" aria-describedby="basic-addon1" v-model="listName">
    <button type="button" class="btn btn-primary" @click="addtoplay">Add to Playlist</button>
    </div> 
  </div>
</div>
<div class="row">
  <div class="col-md-1"></div>
<div class="card col-md-4" v-if="dispDesc">
  <img :src="movie.Poster" class="card-img-top" >
  <div class="card-body">
  <h1>{{movie.Title}}</h1>
  <p> Released : {{ movie.Released }}</p>
  <p> Genre : {{ movie.Genre }}</p>
  <p> Writer : {{ movie.Writer }}</p>
  <p> Director : {{ movie.Director }}</p>
  <p> Plot : {{ movie.Plot }}</p>
  <p> IMDB : {{ movie.imdbRating }}</p>
</div>
</div>
<div class="col-md-2"></div>
 <!-- <h2 v-if="playList.length">PlayLists :</h2>  -->
<div class="col-md-4">
<table class="table" v-for="(name,index) in Object.keys(playList)" :key="index" >
  <thead>
    <h2>{{ name }}</h2>
    <p><a class="pl" @click="delList(name)">Delete Playlist</a></p>
    <tr>
      <th scope="col">Title</th>
      <th scope="col">Year</th>
      <th scope="col">IMDB</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(list, ind) in playList[name]"  :key="ind">
      <td>{{list.Title}}</td>
      <td>{{list.Year}}</td>
      <td>{{list.imdbRating}}</td>
      <td><a class="pl-5" type="character" @click="remove(playList[name],list.Title)">Remove</a> </td>
    </tr>
  </tbody>
</table>
</div>
<div class="col-md-1"></div>
</div>
</template>
<script>
import VueApexCharts from 'vue-apexcharts'
import axios from 'axios'
export default {
  components:{
    VueApexCharts
  },
  data(){
    return{
      dispSug:true,
      dispDesc:false,
      movie:{},
      title:"",
      bestmatches:[],
      img:"",
      playList:{},
      playName:"",
      listName:""
    }
  },
  mounted(){
      if(localStorage.getItem('playList'))
      {
          this.playList=JSON.parse(localStorage.getItem('playList')) 
      }
  },
  methods:{
     async search() {
       this.dispSug=true
       this.dispDesc=false
          let {data}=await axios.get("http://www.omdbapi.com/?apikey=d56538b2&s=" +this.title)
          this.bestmatches=data.Search
          console.log(data.Search);    
},
async add(e){
  let {data}=await axios.get("http://www.omdbapi.com/?apikey=d56538b2&t=" +e)
     this.movie=data
     this.dispSug=false
     this.dispDesc=true
     console.log(this.movie.Poster);
},
  createPlaylist(){
    if(this.playName){
    this.playList[this.playName]=[]
    }
     console.log(this.playList);
  localStorage.setItem('playList',JSON.stringify(this.playList))
},
addtoplay(){
  if(this.playList[this.listName]==null)
  {
    alert("Playlist not defined !!")
  }
  let flag=0;
  this.playList[this.listName].forEach(element => {
      if(element.Title == this.movie.Title){
        flag=1;
      }
  });
  if(flag==1){
    alert("Already exists")
  }
  else{
    this.playList[this.listName].push(this.movie)
  }
  console.log(this.playList);
  localStorage.setItem('playList',JSON.stringify(this.playList))
},
remove(list,title){
  let a = list.findIndex((movie => {
          return movie.Title == title;
        }))
        list.splice(a,1)
        localStorage.setItem('playList',JSON.stringify(this.playList))
},
delList(name){
        delete this.playList[name]
        localStorage.setItem('playList',JSON.stringify(this.playList))
}
}
}
</script>

