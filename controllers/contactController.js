const asyncHandler=require("express-async-handler")
 
 const Contact= require("../schema/contactModel.js")
 
 
 // @desc Get all contacts
 // @route GET/api/contacts
 //@access private

const { param } = require("../routes/contactRoute");

 const getContacts=asyncHandler(async(req,res)=>{

    const contact= await Contact.find({user_id:req.params.id})
    res.status(200).json(contact);
 });
  // @desc Get  contact
 // @route GET/api/contacts
 //@access private
 
  const getContact = asyncHandler(async(req, res) => {
    const contact= await Contact.findById(req.params.id);

    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found")
    }

    res.status(200).json(contact);
  });

   // @desc   create contact
 // @route post/api/contacts
 //@access private
 

 const createContact=asyncHandler(async(req,res)=>{
    console.log(req.body)
    const {name,email,phone}=req.body;
    if(!email||!phone||!phone){
       res.status(400);
       throw new Error("All fields are necessary")
    }

    const contact=await Contact.create({
        name,
        email,
        phone,
        user_id:req.params.id,
    })
   res.status(201).json(contact);
 });
 // @desc Update Contact
 // @route PUT/api/contacts/:id
 //@access private

 const updateContact=asyncHandler(async(req,res)=>{
      const contact= await Contact.findById(req.params.id);

    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found")
    }
    if(!contact.user_id.toString()!==req.params.id){
        res.status(403);
        throw new Error('user dont have permission to update other user details');


    }

    
    const updatedContact= await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}

    )
  
    res.status(200).json(updatedContact);
 })
// @desc Delete Contact
 // @route DELETE/api/contacts/:id
 //@access private

const deleteContact = asyncHandler(async(req, res) => {
      const contact= await Contact.findById(req.params.id);

    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found")
    }
       if (!contact.user_id.toString() !== req.params.id) {
         res.status(403);
         throw new Error(
           "user dont have permission to update other user details"
         );
       }
    const deletedContact=await Contact.findByIdAndDelete(req.params.id)
  
    res.status(200).json(deletedContact);
  });

 module.exports={getContact,createContact,updateContact,deleteContact,getContacts}