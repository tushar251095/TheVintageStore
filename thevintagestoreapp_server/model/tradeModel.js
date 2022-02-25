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

  exports.Categories=()=> Categories
  exports.Product_data=()=>Product_data