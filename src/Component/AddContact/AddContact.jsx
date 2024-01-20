import React, { useState } from 'react'
import imgUser1 from "../../images/Ellipse 1.png"
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function AddContact() {

    let [user, setUser] = useState({
        firstName: '',
        lastName: '',
        picture: '',
        email: '',
    })


    const navegat = useNavigate();


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
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
    // }

    async function setUserData(e) {
        e.preventDefault();
        let { data } = await axios.post(`https://dummyapi.io/data/v1/user/create`, user, config);
        console.log(data);
    }

    function getUserValue(e) {
        let newUser = { ...user };
        newUser[e.target.name] = e.target.value
        setUser(newUser)
        // console.log(newUser);

    }

    return (
        <>

            <div className='container bg-danger' style={{ width: "80vw" }}>
                <div className="imgUser mb-5 text-center">
                    <img className="" src={imgUser1} />
                    <h6 >Upload Photo</h6>
                </div>
                <form onSubmit={setUserData} className="addUser">
                    <div className="row mb-4 g-3">
                        <div className="col">
                            <input required onChange={getUserValue} type="text" className="form-control" placeholder="First name" name="firstName" />
                        </div>
                        <div className="col">
                            <input required onChange={getUserValue} type="text" className="form-control" placeholder="Last name" name="lastName" />
                        </div>
                    </div>
                    <div className="row mb-4 g-3">
                        <div className="col">
                            <input onChange={getUserValue} type="text" className="form-control" placeholder="picture Url" name="picture" />
                        </div>
                        <div className="col">
                            <input required onChange={getUserValue} type="text" className="form-control" placeholder="Email" name="email" />
                        </div>
                    </div>
                    <div className="saveUser d-flex justify-content-between ">
                        <button onClick={() => navegat('/')} type="button" className="btn btn-primary"> Cancel </button>
                        <button type="Submit" className="btn btn-secondary">Save</button>
                    </div>
                </form>

            </div>
        </>
    )
}
