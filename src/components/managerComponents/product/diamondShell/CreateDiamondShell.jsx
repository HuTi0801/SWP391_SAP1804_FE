
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createDiamondShell } from "../../../../redux/actions/diamondShellAction";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import axios from 'axios';
import './Diamondshell.css'
import ManagerHeader from "../../header/ManagerHeader"
import Functionbar from "../../functionbar/Functionbar"
const CreateDiamondShell = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [diamondShell, setDiamondShell] = useState({
        gender: "",
        imageDiamondShell: "",
        material: "",
        price: "0",
        quantity: "0",
        secondaryStoneType: "",
        statusDiamondShell: ""
    });
    const handleChange = (e) => {
        setDiamondShell({ ...diamondShell, [e.target.name]: e.target.value });
    };

    const diamondShellAdd = async () => {
        dispatch(createDiamondShell(diamondShell));
        alert("Add DiamondShell successfully!!!!");
        navigate("/diamondshell");
    };
    /* Fetch diamondShell Size from ApI */
    const [diamondShellSize, setDiamondShellSize] = useState([]);

    const fetchDiamondShellSize = async () => {
        try {
            const response = await axios.get('http://localhost:8080/auth/size/get-all-size');
            return response.data.result;
        } catch (error) {
            console.error('Error fetching diamond shell Size info:', error);
            return [];
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            const diamondShellData = await fetchDiamondShellSize();

            if (diamondShellData) {
                setDiamondShellSize(diamondShellData);
            }

        };
        fetchData();


    }, []

    );

    const options = diamondShellSize.map((diamondShell_size) => ({
        value: diamondShell_size.size,
        label: diamondShell_size.size,
    }));

    return (
        <>
            <ManagerHeader />
            <Functionbar />
            <div className="create-DiamondShell">

                <h1>Create DiamondShell </h1>


                <div className="sub-create-DiamondShell">

                    <div className="createGender">
                        <label htmlFor="Gender">Gender:</label>
                        <select name="gender" placeholder="Gender" onChange={handleChange}>
                            <option value="">Gender</option>
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                        </select>
                    </div>

                    <div className="createimgDiamondShell">
                        <label htmlFor="imgDiamondShell">Image:</label>
                        <input
                            type="text"
                            placeholder="Image"
                            name="imageDiamondShell"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="createMaterial">
                        <label htmlFor="Material">Material:</label>
                        <select name="material" placeholder="Material" onChange={handleChange}>
                            <option value="">Material</option>
                            <option value="Platinum 18K">Platinum 18K</option>
                            <option value="Gold 14K">Gold 14K</option>
                        </select>
                    </div>

                    <div className="createPrice">
                        <label htmlFor="Price">Price:</label>
                        <input
                            type="text"
                            placeholder="Price"
                            name="price"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="createQuantity">
                        <label htmlFor="Quantity">Quantity:</label>
                        <input
                            type="number"
                            placeholder="Quantity"
                            name="quantity"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="createSecondaryStoneType">
                        <label htmlFor="SecondaryStoneType">Secondary Stone Type:</label>
                        <input
                            type="text"
                            placeholder="SecondaryStoneType"
                            name="secondaryStoneType"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="createstatusDiamondShell">
                        <label htmlFor="statusDiamondShell">StatusDiamond:</label>
                        <select name="statusDiamondShell" placeholder="StatusDiamondShell" onChange={handleChange}>
                            <option value="">StatusDiamondShell</option>
                            <option value="True">True</option>
                            <option value="False">False</option>
                        </select>
                    </div>

                    <div className="Size">
                        <label htmlFor="Size">Size:</label>
                        <div className="Select">
                            <Select
                                isMulti
                                options={options}
                                onChange={(selectedOptions) => {
                                    console.log(selectedOptions);
                                }}
                                placeholder="Select Size"
                                className="custom-Size"
                            />
                        </div>

                    </div>

                </div>

                <button onClick={diamondShellAdd}>Add</button>
            </div>
        </>

    );

}

export default CreateDiamondShell