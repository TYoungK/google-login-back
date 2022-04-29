'use strict'
const UserModel = require('../models/User');
const {pool} = require('../config/db');


const connect = async () => await pool.getConnection(async (conn) => conn);


exports.getUsers = async function() {
    try{
        const db = await pool.getConnection(async (conn) => conn);
        const query = "SELECT * FROM users";
        const [data] = await db.query(query);
        return data[0];
        
        db.release();
    }catch(err){
        console.log(err);
    }
    
}


exports.getUser = async function(user_id) {
    try{
        const db = await pool.getConnection(async (conn) => conn);
        const query = "SELECT * FROM users WHERE id=?";
        const [data] = await db.query(query,user_id);
        return data[0];
        
        db.release();
    }catch(err){
        console.log(err);
    }
    
}

exports.getUserbySub = async function(sub,type) {
    try{
        const db = await pool.getConnection(async (conn) => conn);
        const query = "SELECT * FROM users WHERE sub=? AND type=?";
        const [data] = await db.query(query,[sub,type]);
        return data[0];
        
        db.release();
    }catch(err){
        console.log(err);
    }
    
}

exports.Create = async function(user){
    try{
        const db = await pool.getConnection(async (conn) => conn);
        const query = "INSERT INTO users(email,name,profile_uri,sub,type) VALUES(?,?,?,?,?) ";
        const data = await db.query(query,[user.email,user.name,user.profile_uri,user.sub, user.type]);
        return data[0].insertId;
        
        db.release();
    }catch(err){
        console.log(err);
    }
}

exports.Update = async function(id,name,profile_uri){
    const db = await pool.getConnection(async (conn) => conn);
    new Promise((resolve, reject) => {

        const query = "UPDATE users set name=?,profile_uri=? WHERE id=?";
        db.query(query,[name,profile_uri,id],(err,data) => {
            
            if(err) reject(err);
            resolve(data);
        });
    });
}

