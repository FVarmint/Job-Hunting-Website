import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import Header from './Header';
import { useParams } from 'react-router-dom';

export const DeleteJob = () => {
    const { id } = useParams();
    const history = useHistory();

    const deleteJob = async()=>{
    if(window.confirm("are you sure you want to delete the job?")){
        const res = await fetch('/jobs/delete/'+id , {
            method:"DELETE",
            headers:{
                "content-type":"application/json",
            }
        });
    }

    history.push("/mainpage");
}

useEffect(()=>{
        deleteJob();
    },[])

    return (
        <div>
        </div>
    )
}

export default DeleteJob
