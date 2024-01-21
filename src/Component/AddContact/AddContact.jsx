import React, { useState } from 'react'
import imgUser1 from "../../images/Ellipse 1.png"
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from './Add.module.css'
import Joi from 'joi';



export default function AddContact() {

    let [user, setUser] = useState({
        firstName: '',
        lastName: '',
        picture: '',
        email: '',
    })



    // let [errorList, setErrorList] = useState([]);
    // let [loading, setLoading] = useState(false);0


    const config = {
        headers: {
            "app-id": "64fc4a747b1786417e354f31",
            "Content-Type": "application/json"
        },
    };

    // const setUserData = () => { 
    //     axios.post('https://dummyapi.io/data/v1/user/create',user,config)
    //     .then((result) => {
    //         console.log(result.data);
    //         // goToHome()
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
    // }
    
    const navegat = useNavigate();

    const navegatToHome = useNavigate();
    function goToHome() {
        let path = "/";
        navegatToHome(path);
    }

    function getUserValue(e) {
        let newUser = { ...user };
        newUser[e.target.name] = e.target.value
        setUser(newUser)
    }

    async function setUserData(e) {
        e.preventDefault();
        let { data } = await axios.post(`https://dummyapi.io/data/v1/user/create`, user, config);
        console.log(data);
        goToHome()
        
    }

    // async function setUserData(e) {
    //     e.preventDefault();
    //     let valedate = valedateForm()
    //     console.log(valedate.error.details);
    //     if (valedate.error) {
    //         setErrorList(valedate.error)
    //     } else {
    //         let { data } = await axios.post(`https://dummyapi.io/data/v1/user/create`, user, config);
    //         console.log(data);
    //         alert('cdfddv')
    //     }
    // }



    // function valedateForm() {
    //     const valedObject = Joi.object({
    //         firstName: Joi.string().required().alphanum().min(3).max(10),
    //         lastName: Joi.string().required().min(3).max(10),
    //         email: Joi.string().required().email({ tlds: { allow: ['com', 'net'] } }),
            
    //     })
    //     return valedObject.validate(user)
    // } 


    return (
        <>

            <div id={style.conatiner} className='container ' >
                <div className="imgUser mb-5 p-5 text-center">
                    <img className="" src={imgUser1} />
                    <a href=""> <h6 className='pt-3' >Upload Photo</h6></a>
                </div>
                <form onSubmit={setUserData}  className="addUser m-3 ">
                    <div className="row  g-3 mb-5">
                        <div className="col">
                            <input onChange={getUserValue} type="text" className="form-control" placeholder="First name" name="firstName" />
                        </div>
                        <div className="col">
                            <input onChange={getUserValue} type="text" className="form-control" placeholder="Last name" name="lastName" />
                        </div>
                    </div>
                    <div className="row my-3 g-3">
                        <div className="col">
                            <input onChange={getUserValue} type="text" className="form-control" placeholder="picture Url" name="picture" />
                        </div>
                        <div className="col">
                            <input  onChange={getUserValue} type="text" className="form-control" placeholder="Email" name="email" />
                        </div>
                    </div>
                    <div id={style.saveUser} className="saveUser d-flex justify-content-between mt-5 ">
                        <button onClick={() => navegat('/')} type="button" className="btn btn-secondary rounded-4 w-25 "> Cancel </button>
                        <button type="Submit" className="btn btn-primary rounded-4 w-25">Save</button>
                    </div>
                </form>

            </div>
        </>
    )
}
