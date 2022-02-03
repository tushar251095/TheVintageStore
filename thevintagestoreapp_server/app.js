const express = require("express");
const app = express();
app.use(express.json());
var cors = require("cors");

app.use(cors());
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
  },
];

app.get("/", (req, res) => {
  res.send("status OK");
});

//API for categories page
app.get("/trades", (req, res) => {
  let temp_categories = [];
  temp_categories = Categories;
  for (let i = 0; i < Categories.length; i++) {
    Categories[i];
    var result = Product_data.filter((obj) => {
      return (
        obj.category_id === Categories[i].category_id &&
        obj.product_status == "available"
      );
    }).map((obj) => ({ prod_name: obj.prod_name, product_id: obj.product_id }));
    temp_categories[i].subtype = result.slice(0, 3);
  }

  res.send(temp_categories);
});

//API for product details page(requires product_id in request body)
app.post("/trade", (req, res) => {
  var result = Product_data.filter((obj) => {
    return obj.product_id === req.body.product_id;
  });
  var result1 = Categories.filter((obj) => {
    return obj.category_id === result[0].category_id;
  });
  result[0].category_name = result1[0].title;
  res.send(result);
});

//API to view all items on More items page
app.post("/moreitems", (req, res) => {
  var MoreItems = Product_data.filter((obj) => {
    return obj.category_id === req.body.category_id;
  }).map((obj) => ({
    product_img_url: obj.product_img_url,
    prod_name: obj.prod_name,
    ratings: obj.ratings,
    year: obj.year,
    product_id: obj.product_id,
  }));
  var result = Categories.filter((obj) => {
    return obj.category_id === req.body.category_id;
  }).map((obj) => ({
    category_name: obj.title,
  }));
  MoreItems.push(result[0]);
  // console.log(MoreItems)
  res.send(MoreItems);
});

//api to add new trade in product_data
app.post("/add/trade", (req, res) => {
  var counter = Product_data.length;
  Product_data.push({
    prod_name: req.body.prod_name,
    product_id: ++counter,
    category_id: req.body.category_id,
    year: parseInt(req.body.year),
    seller: req.body.seller,
    seller_id: 2,
    ratings: 0,
    description: req.body.description,
    product_img_url: req.body.product_img_url,
    product_status: "available",
  });
  res.send(Product_data[counter - 1]);
});

//api to get categories object for dropdownlist
app.get("/categories", (req, res) => {
  var temp_categories = Categories.map((obj) => ({
    title: obj.title,
    category_id: obj.category_id,
  }));
  res.send(temp_categories);
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server running on port: ", port);
});

//api to add category
app.post("/add/category", (req, res) => {
  var counter = Categories.length;
  Categories.push({
    title: req.body.category_name,
    category_id: ++counter,
    imageurl: req.body.imageurl,
  });
  res.send(Categories[counter - 1]);
});

//api to delete trade
app.post("/delete/trade", (req, res) => {
  //handle error for wrong id
  insex_of_tarde = FIndByID(req.body.product_id, Product_data);
  Product_data.splice(insex_of_tarde, 1);
  res.send(Product_data);
});

//function to find object index by id
function FIndByID(id, dataArray) {
  index_of_object = dataArray.findIndex((obj) => obj.product_id == id);
  if (index_of_object == -1) {
    return false;
  } else {
    return index_of_object;
  }
}

//API to view all items on edit page
app.get("/view/allproduct", (req, res) => {
  var EditItems = Product_data.map((obj) => ({
    product_img_url: obj.product_img_url,
    prod_name: obj.prod_name,
    ratings: obj.ratings,
    year: obj.year,
    product_id: obj.product_id,
  }));
  // console.log(EditItems)
  res.send(EditItems);
});

//api to Update trade in product_data
app.post("/update/trade", (req, res) => {
  var objindex=FIndByID(req.body.product_id,Product_data)
  Product_data[objindex].prod_name=req.body.prod_name
  Product_data[objindex].year=req.body.year
  Product_data[objindex].product_img_url=req.body.product_img_url
  Product_data[objindex].category_id=req.body.category_id
  Product_data[objindex].description=req.body.description
  res.send("success");
});