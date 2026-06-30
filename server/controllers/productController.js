import Product from "../models/Product.js"


// Fetch all products or serch

export const getProducts = async (req, res) => {
  try {

    const { search, category } = req.query;
    let query = {};

    if (search) {
      query.title = { $regex: search, $options: "i" };
    };

    if (category) {
      query.category = { $regex: `^${category}$`, $options: "i" };
    }

    const products = await Product.find(query);

    res.status(200).json({
      success: true,
      message: "Products Fetched successfully",
      data: products
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });

  }
}

// Get products by id

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found"
      })
    }
    res.status(200).json({
      success: true,
      message: "Product Fetched",
      data: product
    })

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}


// Search products





{/**
  
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      return res.status(404).json({
        success: false,
        message: "Not Found",
      });
    };

    res.status(200).json({
      success: true,
      message: "All products fetched",
      data: products
    })
  } catch (error) {
    res.status(500).send("Failed to get prodcuts", error.message);
  }
};  
*/}