import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, Row, Form, Col, ListGroup } from "react-bootstrap";
import { usePopup } from "react-custom-popup";
import "bootstrap/dist/css/bootstrap.min.css";
import './address.css'
 import {updateAddressHandler,addAddressHandler,myAddressHandler,removeAddressHandler} from "../../store/address"

const Address = (props) => {
  let {updateAddressHandler,addAddressHandler,addressData,myAddressHandler,removeAddressHandler} =props;
  console.log("🚀 ~ file: address.jsx ~ line 11 ~ Address ~ addressData", addressData)
  const [myAddress,setMyAddress]= useState();
  const { showInputDialog, showToast } = usePopup();
  
  useEffect(() => {
    myAddressHandler();
    setMyAddress(addressData.addresses);
  },[])
  useEffect(() => {
    setMyAddress(addressData.addresses);
  },[addressData.addresses, myAddress])
  useEffect(() => {
    if(addressData.message&&(addressData.message.includes('update')||addressData.message.includes('added')||addressData.message.includes('deleted'))){
      setMyAddress(addressData.addresses);
    }
  },[addressData, addressData.addresses, addressData.message])



  const showPopup = (data) => {
    showInputDialog({
      title: "Update Address",
      showCloseButton: true,
      headerTextStyle: { fontWeight: "bold", fontSize: "x-large" },
      headerStyle: { marginTop: 5, marginBottom: 5 },
      errorMessageStyle: { color: "green" },
      options: [
        {
          name: "No Thanks!",
          type: "cancel",
          style: { background: "lightcoral" },
        },
        {
          name: "Cancel",
          type: "cancel",
        },
        {
          name: "Confirm",
          type: "confirm",
          style: { background: "lightgreen" },
        },
      ],
      inputs: [
        {
          inputType: "hidden",
          name: "id",
          default: data.id,
        },
        {
          inputType: "text",
          name: "first_name",
          label: "First Name",
          default: data.first_name,
          validation: {
            minLength: {
              value: 3,
            },
          },
          
        },
        {
          inputType: "text",
          name: "last_name",
          label: "Last Name",
          default: data.last_name,
          validation: {
            required: { value: true, message: "Value is required" },
          },
        },
        {
          inputType: "text",
          name: "street_name",
          label: "Street Name",
          default: data.street_name,
          validation: { required: { value: true } },
        },
        {
          inputType: "text",
          name: "building_number",
          label: "Building Name OR Building Number",
          default: data.building_number,
          validation: { required: { value: true } },
        },
        {
          inputType: "number",
          name: "apartment_number",
          label: "Apartment Number",
          default: data.apartment_number,
          validation: { min: { value: 5 } },
        },
        {
          inputType: "number",
          name: "mobile",
          label: "Mobile",
          default: data.mobile,
          validation: { min: { value: 9 } },
        },
      ],
      onConfirm: (event) => {
      console.log("🚀 ~ file: address.jsx ~ line 107 ~ showPopup ~ event", event)
        updateAddressHandler(event)
      },
    });
  };

  const addAddress = (e) => {
    e.preventDefault();

    let data = {
      country: e.target.country.value,
      city: e.target.city.value,
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      mobile: e.target.mobile.value,
      street_name: e.target.street_name.value,
      building_number: e.target.building.value,
      apartment_number: e.target.apartment_number.value,
      default_address: e.target.default_address.checked,
    };
  
    addAddressHandler(data);
  };
  const deleteHandler =(id)=>{
    removeAddressHandler({id:id});
  }
  const updateHandler =(data)=>{
  console.log("🚀 ~ file: address.jsx ~ line 138 ~ updateHandler ~ data", data)
    showPopup(data);
  }
  return (
    <div className="container">
      <div className="form-address">
        <Form onSubmit={addAddress}>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Country </Form.Label>
                <Form.Control
                  placeholder="Country"
                  name="country"
                  //  ={dataAccount.address}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>City </Form.Label>
                <Form.Control
                  placeholder="City"
                  name="city"
                  //  ={dataAccount.address}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>First Name </Form.Label>
                <Form.Control
                  placeholder="first name"
                  name="first_name"
                  //  ={dataAccount.address}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  placeholder="last name"
                  name="last_name"
                  //  ={dataAccount.address}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                  placeholder="Mobile"
                  name="mobile"
                  //  ={dataAccount.address}
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Street Name</Form.Label>
                <Form.Control
                  placeholder="street name"
                  name="street_name"
                  //  ={dataAccount.address}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>building Name OR building Number </Form.Label>
                <Form.Control
                  placeholder="building"
                  name="building"
                  //  ={dataAccount.address}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label> apartment Number </Form.Label>
                <Form.Control
                  placeholder="apartment number"
                  name="apartment_number"
                  //  ={dataAccount.address}
                />
              </Form.Group>

              {["checkbox"].map((type) => (
                <div key={`default-${type}`} className="mb-3">
                  <Form.Check
                    type={type}
                    name="default_address"
                    id={`default-${type}`}
                    label={`default address ${type}`}
                  />
                </div>
              ))}
            </Col>
          </Row>
          <Row>
            <Button variant="primary" type="submit">
              Add Address
            </Button>
          </Row>
        </Form>
      </div>

      <div>
        <ListGroup>
          <div>
            { console.log("🚀 ~ file: address.jsx ~ line 253 ~ Address ~ myAddress", myAddress)}
            {myAddress&&myAddress.map((el) => (
                <div key={el.id}> 
              <ListGroup.Item
                 action 
                 variant="info"
                 key={el.id}
                //  onClick={()=>ahmad(el.id)}
                 ><div className="list">

                   <Button className="btn2" onClick={()=>updateHandler(el)}>Update</Button>
                   <Button className="btn2" onClick={()=>deleteHandler(el.id)}>X</Button>
                 </div>
                {`Address: ${el.street_name} Street, Building ${el.building_number} , apartment ${el.apartment_number} `}
                <br />
                {`Name : ${el.first_name}  ${el.last_name} `}<br />
                {`Mobile : ${el.mobile}`}
                <br />
              </ListGroup.Item>
              {/* <lu onClick={()=>ahmad(el.id)}>
                  <li>  {`Address: ${el.street_name} Street,${el.building_number} Building, ${el.apartment_number} apartment`}</li>
                  <li>   {`Name : ${el.name}  `}</li>
                  <li>  {`Mobile : ${el.mobile}`} </li>
              </lu> */}
                </div> 
              
            ))}
           
          </div>
        </ListGroup>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  addressData: state.address ? state.address : null,
});
 const mapDispatchToProps = {updateAddressHandler,addAddressHandler,myAddressHandler,removeAddressHandler}
export default connect(mapStateToProps,mapDispatchToProps)(Address);
