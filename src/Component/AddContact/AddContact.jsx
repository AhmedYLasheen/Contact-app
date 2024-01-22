import React, { useState } from 'react'
import imgUser1 from "../../images/Ellipse 1.png"
import { useNavigate } from 'react-router-dom';
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






    const config = {
        headers: {
            "app-id": "64fc4a747b1786417e354f31",
            "Content-Type": "application/json"
        },
    };



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

        
    // function valedateForm() {
    //     const schema = Joi.object({
    //        firstName: Joi.string().required().alphanum().min(3).max(10),
    //        lastName: Joi.string().required().min(3).max(10),
    //         email: Joi.string().required().email(),
    //       
    //     })
    //     return schema.validate(user, { abortEarly: false });
        
    // }
    }


    return (
        <>
            <div id={style.conatiner} className='container ' >
                <div className="imgUser mb-5 p-5 text-center d-flex flex-column justify-content-center  ">
                    <div>
                    <img className="mb-3" src={imgUser1} />
                    </div>   
                    <label htmlFor="file" className={style.file_upload_label}>
                        <div className={style.file_upload_design}>
                            <span className="browse-button">Upload Photo</span>
                        </div>
                        <input id="file"  name="picture" type="file" />
                    </label>

                </div>
                <form onSubmit={setUserData} className="addUser m-3 ">
                    <div className="row  g-3 mb-5">
                        <div className="col">
                            <input required onChange={getUserValue} type="text" className="form-control" placeholder="First name" name="firstName" />
                        </div>
                        <div className="col">
                            <input required onChange={getUserValue} type="text" className="form-control" placeholder="Last name" name="lastName" />
                        </div>
                    </div>
                    <div className="row my-3 g-3">
                        <div className="col">
                            <input onChange={getUserValue} type="text" className="form-control" placeholder="Phone Number" name="Phone Number" />
                        </div>
                        <div className="col">
                            <input required onChange={getUserValue} type="text" className="form-control" placeholder="Email" name="email" />
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
