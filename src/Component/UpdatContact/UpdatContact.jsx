import React, { useEffect, useState } from 'react'
import imgUser1 from "../../images/Ellipse 1.png"
import style from '../AddContact/Add.module.css'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';





export default function UpdatContact() {

    let navegat = useNavigate();
    const [Contacts, setContacts] = useState([]);
    // console.log(con);
    let [user, setUser] = useState({

        firstName: '',
        lastName: '',
        picture: '',
        email: '',
    })

    const { id } = useParams();
    // console.log(id);

    const config = {
        headers: {
            "app-id": "64fc4a747b1786417e354f31",

        },
    };

    const gatUsers = () => {

        axios.get(`https://dummyapi.io/data/v1/user/${id}`, config)
            .then((result) => {
                setContacts(result.data)
                // console.log(result.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }


    function getUserValue(e) {
        
        let newUser = { ...user };
        newUser[e.target.name] = e.target.value
        setUser(newUser)
        // console.log(newUser);
        // console.log(user);
    }
    async function setUserData(e) {
        e.preventDefault();
        let { data } = await axios.put(`https://dummyapi.io/data/v1/user/${id}`, user, config);
        navegat('/')
        // console.log(data);

    }

    useEffect(() => {
        gatUsers()
    }, [])

    return (
        <>
            <div id={style.conatiner} className='container  ' >
                <div className="imgUser mb-5 p-5 text-center">
                    <div>
                        <img className={`mb-3 ${style.userImg}`} src={Contacts.picture} />
                    </div>
                    <label htmlFor="file" className={style.file_upload_label}>
                        <div className={style.file_upload_design}>
                            <span className="browse-button">Upload Photo</span>
                        </div>
                        <input id="file" name="picture" type="file" />
                    </label>

                </div>
                <form onSubmit={setUserData} className="addUser m-3 ">
                    <div className="row  g-3 mb-5">
                        <div className="col">
                            <input required onChange={getUserValue} type="text" className="form-control" placeholder="First name"  name="firstName" />
                        </div>
                        <div className="col">
                            <input required onChange={getUserValue} type="text" className="form-control" placeholder="Last name" name="lastName" />
                        </div>
                    </div>
                    <div className="row my-3 g-3">
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Phone Number" />
                        </div>
                        <div className="col">
                            <input  value={Contacts.email }   onChange={getUserValue} type="text" className="form-control"  placeholder={"Email"} name="email"   />
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
