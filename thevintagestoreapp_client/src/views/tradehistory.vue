<template>
    <div class="container-fluid pb-5">
        <h3 class="text-center mt-4">Trade History</h3>
       <div class="row mt-3">
           <div class="col-sm-12">
             <div class="row">
                   <div class="col-sm-9"></div>
                   <div class="col-sm-3">
                    <label class=""><b>Filter by status: </b></label>
                  <select class="form-control" v-model="filtervalue" @change="filterTable(filtervalue)">
                    <option value="all" selected>All</option>
                   <option value="pending">Pending</option>
                   <option value="rejected">Rejected</option>
                   <option value="accepted">Accepted</option>
                   <option value="cancelled">Cancelled</option>
                 </select>
                   </div>
                    
                 </div>
               <div v-if="history.length>0">
                 
                 
                   <table class="table mt-2">
                       <thead>
                           <tr>
                               <th>Trade ID</th>
                           
                               <th>Seller Name</th>
                           
                               <th>Requested Product</th>
                          
                               <th>Offered product</th>
                           
                               <th>Trade Status</th>

                                <th>Action/Download Invoice</th>
                           </tr>
                       </thead>
                       <tbody>
                           <tr v-for="(trade,index) in history" :key="index">
                               <td>{{trade._id}}</td>
                               <td>{{trade.seller_name}}</td>
                               <td @click="getProductDetails(trade.requested_product_id)" ><span class="cursorclass linkclass">{{trade.requested_product_name}}</span></td>
                               <td @click="getProductDetails(trade.offered_product_id)"><span class="cursorclass linkclass">{{trade.offered_product_name}}</span></td>
                               <td>{{trade.status}}</td>
                               <td class="text-center text-danger" v-if="trade.status=='accepted' || trade.status=='rejected'" @click="generatePDF(trade)"><i class="fa-solid fa-download cursorclass" ></i></td>
                               <td v-else-if="trade.status=='cancelled'"><span class="text-danger">No action to perform</span></td>
                               <td v-else><button class="btn btn-sm btn-danger" @click="cancelTrade(trade._id)">cancel trade</button></td>
                           </tr>
                       </tbody>
                   </table>
               </div>
               <div v-else>
                    <div class="border border-secondary mt-2">
                        <h3 class="text-center p-5 text-secondary">No trades to display</h3>
                    </div>
               </div>
           </div>
       </div>
       <vuehtml2pdf
      :show-layout="false"
      :float-layout="true"
      :enable-download="true"
      :preview-modal="true"
      :paginate-elements-by-height="1400"
      filename="invoice"
      :pdf-quality="2"
      :manual-pagination="false"
      pdf-format="a4"
      :pdf-margin="10"
      pdf-orientation="portrait"
      pdf-content-width="800px"
      @progress="onProgress($event)"
      ref="html2Pdf"
    >
      <section slot="pdf-content">
        <Invoice :tradedetails="pdfcontent"></Invoice>
      </section>
    </vuehtml2pdf>
      
    </div>
</template>
<script>
import EventServices from "@/services/EventServices.js";
import Invoice from "../components/invoice.vue"
import vuehtml2pdf from "vue-html2pdf";
 export default {
     components:{
         Invoice:Invoice,
         vuehtml2pdf
     },
     data(){
         return{
           filtervalue:"all",
             history:[],
             pdfcontent:{},
             filterData:[]
             
         }
     },
   created(){
     this.getHistory()
   },
   methods:{
       onProgress(event) {
      console.log(`Processed: ${event} / 100`);
    },
    hasGenerated() {
      alert("PDF generated successfully!");
    },
     getHistory(){
         EventServices.getTradeHistory().then(
        (data) =>{
           this.history=data
           this.filterData=data
        }
      );
     },
     getProductDetails(tradeid){
         this.$store.dispatch("saveid", tradeid).then(() => {
        this.$router.push({
          name: "Trade",
        });
      });
     },
     generatePDF(data){
         this.pdfcontent=data
         this.$refs.html2Pdf.generatePdf();
     },
     filterTable(status){
       if(status=="all"){
         this.history=this.filterData
       }else{
          this.history=this.filterData.filter(obj => obj.status==status)
       }
     },
     cancelTrade(id){
         EventServices.cancelTrade(id).then(
        (data) =>{
            location.reload()
            if(data==true){
                this.$toast.open({
              message: "Trade cancelled successfully",
              type: "success",
              position: "top",
            });
            }else{
                this.$toast.open({
              message: "Unable to cancel. Please try again.",
              type: "error",
              position: "top",
            });
            }
           Location.reload()
        }
      );
     }
   }
}
 
</script>
<style scoped>
.cursorclass{
    cursor: pointer;
}
.linkclass{
    color: blue;
}
</style>