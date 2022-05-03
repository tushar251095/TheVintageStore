const mongoose= require('mongoose');
const { schema } = require('./user');
const Schema= mongoose.Schema;

//Category Schema
const categorySchema= new Schema({
    title:{type:String,required:[true,'Category title is required']},
    imageurl:{type:String, default:"/images/categorydefault.jpg"},
    category_id:{type:String,required:[true,'Category id is required']}
},
{
    timestamps:true
});


//Product Schema
const productSchema= new Schema({
  prod_name:{type:String,required:[true,'Category title is required']},
  product_id:{type:String,required:[true,'Product Id is required']},
  category_id:{type:String,required:[true,'Category is required']},
  year:{type:Number,required:[true,'year is required']},
  seller:{type:String,required:[true,'seller is required']},
  seller_id:{type:Schema.Types.ObjectId,ref:'User',required:[true,'seller is required']},
  ratings:{type:Number,default:0},
  description:{type:String,required:[true,'Description is required']},
  product_img_url:{type:String,default:"https://github.com/tushar251095/TheVintageStore_V2/blob/main/thevintagestoreapp_client/src/assets/Images/no-image.jpg?raw=true"},
  product_status:{type:String,default:"Available"},
  view_count:{type:Number,default:0},
},
{
  timestamps:true
});

//creating model object
let Category = mongoose.model('Category',categorySchema);
let Product = mongoose.model('Product',productSchema);

module.exports = {
  Category, Product
}