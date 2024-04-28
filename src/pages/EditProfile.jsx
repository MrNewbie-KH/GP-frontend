import EditData from "../components/EditProfilePage/EditData";
import EditImage from "../components/EditProfilePage/EditImage";
import Header from "../components/Home/Header";

import "./EditProfile.css"

function EditProfile(){
    return (
    <>
    <Header/>
    <h1>Profile & settings</h1>
    <EditData/>
    <EditImage/>
    </>
    )
}
export default EditProfile