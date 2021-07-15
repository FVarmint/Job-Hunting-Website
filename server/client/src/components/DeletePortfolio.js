import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import Header from './Header';
import { useParams } from 'react-router-dom';

export const DeletePortfolio = () => {
    const { id } = useParams();
    const history = useHistory();

    // const deletePortfolio = async()=>{
    //     const res = await fetch('/portfolios/delete/'+id , {
    //         method:"DELETE",
    //         headers:{
    //             "content-type":"application/json",
    //         }
    //     });

    //     window.alert("your portfolio has been deleted");
    //     console.log("your portfolio has been deleted");

    //     history.push("/mainpage");
    // }

    // useEffect(()=>{
    //     deletePortfolio();
    // },[])
    const deletePortfolio = async()=>{
    if(window.confirm("are you sure you want to delete the portfolio?")){
        const res = await fetch('/portfolios/delete/'+id , {
            method:"DELETE",
            headers:{
                "content-type":"application/json",
            }
        });
    }

    history.push("/mainpage");
}

useEffect(()=>{
        deletePortfolio();
    },[])

    return (
        <div>
        </div>
    )
}

export default DeletePortfolio
