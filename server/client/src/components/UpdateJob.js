import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import Header from './Header';
import { useParams } from 'react-router-dom';
import Sidebar from './Sidebar';

const UpdateJob = () => {

    const { id } = useParams();

    const history = useHistory();
    const [job, setJob] = useState({
        companyName: "", profile: "", jobDescription: "", experience: "", jobDetails: "", jobLocation: ""
    });

    let name, value;

    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setJob({ ...job, [name]: value });
    }

    const PostData = async (e) => {
        e.preventDefault();
        const { companyName, profile, jobDescription, experience, jobDetails, jobLocation } = job;

        // const authToken = Cookies.get("jwttoken");
        // console.log(authToken)

        const res = await fetch("/jobs/update/" + id, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                // "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify({
                companyName,
                profile,
                jobDescription,
                experience,
                jobDetails,
                jobLocation
            })
        })

        const data = await res.json();
        console.log(data)

        if (res.status === 400 || !data) {
            window.alert("Invalid Details")
            console.log("Invalid details")
        }
        else {
            window.alert("Job Updated Successfully");
            console.log("Job Updated Successfully");

            history.push("/mainpage")
        }
    }

    return (
        <>
            <Header/>
            <div className="mx-4 mt-4">
                <div class="row g-3 align-items-center">
                    <div class="col-auto">
                        <label for="companyName" class="col-form-label">companyName</label>
                    </div>
                    <div class="col-auto">
                        <input type="companyName" id="companyName" class="form-control" aria-describedby="companyName"
                            name="companyName"
                            value={job.companyName}
                            onChange={handleInputs}

                        />
                    </div>

                    <div class="col-auto">
                        <label for="profile" class="col-form-label">profile</label>
                    </div>
                    <div class="col-auto">
                        <input type="profile" id="profile" class="form-control" aria-describedby="profile"
                            name="profile"
                            value={job.profile}
                            onChange={handleInputs}

                        />
                    </div>

                    <div class="col-auto">
                        <label for="jobDescription" class="col-form-label">jobDescription</label>
                    </div>
                    <div class="col-auto">
                        <input type="jobDescription" id="jobDescription" class="form-control" aria-describedby="jobDescription"
                            name="jobDescription"
                            value={job.jobDescription}
                            onChange={handleInputs}

                        />
                    </div>

                    <div class="col-auto">
                        <label for="experience" class="col-form-label">experience</label>
                    </div>
                    <div class="col-auto">
                        <input type="experience" id="experience" class="form-control" aria-describedby="experience"
                            name="experience"
                            value={job.experience}
                            onChange={handleInputs}

                        />
                    </div>

                    <div class="col-auto">
                        <label for="jobDetails" class="col-form-label">jobDetails</label>
                    </div>
                    <div class="col-auto">
                        <input type="jobDetails" id="jobDetails" class="form-control" aria-describedby="jobDetails"
                            name="jobDetails"
                            value={job.jobDetails}
                            onChange={handleInputs}

                        />
                    </div>

                    <div class="col-auto">
                        <label for="jobLocation" class="col-form-label">jobLocation</label>
                    </div>
                    <div class="col-auto">
                        <input type="jobLocation" id="jobLocation" class="form-control" aria-describedby="jobLocation"
                            name="jobLocation"
                            value={job.jobLocation}
                            onChange={handleInputs}

                        />
                    </div>

                    <div className="col-auto">
                        <input class="btn btn-primary" type="submit" value="Update Job"
                            onClick={PostData} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateJob
