import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import SectionForm from "./SectionForm";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";

const CourseForm = ({ id, initialData, sections, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    whatYouWillLearn: "",
    prerequisite: "",
    language: "",
    level: "",
    price: 0,
    categories: [],
    tags: [""],
  });
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [logged, setLogged] = useState(true);
  const [courseId, setCourseId] = useState(id);
  const [components, setComponents] = useState(sections ? sections : []);
  const token = localStorage.getItem("token");
  const isEdit = !!id;
  const [change, setChange] = useState(false);
  const [open, setopen] = useState(false);
  const [uploading, setuploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      console.log("token not found");
      toast("Login First");
    } else {
      setLogged(true);
    }
  }, [token]);
  useEffect(() => {
    setCourseId(id);
    setComponents(initialData.sections);
  }, [id]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://e-learning-platform-uwoj.onrender.com/category/all"
        );
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        whatYouWillLearn: initialData.whatYouWillLearn || "",
        prerequisite: initialData.prerequisite || "",
        language: initialData.language || "",
        level: initialData.level || "",
        price: initialData.price || 0,
        categories: initialData.categories.map((category) => category.id) || [
          0,
        ],
        tags: initialData.tags.map((tagObject) => tagObject.tag) || [""],
      });
      setComponents(initialData.sections);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setChange(true);
  };
  const handleChangeInt = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: +value });
    setChange(true);
  };
  const handleArrayChangeInt = (e, index, field) => {
    const { value } = e.target;
    const newArray = [...formData[field]];
    newArray[index] = parseInt(value, 10);
    setFormData({ ...formData, [field]: newArray });

    setChange(true);
  };
  const handleArrayChange = (e, index, field) => {
    const { value } = e.target;
    const newArray = [...formData[field]];
    newArray[index] = value || " ";
    setChange(true);
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field) => {
    const newArray = [...formData[field]];
    newArray.push(" ");
    console.log(newArray);

    setFormData({ ...formData, [field]: newArray });
  };

  const removeArrayItem = (index, field) => {
    const newArray = [...formData[field]];
    newArray.splice(index, 1);
    console.log(newArray);
    setChange(true);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const addComponent = () => {
    setComponents([...components, {}]);
    setopen(true);
  };

  const removeComponent = () => {
    setComponents(components.slice(0, -1));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (change) {
        if (isEdit) {
          console.log("editData", formData);
          response = await axios.post(
            "https://e-learning-platform-uwoj.onrender.com/course/update-course",
            {
              courseId,
              ...formData,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response.data);
        } else {
          response = await axios.post(
            "https://e-learning-platform-uwoj.onrender.com/course/create-course",
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.status === "OK") {
            setComponents([{}]);
          }
        }
        if (response.data.message === "please set the owner paypal email") {
          toast.error("please set the owner paypal email");
          return;
        }
        onSubmit(response.data.data);
        if (response.data.status === "OK") {
          toast.success("Done");
          navigate(`/dashboard/update/${response.data.data.id}`); // Navigate to the desired route
        } else {
          toast.error("Something went wrong");
        }
      }
      if (image) {
        setuploading(true);
        const imageFormData = new FormData();
        imageFormData.append("image", image);
        await axios.post(
          `https://e-learning-platform-uwoj.onrender.com/course/upload-image?courseId=${
            id ? id : response.data.data.id
          }`,
          imageFormData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setuploading(false);
      }

      setChange(false);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };
  const publishToPublic = async () => {
    try {
      const response = await axios.get(
        `https://e-learning-platform-uwoj.onrender.com/course/publish-course/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //console.log(response.data.message);
      toast(response.data.message);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  const unPublishPublic = async () => {
    try {
      const response = await axios.delete(
        `https://e-learning-platform-uwoj.onrender.com/course/delete-course?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //console.log(response.data.message);
      toast(response.data.message);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return logged ? (
    <div className="create-course">
      <div className="create-course-container">
        <h1 className="create-course-title">
          {isEdit ? "Update Course" : "Create New Course"}
        </h1>
        <form onSubmit={handleSubmit} className="course-form">
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>What You Will Learn:</label>
            <input
              type="text"
              name="whatYouWillLearn"
              value={formData.whatYouWillLearn}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Prerequisite:</label>
            <input
              type="text"
              name="prerequisite"
              value={formData.prerequisite}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Language:</label>
            <input
              type="text"
              name="language"
              value={formData.language}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Level:</label>
            <input
              type="text"
              name="level"
              value={formData.level}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChangeInt}
              required
            />
          </div>
          <div className="form-group">
            <label>Categories:</label>
            <select
              name="categories"
              value={formData.categories[0]}
              onChange={(e) => handleArrayChangeInt(e, 0, "categories")}
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Tags:</label>
            <div className="dynamic-input-container">
              {formData.tags.map((tag, index) => (
                <div key={index} className="dynamic-input">
                  <input
                    type="text"
                    name="tags"
                    value={tag}
                    onChange={(e) => handleArrayChange(e, index, "tags")}
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem(index, "tags")}
                    className="remove-button"
                  >
                    -
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem("tags")}
                className="add-btn"
              >
                Add More
              </button>
            </div>
          </div>
          <div className="form-group">
            <label>Image:</label>
            <div className="image-container">
              <input name="image" type="file" onChange={handleFileChange} />
              {image && typeof image === "object" ? (
                <img src={URL.createObjectURL(image)} alt="course image" />
              ) : isEdit && initialData && initialData.imageUrl ? (
                <img src={initialData.imageUrl} alt="course image" />
              ) : null}

              {uploading && <Loader small={true} />}
              {/* {uploading && <div className="uploading">Uploading...</div>} */}
            </div>
          </div>
          <button type="submit" className="submit-button">
            {isEdit ? "Update Course" : "Create Course"}
          </button>
          {isEdit ? (
            <>
              <button
                type="button"
                className="submit-button"
                onClick={publishToPublic}
              >
                Pubish to Public
              </button>
              <button
                type="button"
                className="submit-button"
                onClick={unPublishPublic}
              >
                UnPubish Public
              </button>
            </>
          ) : (
            <></>
          )}
        </form>
        <ToastContainer />
      </div>
      {components && (
        <div className="sections-containers">
          <h1>Upload Sections</h1>
          {components.map((component, index) => (
            <div key={index} className="dynamic-component">
              <SectionForm
                courseId={+courseId}
                sId={component.id ? component.id : null}
                initialData={component}
                index={index}
                open={open}
              />
            </div>
          ))}
          <button onClick={addComponent} className="add-btn">
            Add Section
          </button>
          <button onClick={removeComponent} className="remove-button">
            -
          </button>
        </div>
      )}
    </div>
  ) : null;
};

export default CourseForm;
