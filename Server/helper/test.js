import fs from "fs"
import path from "path"
import {pool} from "./db.js"
import { hash } from "bcrypt"
import jwt from "jsonwebtoken"

const __dirname=import.meta.dirname

const initializeTestDb = async () => {
    
    try {
        const sql= fs.readFileSync(path.resolve(__dirname, "../data.sql"),"utf8")
        await pool.query(sql)
        console.log("Test database initialized")
    } catch (err) {
        console.error("Error initalizing test database",err)
        throw err
    }         
}

const insertTestUser = (user) => {
    hash(user.password,10,(err,hashedPassword) =>{
        if (err) {
            console.error("Error hashing",err)
        }
        pool.query("INSERT INTO account (email,password) VALUES ($1,$2)",
            [user.email,hashedPassword],
            (err,result) => {
                if (err){
                    console.error("Error inserting test user:",err)
                }
                else {
                    console.log("Test user inserted succesfully")
                }
            }
        )
    })
}

const getToken = (email) => {
    return jwt.sign({email}, process.env.JWT_SECRET_KEY)
}

export {initializeTestDb, insertTestUser, getToken}