const Category = require("../models/category");
const Product = require("../models/product");

exports.getCategory = async (req, res) =>{
    try {
        const categories = await Category.find()
        res.json(categories)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }

}

exports.createCategory = async (req,res)=>{
    try {
        const {name, type} = req.body;
        const category = await Category.findOne({name})
        if(category) return res.status(400).json({msg: "This category already exists."})

        const newCategory = new Category({name,type});

        await newCategory.save()
        res.json({msg: "Created a category"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

exports.updateCategory = async(req, res) =>{
    try {
        //console.log(req.params.id);
        const newCategory = req.body;
        await Category.findOneAndUpdate({_id: req.params.id}, newCategory);

        res.json({msg: "Updated a category"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}
exports.deleteCategory = async(req, res) =>{
    try {
        const products = await Product.findOne({category: req.params.id})
        if(products) return res.status(400).json({
            msg: "Please delete all products with a relationship."
        })

        await Category.findByIdAndDelete(req.params.id)
        res.json({msg: "Deleted a Category"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}