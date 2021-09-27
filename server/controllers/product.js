const Product = require('../models/product');
const Category = require('../models/category');
const fs = require("fs");



exports.getProduct= async(req, res) =>{
    try {
        const products = await Product.find();
        res.json(products);
        
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

exports.createProduct = async (req,res) =>{
    try {
        const {name, price, description,category} = req.body;
        const image =req.file.path;
        if(!image) return res.status(400).json({msg: "No image upload"})

        const getcategory = await Category.findOne({name: category});
        if(!getcategory){
            return res.status(400).json({msg: "The category of the product does not exist."})
        }
        
        const newProduct = new Product({
            name, price, description, image, category
        })
        //console.log(newProduct);

        await newProduct.save()
        res.json({msg: "Product created"})

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }

}

exports.deleteProduct = async(req, res) =>{
    try {
        const product=await Product.findById({_id:req.params.id});
        
        //remove image from upload
        fs.unlink(product.image, (err) => {
            if (err) {
               res.status(500).json({msg: err.message})
            }
        })

        await Product.findByIdAndDelete(req.params.id)
        res.json({msg: "Product deleted"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

exports=updateProduct= async(req, res) =>{
    try {
        const {name, price, description,category} = req.body;
        const image =req.file.path;
        if(!image) return res.status(400).json({msg: "No image upload"})

        await Product.findOneAndUpdate({_id: req.params.id}, {
            name, price, description, image, category
        })

        res.json({msg: "Updated a Product"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

