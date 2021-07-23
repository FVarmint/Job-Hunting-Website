import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import Header from './Header';
import { useParams } from 'react-router-dom';
import Sidebar from './Sidebar';

const UpdatePortfolio = () => {
    const { id } = useParams();
 
    const history = useHistory();
    const [user, setUser] = useState({
        name: "", email: "", phone: "", address: "", education: "", profile: "", skillsets: "", projects: "", projectDiscription: "", linkedinProfile: "", workSampleLink: ""
    });

    let name, value;

    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value });
    }

    const PostData = async (e) => {
        e.preventDefault();
        const { name, email, phone, address, education, profile, skillset, projects, projectDiscription, linkedinProfile, workSampleLink } = user;

        // const authToken = Cookies.get("jwttoken"); 
        // console.log(authToken)

        const res = await fetch("/portfolios/update/"+id, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                // "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                address,
                education,
                profile,
                skillset,
                projects,
                projectDiscription,
                linkedinProfile,
                workSampleLink
            })
        })

        const data = await res.json();
        console.log(data)

        if (res.status === 400 || !data) {
            window.alert("Invalid Details")
            console.log("Invalid details")
        }
        else {
            window.alert("Portfolio Updated Successfully");
            console.log("Portfolio Updated Successfully");

            history.push("/mainpage")
        }
    }

    return (
        <>
            <Header/>
            <div className="mx-4 mt-4">
                <div class="row g-3 align-items-center">
                    <div class="col-auto">
                        <label for="name" class="col-form-label">Name</label>
                    </div>
                    <div class="col-auto">
                        <input type="name" id="name" class="form-control" aria-describedby="name"
                            name="name"
                            value={user.name}
                            onChange={handleInputs}

                        />
                    </div>

                    <div class="col-auto">
                        <label for="naexampleInputEmail1me" class="col-form-label">Email</label>
                    </div>
                    <div class="col-auto">
                        <input type="email" id="exampleInputEmail1" class="form-control" aria-describedby="emailHelp"
                            name="email"
                            value={user.email}
                            onChange={handleInputs}

                        />
                    </div>

                    <div class="col-auto">
                        <label for="phone" class="col-form-label">Phone</label>
                    </div>
                    <div class="col-auto">
                        <input type="phone" id="phone" class="form-control" aria-describedby="phone"
                            name="phone"
                            value={user.phone}
                            onChange={handleInputs}

                        />
                    </div>

                    <div class="col-auto">
                        <label for="address" class="col-form-label">Address</label>
                    </div>
                    <div class="col-auto">
                        <input type="address" id="address" class="form-control" aria-describedby="address"
                            name="address"
                            value={user.address}
                            onChange={handleInputs}

                        />
                    </div>

                    <div className="mb-3 mr-2">
                        <legend>Highest education degree</legend>
                        <label>
                            <input type="radio" className="form-control" id="education" name="education"
                                value="10th"
                                onChange={handleInputs}
                            />10th pass
                        </label>
                        <label>
                            <input type="radio" className="form-control" id="education" name="education"
                                value="12th"
                                onChange={handleInputs}
                            />12th pass
                        </label>
                        <label>
                            <input type="radio" className="form-control" id="education" name="education"
                                value="graduate"
                                onChange={handleInputs}
                            />Bachelor's degree
                        </label>
                        <label>
                            <input type="radio" className="form-control" id="education" name="education"
                                value="postGraduate"
                                onChange={handleInputs}
                            />Master's degree
                        </label>
                    </div>

                    <div class="col-auto">
                        <label for="profile" class="col-form-label">Profile</label>
                    </div>
                    <div class="col-auto">
                        <input type="profile" id="profile" class="form-control" aria-describedby="profile"
                            name="profile"
                            value={user.profile}
                            onChange={handleInputs}
                        />
                    </div>

                    <div class="col-auto">
                        <label for="skillset" class="col-form-label">Skillset</label>
                    </div>
                    <div class="col-auto">
                        <input type="skillset" id="skillset" class="form-control" aria-describedby="skillset"
                            name="skillset"
                            value={user.skillset}
                            onChange={handleInputs}
                        />
                    </div>

                    <div class="col-auto">
                        <label for="projects" class="col-form-label">Projects</label>
                    </div>
                    <div class="col-auto">
                        <input type="projects" id="projects" class="form-control" aria-describedby="projects"
                            name="projects"
                            value={user.projects}
                            onChange={handleInputs}
                        />
                    </div>

                    <div class="col-auto">
                        <label for="projectDiscription" class="col-form-label">Project Discription</label>
                    </div>
                    <div class="col-auto">
                        <input type="projectDiscription" id="projectDiscription" class="form-control" aria-describedby="projectDiscription"
                            name="projectDiscription"
                            value={user.projectDiscription}
                            onChange={handleInputs}
                        />
                    </div>

                    <div class="col-auto">
                        <label for="linkedinProfile" class="col-form-label">Linkedin Profile</label>
                    </div>
                    <div class="col-auto">
                        <input type="linkedinProfile" id="linkedinProfile" class="form-control" aria-describedby="linkedinProfile"
                            name="linkedinProfile"
                            value={user.linkedinProfile}
                            onChange={handleInputs}
                        />
                    </div>

                    <div class="col-auto">
                        <label for="workSampleLink" class="col-form-label">Work Sample Link</label>
                    </div>
                    <div class="col-auto">
                        <input type="workSampleLink" id="workSampleLink" class="form-control" aria-describedby="workSampleLink"
                            name="workSampleLink"
                            value={user.workSampleLink}
                            onChange={handleInputs}
                        />
                    </div>

                    <div className="col-auto">
                        <input class="btn btn-primary" type="submit" value="Update Portfolio"
                            onClick={PostData} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdatePortfolio
