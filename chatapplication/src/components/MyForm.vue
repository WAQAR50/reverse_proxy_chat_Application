<script>
  import { socket } from "@/socket"; 
  import axios from 'axios';

  export default {
    name: "MyForm",
  
    data() {
      return {
        isLoading: false,
        value: "",
        chatgroup: "",
        emptyFields:""
      }
    },
  
    methods: {
      onSubmit() {
        this.isLoading = true;
        
        var username = localStorage.getItem("username")
        if(username != "") {
          let msg = username+ " : " +this.value
          socket.emit("chat message", msg, () => {
          this.isLoading = false;
          // var data = {
          //   "chatgroup": this.value
          //   }
            // axios.post('http://localhost:3000/chatgroup',data)
            //   .then(response => {
            //     if(response && response.status==200){
      
            //       console.log(JSON.stringify(response));
            //     }else{
            //         alert(response.data)
            //     }
            //   }).catch(function (error) {
            //     console.log(error);
          
            // })
          });
          this.value = '';
        }
        
        
      },
      
      loadSocket : function(){
        socket.on("chat message",function(msg) {
          console.log(msg)
           var item = document.createElement('li');
           item.textContent = msg;
           document.getElementById('messages').appendChild(item);
           window.scrollTo(0, document.body.scrollHeight);
        })
      },
      createGroup(){
        if (this.value === "") {
             this.emptyFields = true;
             alert("Please enter the message")
          } else {
          console.log(this.value)
        var data = {
            "chatgroup": this.value
        }
        axios.post('http://localhost:3000/chatgroup',data)
          .then(response => {
            if(response && response.status==200){
   
              console.log(JSON.stringify(response));
            }else{
                alert(response.data)
            }
          }).catch(function (error) {
            console.log(error);
      
        })
      }
    },

    },
    created: function(){
      this.loadSocket();
    },
    mounted () {
    axios.get('http://localhost:3000/getall')
      .then(response => {
        if(response && response.status==200){
          let arr = [];
            response.data.forEach((value, index) => {
                arr.push(value.ch_name);
                var item = document.createElement('li');
                item.textContent = value.ch_name;
                document.getElementById('messages').appendChild(item);
                window.scrollTo(0, document.body.scrollHeight);
            });

        }else{
            alert(response.data)
        }
      }).catch(function (error) {
        console.log(error);
      
    })


  }

  }


  </script>
<style>
.messagewindow {
    align-items: center;
    display: flex;
    height: 50vh;
    background-color: #fff;
 }

 div#messages {
    display: inline-block;
    padding: 30px;
}
li{
  list-style: none;
}

.chatform {
    margin-top: 10px;
}
</style>  
<template>
  
  <div class="messagewindow">
    
   
    <div id="messages"></div>
  </div>
  <div class="chatform">
    <form @submit.prevent="onSubmit">
      <input type="text" v-model="value" class="form-control" placeholder="Please enter message" required/>
      <!----<input v-model="chatgroup" type="text" class="form-control" placeholder="Please enter chat" required>-->
      <button type="submit" >Submit</button>
    </form>
  </div>
  </template>
  
  