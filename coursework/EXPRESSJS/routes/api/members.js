const express = require("express");
const router = express.Router();
const members = require("../../Members.js");
const uuid = require("uuid");

//sending json
router.get("/members", (req, res) => {
    res.json(members);
});

//get one member by id
router.get("/members/:id", (req, res) =>{
    const found = members.some(member => member.id === parseInt(req.params.id));
    
    if(found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({msg: `Member with id ${req.params.id} not found`});
    }
});

//create member
router.post("/members", (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: "active"
    }

    if(!newMember.name || !newMember.email) return res.status(400).json({msg: "Please include name and email"});

    members.push(newMember);
    res.json(members); //This won't do for view engine use
    //res.redirect("/");
});

//updating member data
router.put("/members/:id", (req, res) =>{
    const found = members.some(member => member.id === parseInt(req.params.id));
    
    if(found) {
        const memberUpdate = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)) {
                member.name = memberUpdate.name ? memberUpdate.name : member.name;
                member.email = memberUpdate.email ? memberUpdate.email : member.email;

                res.json({msg: "Member was updated", member});
            }
        })
    } else {
        res.status(400).json({msg: `Member with id ${req.params.id} not found`});
    }
});

//deleting a member
router.delete("/members/:id", (req, res) =>{
    const found = members.some(member => member.id === parseInt(req.params.id));
    
    if(found) {
        res.json({msg: "Member deleted", members: members.filter(member => member.id !== parseInt(req.params.id))});
    } else {
        res.status(400).json({msg: `Member with id ${req.params.id} not found`});
    }
});

module.exports = router;