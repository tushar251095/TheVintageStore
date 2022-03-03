const { v4: uuidv4 } = require('uuid');
// const Categories = []
// const Product_data=[]
const Categories = [
    {
      title: "Clothing",
      imageurl:
        "https://github.com/tushar251095/TheVintageStore/blob/main/Images/vintagedresses.jpg?raw=true",
      category_id: 1,
      subtype: [],
    },
    {
      title: "Paintings",
      imageurl:
        "https://github.com/tushar251095/TheVintageStore/blob/main/Images/vintagepaintings.jpg?raw=true",
      category_id: 2,
      subtype: [],
    },
    {
      title: "Furniture",
      imageurl:
        "https://github.com/tushar251095/TheVintageStore/blob/main/Images/vintagefurniture.jpg?raw=true",
      category_id: 3,
      subtype: [],
    },
    {
      title: "Cars",
      imageurl:
        "https://github.com/tushar251095/TheVintageStore/blob/main/Images/vintagecars.jpg?raw=true",
      category_id: 4,
      subtype: [],
    },
  ];

  
  
  const Product_data = [
    {
      prod_name: "The A LINE Vintage Dress",
      product_id: 1,
      category_id: 1,
      year: 1960,
      seller: "Tushar Vijay Nemade",
      seller_id: 1,
      ratings: 3,
      description:
        "May as well start with letter A. Popular in the 1960s, as the name implies this simple sleeveless dress gets wider towards the hem so that the skirt finishes up broader than the shoulders in an obvious A shape. The simplistic silhouette is an ideal blank canvas for vibrant highly patterned fabrics. Many sixties knee-length dresses can be found with this silhouette.",
      product_img_url:
        "https://github.com/tushar251095/TheVintageStore/blob/main/Images/productimage.png?raw=true",
      product_status: "available",
      view_count:10
    },
    {
      prod_name: "The Empire Line Vintage Dress",
      product_id: 2,
      category_id: 1,
      year: 1960,
      seller: "Tushar Vijay Nemade",
      seller_id: 1,
      ratings: 4,
      description:
        "The look became popular during the 1780s in Europe when women were inspired by the dresses they saw in classical art. Napoleon Bonaparte's first wife, Empress Josephine, was a fan of the style and the name 'Empire' comes from this look's popularity during the first French Empire",
      product_img_url:
        "https://github.com/tushar251095/TheVintageStore/blob/main/Images/empirelinedress.jpg?raw=true",
      product_status: "available",
      view_count:3
    },
    {
      prod_name: "The Fit and Flare Dress",
      product_id: 3,
      category_id: 1,
      year: 1960,
      seller: "Tushar Vijay Nemade",
      seller_id: 1,
      ratings: 3,
      description:
        "A classic vintage or retro dress style that has remained popular through most decades from the 1940s onwards.  This flattering dress suits most figure types and is one of my own favourites.  The fit and flare dress usually has a simple bodice with darts from the waist into the bust-line.  The necklines vary - round, square, sweetheart necklines to name a few.  The skirt is flat over the tummy and flares out with extra fabric towards the hem.  If laid flat the skirt would be half-circle, commonly known as a semi-circle skirt or a full-circle skirt.  This style of vintage dress is often associated with 1940's and 1950s dances.  If the skirt extends from a higher than the natural waistline it is usually called a Swing dress. This cut allows lots of movement potential…. the dress will “swing” when you walk or dance!",
      product_img_url:
        "https://github.com/tushar251095/TheVintageStore/blob/main/Images/fitnflatedress.jpg?raw=true",
      product_status: "available",
      view_count:3
    },
    {
      prod_name: "Vinatge Abstarct Painting",
      product_id: 4,
      category_id: 2,
      year: 1960,
      seller: "Tushar Vijay Nemade",
      seller_id: 1,
      ratings: 3,
      description:
        "This is a wonderfully cheery architectural abstract painting by Robert Daniels.\n On the back of the painting it says “Webster Ave #3” which we assume is the title.\n The frame on this is maple and in great condition apart from the bottom right corner where it has separated a bit. See photo.\nThere is craquelure on this piece which is expected with a painting over a certain age.",
      product_img_url:
        "https://github.com/tushar251095/TheVintageStore/blob/main/Images/abstractpainting.jpg?raw=true",
      product_status: "available",
      view_count:1
    },
    {
      prod_name: "Yellow Red Blue Painting",
      product_id: 5,
      category_id: 2,
      year: 1960,
      seller: "Tushar Vijay Nemade",
      seller_id: 1,
      ratings: 3,
      description:
        "May as well start with letter A. Popular in the 1960s, as the name implies this simple sleeveless dress gets wider towards the hem so that the skirt finishes up broader than the shoulders in an obvious A shape. The simplistic silhouette is an ideal blank canvas for vibrant highly patterned fabrics. Many sixties knee-length dresses can be found with this silhouette.",
      product_img_url:
        "https://github.com/tushar251095/TheVintageStore/blob/main/Images/yellowredpainting.jpg?raw=true",
      product_status: "available",
      view_count:0
    },
    {
      prod_name: "Starry Night by Vincent Gogh",
      product_id: 6,
      category_id: 2,
      year: 1960,
      seller: "Tushar Vijay Nemade",
      seller_id: 1,
      ratings: 3,
      description:
        "May as well start with letter A. Popular in the 1960s, as the name implies this simple sleeveless dress gets wider towards the hem so that the skirt finishes up broader than the shoulders in an obvious A shape. The simplistic silhouette is an ideal blank canvas for vibrant highly patterned fabrics. Many sixties knee-length dresses can be found with this silhouette.",
      product_img_url:
        "https://github.com/tushar251095/TheVintageStore/blob/main/Images/starynightpainting.jpg?raw=true",
      product_status: "available",
      view_count:15
    },
    {
      prod_name: "Edwardian chair",
      product_id: 7,
      category_id: 3,
      year: 1960,
      seller: "Tushar Vijay Nemade",
      seller_id: 1,
      ratings: 3,
      description:
        "May as well start with letter A. Popular in the 1960s, as the name implies this simple sleeveless dress gets wider towards the hem so that the skirt finishes up broader than the shoulders in an obvious A shape. The simplistic silhouette is an ideal blank canvas for vibrant highly patterned fabrics. Many sixties knee-length dresses can be found with this silhouette.",
      product_img_url:
        "https://github.com/tushar251095/TheVintageStore/blob/main/Images/edwardiancharir.jpg?raw=true",
      product_status: "available",
      view_count:12
    },
    {
      prod_name: "Trumpet Tables",
      product_id: 8,
      category_id: 3,
      year: 1960,
      seller: "Tushar Vijay Nemade",
      seller_id: 1,
      ratings: 3,
      description:
        "May as well start with letter A. Popular in the 1960s, as the name implies this simple sleeveless dress gets wider towards the hem so that the skirt finishes up broader than the shoulders in an obvious A shape. The simplistic silhouette is an ideal blank canvas for vibrant highly patterned fabrics. Many sixties knee-length dresses can be found with this silhouette.",
      product_img_url:
        "https://github.com/tushar251095/TheVintageStore/blob/main/Images/trumpetable.jpg?raw=true",
      product_status: "available",
      view_count:10
    },
    {
      prod_name: "Hoosier Cabinet",
      product_id: 9,
      category_id: 3,
      year: 1960,
      seller: "Tushar Vijay Nemade",
      seller_id: 1,
      ratings: 3,
      description:
        "May as well start with letter A. Popular in the 1960s, as the name implies this simple sleeveless dress gets wider towards the hem so that the skirt finishes up broader than the shoulders in an obvious A shape. The simplistic silhouette is an ideal blank canvas for vibrant highly patterned fabrics. Many sixties knee-length dresses can be found with this silhouette.",
      product_img_url:
        "https://github.com/tushar251095/TheVintageStore/blob/main/Images/hoosiercabinet.jpg?raw=true",
      product_status: "available",
      view_count:3
    },
    {
      prod_name: "Jaguar E-Type",
      product_id: 10,
      category_id: 4,
      year: 1960,
      seller: "Tushar Vijay Nemade",
      seller_id: 1,
      ratings: 3,
      description:
        "May as well start with letter A. Popular in the 1960s, as the name implies this simple sleeveless dress gets wider towards the hem so that the skirt finishes up broader than the shoulders in an obvious A shape. The simplistic silhouette is an ideal blank canvas for vibrant highly patterned fabrics. Many sixties knee-length dresses can be found with this silhouette.",
      product_img_url:
        "https://github.com/tushar251095/TheVintageStore/blob/main/Images/jaguareEtype.jpg?raw=true",
      product_status: "available",
      view_count:5
    },
    {
      prod_name: "Chevrolet Corvette",
      product_id: 11,
      category_id: 4,
      year: 1960,
      seller: "Tushar Vijay Nemade",
      seller_id: 1,
      ratings: 3,
      description:
        "May as well start with letter A. Popular in the 1960s, as the name implies this simple sleeveless dress gets wider towards the hem so that the skirt finishes up broader than the shoulders in an obvious A shape. The simplistic silhouette is an ideal blank canvas for vibrant highly patterned fabrics. Many sixties knee-length dresses can be found with this silhouette.",
      product_img_url:
        "https://github.com/tushar251095/TheVintageStore/blob/main/Images/corvettecar.jpg?raw=true",
      product_status: "available",
      view_count:3
    },
    {
      prod_name: "Porsche 911",
      product_id: 12,
      category_id: 4,
      year: 1960,
      seller: "Tushar Vijay Nemade",
      seller_id: 1,
      ratings: 3,
      description:
        "May as well start with letter A. Popular in the 1960s, as the name implies this simple sleeveless dress gets wider towards the hem so that the skirt finishes up broader than the shoulders in an obvious A shape. The simplistic silhouette is an ideal blank canvas for vibrant highly patterned fabrics. Many sixties knee-length dresses can be found with this silhouette.",
      product_img_url:
        "https://github.com/tushar251095/TheVintageStore/blob/main/Images/porsche911.jpg?raw=true",
      product_status: "available",
      view_count:5
    },
  ];

