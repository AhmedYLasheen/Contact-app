import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./Home.module.css";
import axios from "axios";


export default function Home() {
    const [contacts, setContacts] = useState([]);
    const [originalContacts, setOriginalContacts] = useState([]);
    const [start, setstart] = useState(0)
    const [end, setend] = useState(2)
    const [search, setsearch] = useState([])

    

    const config = {
        headers: {
            "app-id": "64fc4a747b1786417e354f31",
            "Content-Type": "application/json"
        },
    };

    const handleMinus = () => {
        if (start === 0) {
            setstart(0)
            setend(2)
        } else {
            setstart(prevStart => prevStart - 2)
            setend(prevEnd => prevEnd - 2)
        }
    }
    const handlePlus = () => {
        if (contacts.length % 2 === 0) {
            if (end === contacts.length) {
                setstart(0)
                setend(2)
            } else {
                setstart(prevStart => prevStart + 2)
                setend(prevEnd => prevEnd + 2)
            }
        } else {
            if (end === contacts.length + 1) {
                setstart(0)
                setend(2)
            } else {
                setstart(prevStart => prevStart + 2)
                setend(prevEnd => prevEnd + 2)
            }
        }
    }
    const endValue = Math.ceil(contacts.length / 2);

    const handleSearch = (e) => {
        const value = e.target.value;
        setsearch(value);

        if (value === '') {
            setContacts(originalContacts);
        } else {
            const newContacts = originalContacts.filter((item) =>
                item.firstName.toLowerCase().includes(value.toLowerCase())
            );
            setContacts(newContacts);
        }
    }
    const handleDelete = (id) => {
        axios.delete(`https://dummyapi.io/data/v1/user/${id}`, config)
            .then((res) => {
                gatUsers()
                handleMinus()
                // console.log(res);
            })
            .catch((err) => console.log(err))
    }
    const gatUsers = () => {
        axios.get('https://dummyapi.io/data/v1/user', config)
            .then((result) => {
                setOriginalContacts(result.data.data);
                setContacts(result.data.data);
                // console.log(result.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    useEffect(() => {
        gatUsers()
    }, []);
    return (
        <>
            <div id={style.conatiner} className="container   p-5">
                <div className={`${style.searchbtn}  d-flex justify-content-center`}>
                    <input
                        className="form-control m-3  rounded-pill"
                        type="text"
                        placeholder="search"
                        onChange={handleSearch}
                    />
                </div>
                <div className="button p-3">
                    <button className="btn bg-info float-end text-white rounded-pill">
                        <Link className="d-flex flex-row align-items-center justify-content-around" to="add">
                            <i className="fa-solid fa-plus text-white p-3 "></i>
                            <p className="m-0"> Add New Contact</p>
                        </Link>
                    </button>
                    <div className="clearfix "></div>
                </div>
                <div id={style.line} className=" d-flex"></div>
                <div className="row ">
                    {contacts.length>0?contacts.slice(start, end).map((contact, index) => {
                        return (
                            <>
                                <div key={index} className=" p-5   d-flex flex-column flex-sm-row gap-3 justify-content-between ">
                                    <div className={`${start.userInfo}  d-flex gap-4  align-items-center justify-content-between `}>
                                        <img
                                            className={`${style.userImg} rounded-circle`}
                                            srcSet={contact.picture}
                                        />
                                        <div className="h-100 d-flex flex-column  justify-content-around">
                                            <h6 className="m-0">{contact.firstName} {contact.lastName}</h6>
                                            <h6 className="m-0"> 01066501521</h6>
                                        </div>
                                    </div>
                                    <div className="icon d-flex align-items-start gap-4">
                                        <button  className="rounded-2 border-0">
                                            <Link to={`/updat/${contact.id}`}>
                                                <i className="fa-solid fa-pen-to-square p-2"></i>
                                            </Link>
                                        </button>
                                        <button onClick={() => handleDelete(contact.id)} className="rounded-2 border-0">
                                            <i className="p-2 fa-solid fa-trash "></i>
                                        </button>
                                    </div>
                                </div>

                            </>
                        )
                    }):<div className=" d-flex justify-content-center align-items-center">
                        <i className="fa fa-spinner faspin fa-5x"></i></div>}
                </div>
                <div id={style.switch} className=" switch d-flex justify-content-end align-items-center ">
                    <div onClick={handleMinus}>
                        <i className="fa-solid fa-chevron-left mx-3"></i>
                    </div>
                    <h6 className=" mt-1">{end / 2}/{endValue}</h6>
                    <div onClick={handlePlus} >
                        <i className="fa-solid fa-chevron-right mx-3"></i>
                    </div>
                </div>
            </div>
        </>
    );
}
