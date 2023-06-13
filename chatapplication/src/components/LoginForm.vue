
<style>
body{
   background-color: red;
   background-image: url("../assets/login.jpg");
   background-size: cover;
}
p {
    line-height: 1rem;
               }
input.btn.btn-primary,button {
    width: auto;
    text-align: right;
    align-items: revert;
    background: #0091EA;
    border: 0px;
    border-radius: 5px;
    padding: 10px 30px;
    color: #fff;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
}
 .card {
    padding: 20px;
    width: 100%;
    text-align: center;
 }
 
  input{
     
       margin-bottom: 20px;
       width: 100%;
       box-shadow: none;
       padding: 15px;
       display: block;
       border: none;
      border-radius: 5px;
      font-size: 16px;
    
 }
 
 .login-page {
    align-items: center;
    display: flex;
    height: 100vh;
 }
   
 
    h1 {
       margin-bottom: 1.5rem;
       color: #fff;
      font-weight: bold;
      text-transform: uppercase;
    }
 
 
 .error {
    animation-name: errorShake;
    animation-duration: 0.3s;
 }
 
 @keyframes errorShake {
    0% {
       transform: translateX(-25px);
    }
    25% {
       transform: translateX(25px);
    }
    50% {
       transform: translateX(-25px);
    }
    75% {
       transform: translateX(25px);
    }
    100% {
       transform: translateX(0);
    }
 }
 </style>
 <template>
   
    <div class="login-page">
 
      <div class="card login" v-bind:class="{ error: emptyFields }">
         <h1>Login</h1>
         <!-- <form class="form-group"> -->
            <input v-model="username" type="text" class="form-control" placeholder="Please enter name" required>
            <input type="submit" class="btn btn-primary" @click="doLogin">
            
         
         <!-- </form> -->
      </div>
    </div>
 
</template>


<script>
import { socket } from "@/socket"; 

 import axios from 'axios';
 
export default {
    name: "LoginForm",
  
    data() {
      return {
         
       username: "",
       emptyFields:"",

      }
    },

    mounted() {
      if (localStorage.username) {
         this.username = localStorage.username;
      }
      
   },
    methods: {
       doLogin() {
          if (this.username === "") {
             this.emptyFields = true;
             alert("Please enter the Name for start the chat")
          } else {
            var data = {
               "user": this.username
            };
            // axios.post('http://localhost:3000/login',data).then(function (response) {
            //       console.log(JSON.stringify(response.data));
            //       })
            //       .catch(function (error) {
            //       console.log(error);
            //       });
           axios
               .post('http://localhost:3000/login',data)
               .then(response => {
                  if(response && response.status==200){
                     localStorage.username = this.username
                     var username = localStorage.getItem("username")
                     if(username != "") {
                        socket.connect();
                        this.$router.push({ path: "about" })
                     }
                  }else{
                     alert(response.data)
                  }
               }).catch(function (error) {
                  console.log(error);
                  });
              

          }
       },
       
    },
   
 }
</script>