//function to find object index by id
function FIndByID(id, dataArray,value) {
  index_of_object = dataArray.findIndex((obj) => obj[value] == id);
  if (index_of_object == -1) {
    return -1;
  } else {
    return index_of_object;
  }
}

  //function get all categories from array
  //if array has element return the same array by adding three product
  //if array is empty return empty
  exports.getAllCategories=()=>{
    let temp_categories = [];
    temp_categories = Categories;
    for (let i = 0; i < Categories.length; i++) {
      var result = Product_data.filter((obj) => {
        return (
          obj.category_id === Categories[i].category_id &&
          obj.product_status == "available"
        );
      }).map((obj) => ({ prod_name: obj.prod_name, product_id: obj.product_id }));
      temp_categories[i].subtype = result.slice(0, 3);
    }
    return temp_categories;
  }

  //Return product details by matching product_id 
  //if id not present return false
  exports.getproductDetails=(product_id)=>{
    var index_of_object=FIndByID(product_id,Product_data,"product_id");
    if(index_of_object==-1){
        return false;
    }else{
      Product_data[index_of_object].view_count=Product_data[index_of_object].view_count+1;
      var productDetails=[];
      productDetails.push(Product_data[index_of_object])
      var index_of_object1=FIndByID(productDetails[0].category_id,Categories,"category_id");
      productDetails[0].category_name=Categories[index_of_object1].title;
      return productDetails;
    }
   
  }

  //return all products with display details
  //if empty send emppy array
  exports.allProductsforCategory=(category_id,startingIndex,endingIndex)=>{
    var MoreItems = Product_data.filter((obj) => {
      return obj.category_id === category_id;
    })
      .map((obj) => ({
        product_img_url: obj.product_img_url,
        prod_name: obj.prod_name,
        ratings: obj.ratings,
        year: obj.year,
        product_id: obj.product_id,
      }))
      .slice(startingIndex,endingIndex + 1);
    var result = Categories.filter((obj) => {
      return obj.category_id === category_id;
    }).map((obj) => ({
      category_name: obj.title,
    }));
    if(result.length>0){
      result[0].arraySize = Categories.length;
      MoreItems.push(result[0]);
      return MoreItems;
    }else{
      return false;
    }
   
  }

  //save new trade object to product_data array
  //return success after adding object
  exports.saveNewTrade=(newTrade)=>{
    Product_data.push({
      prod_name: newTrade.prod_name,
      product_id: uuidv4(),
      category_id: newTrade.category_id,
      year: parseInt(newTrade.year),
      seller: newTrade.seller,
      seller_id: 2,
      ratings: 0,
      description: newTrade.description,
      product_img_url: newTrade.product_img_url,
      product_status: "available",
      view_count:0
    });
    return true
  }

  //return list of categories names for dropdown list
  exports.getCategoriesNames=()=>{
    var temp_categories = Categories.map((obj) => ({
      title: obj.title,
      category_id: obj.category_id,
    }));

    return temp_categories;
  }

  //save new category in categories array
  //retrun success on adding
  exports.saveNewCategory=(newCategory)=>{
  Categories.push({
    title: newCategory.category_name,
    category_id: uuidv4(),
    imageurl: newCategory.imageurl,
  });
  return true;
  }

  //delete item from prodct array
  //return success on successfully removing item
  exports.removeProduct=(product_id)=>{
      insex_of_tarde = FIndByID(product_id, Product_data,"product_id");
      if(insex_of_tarde== -1){
        return false;
      }else{
        Product_data.splice(insex_of_tarde, 1);
        return true;
      }
  }

  //delete item fro categories array
  //return success on successfully removing item
  exports.removeCategory=(category_id)=>{
    insex_of_category = FIndByID(category_id, Categories,"category_id");
    if(insex_of_category== -1){
      return false;
    }else{
      Categories.splice(insex_of_category, 1);
      return true;
    }
  }

  //Return all products from all categories with minimum display details
  //if rempty return empty array
  exports.getAllProducts=(startingIndex,endingIndex)=>{
    var EditItems = Product_data.map((obj) => ({
      product_img_url: obj.product_img_url,
      prod_name: obj.prod_name,
      ratings: obj.ratings,
      year: obj.year,
      product_id: obj.product_id,
    })).slice(startingIndex, endingIndex + 1);
    if( Product_data.length>0){
      EditItems.push({ arraySize: Product_data.length });
      return EditItems;
    }else{
      return []
    }
  }

  //function to update object/trade in product array
  //return success if updated successfully else return false
  exports.updateProductDetails=(updatedTrade)=>{
    var index_of_tarde = FIndByID(updatedTrade.product_id, Product_data,"product_id");
    if(index_of_tarde== -1){
      return false;
    }else{
      Product_data[index_of_tarde].prod_name = updatedTrade.prod_name;
      Product_data[index_of_tarde].year = updatedTrade.year;
      Product_data[index_of_tarde].product_img_url = updatedTrade.product_img_url;
      Product_data[index_of_tarde].category_id = updatedTrade.category_id;
      Product_data[index_of_tarde].description = updatedTrade.description;
      return true;
    }
  }

  //find category by id
  //return if found else return false
  exports.findCategoryByID=(category_id)=>{
    var index_of_object = Categories.findIndex(
      (obj) => obj.category_id == category_id
    );
    if (index_of_object == -1) {
      return false;
    } else {
      return Categories[index_of_object];
    }
  }

  //update category and return success 
  //else reurn false
  exports.updateCategoryByID=(updatedCategory)=>{
    var index_of_object = Categories.findIndex(
      (obj) => obj.category_id == updatedCategory.category_id
    );
    if (index_of_object == -1) {
      return false;
    } else {
      Categories[index_of_object].title = updatedCategory.title;
      Categories[index_of_object].imageurl = updatedCategory.imageurl;
      return true
    }
  }

  //return most viwed products on the basis of view count
  exports.mostViwedProduct=()=>{
    var mostviewed=[...Product_data]
   mostviewed.sort(function(a,b){
    return b.view_count-a.view_count
  })
 .map((obj) => ({
      product_img_url: obj.product_img_url,
      prod_name: obj.prod_name,
      ratings: obj.ratings,
      year: obj.year,
      product_id: obj.product_id,
      view_count:obj.view_count
    }));
    return mostviewed.slice(0,4)
  }