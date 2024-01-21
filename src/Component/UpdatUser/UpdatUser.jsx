
import React, { useState } from 'react'
import imgUser1 from "../../images/Ellipse 1.png"
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import style from '../AddContact/Add.module.css'

export default function UpdatUser() {

    let [user, setUser] = useState({
        firstName: '',
        lastName: '',
        picture: '',
        email: '',
    })
    let { id } = useParams();

    const navegat = useNavigate();

    const config = {
        headers: {
            "app-id": "64fc4a747b1786417e354f31",
            "Content-Type": "application/json"
        },
    };

    let handleChange = (e) => {
        console.log(e);
        const { name, value } = e.target;
        setUser((old) => ({
            ...old,
            [name]: value,
        }));
    };

    let updateUser = (e) => {
        axios
            .patch(`https://dummyapi.io/data/v1/user/create${id}`, config, user)
            .then((res) => {
                console.log(res)
                navegat('/')
            })
            .catch((err) => console.log(err));
        e.preventDefault();
    };

    // function getUserValue(e) {
    //     let newUser = { ...user };
    //     newUser[e.target.name] = e.target.value
    //     setUser(newUser)
    // }

    return (
        <>
            <div id={style.conatiner} className='container bg-info ' >
                <div className="imgUser mb-5 p-5 text-center">
                    <img className="" src={imgUser1} />
                    <a href=""> <h6 className='pt-3' >Upload Photo</h6></a>

                </div>
                <form onSubmit={updateUser} className="addUser m-3 ">
                    <div className="row  g-3 mb-5">
                        <div className="col">
                            <input value={user.firstName} onChange={handleChange} type="text" className="form-control" placeholder="First name" name="firstName" />
                        </div>
                        <div className="col">
                            <input value={user.lastName} onChange={handleChange} type="text" className="form-control" placeholder="Last name" name="lastName" />
                        </div>
                    </div>
                    <div className="row my-3 g-3">
                        <div className="col">
                            <input value={user.picture} onChange={handleChange} type="text" className="form-control" placeholder="picture Url" name="picture" />
                        </div>
                        <div className="col">
                            <input value={user.email} onChange={handleChange} type="text" className="form-control" placeholder="Email" name="email" />
                        </div>
                    </div>
                    <div id={style.saveUser} className="saveUser d-flex justify-content-between mt-5 ">
                        <button  onClick={() => navegat('/')} type="button" className="btn btn-secondary rounded-4 w-25 "> Cancel </button>
                        <button type="Submit" className="btn btn-primary rounded-4 w-25">Save</button>
                    </div>
                </form>

            </div>
        </>
    )
}
