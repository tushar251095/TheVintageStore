<template>
  <div class="container-fluid">
    <h3 class="text-center mt-4">Trade Offers</h3>
    <div class="row mt-3">
      <div class="col-sm-12">
        <div v-if="offers.length > 0">
          <table class="table">
            <thead>
              <tr>
                <th>Trade ID</th>

                <th>Requester Name</th>

                <th>Requested Product</th>

                <th>Offered product</th>

                <th>Trade Status</th>

                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(trade, index) in offers" :key="index">
                <td>{{ trade._id }}</td>
                <td>{{ trade.buyer_name }}</td>
                <td @click="getProductDetails(trade.requested_product_id)">
                  <span class="cursorclass linkclass">{{
                    trade.requested_product_name
                  }}</span>
                </td>
                <td @click="getProductDetails(trade.offered_product_id)">
                  <span class="cursorclass linkclass">{{
                    trade.offered_product_name
                  }}</span>
                </td>
                <td>{{ trade.status }}</td>

                <td>
                  <button
                    class="btn btn-sm btn-success"
                    v-b-modal.confirm-modal
                    @click="openModal('accept', trade)"
                  >
                    Accept</button
                  >&nbsp;<button
                    class="btn btn-sm btn-danger"
                    v-b-modal.confirm-modal
                    @click="openModal('reject', trade)"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          <div class="border border-secondary">
            <h3 class="text-center p-5 text-secondary">No trades to display</h3>
          </div>
        </div>
      </div>
    </div>
    <b-modal id="confirm-modal" hide-header>
      <div class="text-center mt-3">
        <i
          class="fas fa-check-circle fa-5x text-success"
          v-if="offerstatus == 'accept'"
        ></i>
        <i
          class="fa-solid fa-circle-xmark fa-5x text-danger"
          v-if="offerstatus == 'reject'"
        ></i>
      </div>
      <h5 class="text-center mt-3">
        Are you sure you want to {{ offerstatus }} the offer?
      </h5>
      <template #modal-footer="{ cancel }">
        <button type="button" class="btn btn-success" @click="confirmTrade()">
          Yes
        </button>
        <b-button size="md" variant="secondary" @click="cancel()">
          No
        </b-button>
      </template>
    </b-modal>
  </div>
</template>
<script>
import EventServices from "@/services/EventServices.js";
export default {
  data() {
    return {
      offers: [],
      offerstatus: "",
      tradedetails: {},
    };
  },
  created() {
    this.getHistory();
  },
  methods: {
    getHistory() {
      EventServices.getTradeOffers().then((data) => {
        this.offers = data;
      });
    },
    getProductDetails(tradeid) {
      this.$store.dispatch("saveid", tradeid).then(() => {
        this.$router.push({
          name: "Trade",
        });
      });
    },
    confirmTrade() {
      if (this.offerstatus == "accept") {
        this.tradedetails.status = "accepted";
      } else {
        this.tradedetails.status = "rejected";
      }
      EventServices.acceptRejectStatus(this.tradedetails).then((data) => {
        if (data == true) {
          if (this.tradedetails.status == "accepted") {
            this.$toast.open({
              message: "Offer Accepted",
              type: "success",
              position: "top",
            });
          } else {
            this.$toast.open({
              message: "Offer Rejected",
              type: "error",
              position: "top",
            });
          }
        } else {
          this.$toast.open({
            message: "Updating status failed. Please try again",
            type: "error",
            position: "top",
          });
        }
        location.reload()
      });
    },
    openModal(status, details) {
      this.offerstatus = status;
      this.tradedetails = details;
    },
  },
};
</script>
<style scoped>
.cursorclass {
  cursor: pointer;
}
.linkclass {
  color: blue;
}
</style>
