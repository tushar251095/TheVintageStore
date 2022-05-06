<template>
  <div class="container-fluid">
    <div class="row" v-if="comments.length > 0">
      <h5>Comments:</h5>
      <div
        class="col-sm-12 col-md-4 col-lg-3 pb-2"
        v-for="(comment, index) in comments"
        :key="index"
      >
        <div class="card maincardcomment p-3">
          <span
            ><b>{{ comment.username }}</b></span
          >
          <span class="float-end text-secondary datesize mt-1"
            ><i class="fa-solid fa-clock"></i>&nbsp;{{
              new Date(comment.postedAt) | formatDate
            }}</span
          >
          <p class="mt-1">{{ comment.comment }}</p>
          <div v-if="userid == comment.userid">
            <span @click="openeditmodel(comment)"
              ><i class="fas fa-edit text-info cursorclass"></i
            ></span>
            <span @click="opendeletemodel(comment)">
              <i class="fa fa-trash text-danger ms-3 cursorclass" aria-hidden="true"></i
            ></span>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-else>
      <h5>Comments:</h5>
      <div class="col-sm-12 p-5 border border-secondary">
        <p>Commnets are not available</p>
      </div>
    </div>
    <b-modal ref="delete-modal" hide-header>
      <img
        src="../assets/Images/delete.png"
        alt="delete icon"
        height="70"
        width="70"
        class="rounded mt-2 mx-auto d-block"
      />
      <h5 class="text-center mt-3">
        Are you sure you want to delete below comment?
      </h5>
      <h5 class="text-center text-secondary">{{ deletedetails.comment }}</h5>
      <template #modal-footer="{ cancel }">
        <b-button size="md" variant="secondary" @click="cancel()">
          Cancel
        </b-button>
        <button
          type="button"
          class="btn btn-danger"
          @click="deleteComment(deletedetails)"
        >
          Delete
        </button>
      </template>
    </b-modal>
    <b-modal ref="edit-modal" hide-header>
      <div class="text-center">
        <i class="fas fa-edit text-info fa-3x"></i>
      </div>
      <h5 class="text-center mt-3">Edit Comment</h5>
      <textarea
        v-model="editdetails.comment"
        id=""
        cols="60"
        rows="5"
        :class="{ 'is-invalid': submitted && $v.editdetails.comment.$error }"
      ></textarea>
      <div
        v-if="submitted && $v.editdetails.comment.$error"
        class="invalid-feedback"
      >
        <span v-if="!$v.editdetails.comment.required">Comment is required</span>
        <span v-if="!$v.editdetails.comment.minLength"
          >Comment must be at least 4 characters</span
        >
        <span v-if="!$v.editdetails.comment.maxLength"
          >Comment must be at atmost 40 characters</span
        >
      </div>
      <template #modal-footer="{ cancel }">
        <b-button size="md" variant="secondary" @click="cancel()">
          Cancel
        </b-button>
        <button type="button" class="btn btn-primary" @click="editComment(editdetails)">
          Edit
        </button>
      </template>
    </b-modal>
  </div>
</template>
<script>
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import EventServices from "@/services/EventServices.js";
export default {
  props: {
    product_id: String,
  },
  data() {
    return {
      submitted: false,
      comments: [],
      userid: "",
      editdetails: {
        comment: "",
      },
      deletedetails: {},
    };
  },
  validations: {
    editdetails: {
      comment: { required, minLength: minLength(4), maxLength: maxLength(40) },
    },
  },
  created() {
    this.getComments();
    this.userid = localStorage.getItem("id");
  },
  methods: {
    async getComments() {
      EventServices.getComments(localStorage.getItem("product_id")).then(
        (data) => {
          if (data) {
            this.comments = data;
          }
        }
      );
    },
    openeditmodel(data) {
      this.$refs["edit-modal"].show();
      this.editdetails = data;
    },
    opendeletemodel(data) {
      this.$refs["delete-modal"].show();
      this.deletedetails = data;
    },
    deleteComment(comment) {
      let commentobj = {};
      commentobj.product_id = localStorage.getItem("product_id");
      commentobj.id = comment.id;
      EventServices.deleteComment(commentobj).then((res) => {
        if (res == true) {
           this.getComments();
            this.$refs["delete-modal"].hide();
        } else {
          this.$toast.open({
            message: "Error deleting comment",
            type: "error",
            position: "top",
          });
        }
      });
    },
    editComment(comment) {
      this.submitted = true;
      this.$v.editdetails.comment.$touch();
      if (this.$v.editdetails.comment.$invalid) {
        return;
      }
       let commentobj = {};
      commentobj.product_id = localStorage.getItem("product_id");
      commentobj.id = comment.id;
      commentobj.comment=comment.comment
      EventServices.editComment(commentobj).then((res) => {
        if (res == true) {
          this.getComments();
           this.$refs["edit-modal"].hide();
        } else {
          this.$toast.open({
            message: "Error editing comment",
            type: "error",
            position: "top",
          });
        }
      });
    },
  },
};
</script>
