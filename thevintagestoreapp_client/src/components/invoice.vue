<template>
    <div>
        <img
              src="../assets/Images/logo.png"
              class="float-start ms-4 logoimg"
              alt="logo"
            />
            <h4 class="pt-3 text-dark">The Vintage Store</h4>
            <hr>
        <h4 class="text-center">Invoice</h4>
        <div class="d-flex justify-content-center">
            <table class="table table-bordered w-50 mt-3">
                <tbody>
                    <tr>
                        <th>Trade ID</th>
                        <td>{{tradedetails._id}}</td>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <td>{{tradedetails.buyer_name}}</td>
                    </tr>
                    <tr>
                        <th>Product requested</th>
                        <td>{{tradedetails.requested_product_name}}</td>
                    </tr>
                     <tr>
                        <th>Product offered</th>
                        <td>{{tradedetails.offered_product_name}}</td>
                    </tr>
                    <tr>
                        <th>Seller Name</th>
                        <td>{{tradedetails.seller_name}}</td>
                    </tr>
                    <tr>
                        <th>Trade Status</th>
                        <td>{{tradedetails.status}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p class="ms-3">*This is computer generated invoice. Cannot be used for offical purposes.</p>
    </div>
</template>
<script>
export default{
    props: {
    tradedetails: {
        _id:"",
        buyer_name:"",
        seller_name:"",
        offered_product_name:"",
        requested_product_name:"",
        status:""

    }
  },
    data(){
        return{

        }
    },
}
</script>
