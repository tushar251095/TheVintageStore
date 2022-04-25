<template>
<div class="container-fluid">
    <div class="row p-3">
        <div class="col-sm-12 profilecard">
            <div class="card p-5 w-50">
                <table class="table">
                    <tr>
                        <td>
                            <img class="img-fluid ps-5 userimg" src="../assets/Images/user.png">
                        </td>
                    </tr>
                    <tr>
                        <td>
                           <h5>First Name</h5>
                        </td>
                         <td>
                           <h5>{{data.firstName}}</h5>
                        </td>
                    </tr>
                     <tr>
                        <td>
                           <h5>Last Name</h5>
                        </td>
                         <td>
                           <h5>{{data.lastName}}</h5>
                        </td>
                    </tr>
                     <tr>
                        <td>
                           <h5>Email Address</h5>
                        </td>
                         <td>
                           <h5>{{data.email}}</h5>
                        </td>
                    </tr>
                </table>
                <router-link to="/edit" class="btn btn-primary">My Trades</router-link>
            </div>
        </div>
    </div>
</div>
   
</template>
<script>
import UserServices from "@/services/userService.js";
export default {
    data(){
        return{
            data:{}
        }
    },
   created(){
     this.profile()
   },
   methods:{
     async profile() {
      await UserServices.profileService().then((data) => {
            this.data=data;
      });
    },
   }
}
</script>
<style scoped>
.profilecard{
    display: flex;
    justify-content: center;
}
.userimg{
    margin-left: 80px;
}
</style>