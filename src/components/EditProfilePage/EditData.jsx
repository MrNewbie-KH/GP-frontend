import React, { useState } from "react";
function EditData() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    headline: "",
    biography: "",
    website: "",
    twitter: "",
    facebook: "",
    linkedin: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here (e.g., send data to server)
    console.log("Form submitted:", formData);
  };

  return (
    <div className="edit-profile-data">
      <form className="profile-info" onSubmit={handleSubmit}>
        <div className="input-part">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="input-part">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="input-part">
          <label htmlFor="headline">Headline</label>
          <input
            type="text"
            name="headline"
            placeholder="Instructor at zakker"
            value={formData.headline}
            onChange={handleChange}
          />
        </div>
        <div className="input-part">
          <label htmlFor="biography">Biography</label>
          <input
            type="text"
            name="biography"
            placeholder="write bio about yourself"
            value={formData.biography}
            onChange={handleChange}
          />
        </div>
        <div className="input-part">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            name="website"
            placeholder="URL"
            value={formData.website}
            onChange={handleChange}
          />
        </div>
        <div className="input-part">
          <label htmlFor="twitter">twitter</label>
          <input
            type="text"
            name="twitter"
            placeholder="twitter"
            value={formData.twitter}
            onChange={handleChange}
          />
        </div>
        <div className="input-part">
          <label htmlFor="facebook">facebook</label>
          <input
            type="text"
            name="facebook"
            placeholder="facebook"
            value={formData.facebook}
            onChange={handleChange}
          />
        </div>
        <div className="input-part">
          <label htmlFor="linkedin">linkedin</label>
          <input
            type="text"
            name="linkedin"
            placeholder="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn">Save</button>
      </form>
    </div>
  );
}

export default EditData;
