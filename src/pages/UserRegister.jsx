import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import InputField from "../components/InputField";
import bgImage from "../assets/Document.png";
import { uploadImageToSupabase } from "../services/ImageSave";
import { registerTourist } from "../services/UserRegister";
import toast from "react-hot-toast";

export default function UserRegister() {
  const navigator = useNavigate();

  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    profile_image_url: "",
    passport_nic_number: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state_province: "",
    postal_code: "",
    country: "",
    date_of_birth: "",
    password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState({});
  const [profileImagePreview, setProfileImagePreview] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProfileImagePreview(URL.createObjectURL(file));

      uploadImageToSupabase(file)
        .then((url) => {
          if (url) {
            setUserData((prev) => ({ ...prev, profile_image_url: url }));
            toast.success("Successfully add Image");
            //console.log("Image uploaded to:", url);
          }
        })
        .catch((error) => {
          console.error("Image upload error:", error);
          toast.error("Error while uploading image");
        });
    }
  };

  const validateForm = () => {
    let formErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!userData.first_name.trim())
      formErrors.first_name = "First name is required";
    if (!userData.last_name.trim())
      formErrors.last_name = "Last name is required";
    if (!emailRegex.test(userData.email))
      formErrors.email = "Invalid email format";
    if (!phoneRegex.test(userData.phone))
      formErrors.phone = "Phone must be 10 digits";
    if (!userData.passport_nic_number.trim())
      formErrors.passport_nic_number = "NIC / Passport is required";
    if (!userData.date_of_birth.trim())
      formErrors.date_of_birth = "Date of birth required";
    if (!userData.address_line1.trim())
      formErrors.address_line1 = "Address Line 1 is required";
    if (!userData.city.trim()) formErrors.city = "City is required";
    if (!userData.state_province.trim())
      formErrors.state_province = "State / Province required";
    if (!userData.postal_code.trim())
      formErrors.postal_code = "Postal code required";
    if (!userData.country.trim()) formErrors.country = "Country required";

    if (!userData.password.trim()) formErrors.password = "Password is required";
    if (!userData.confirm_password.trim())
      formErrors.confirm_password = "Please confirm password";
    else if (userData.password !== userData.confirm_password)
      formErrors.confirm_password = "Passwords do not match";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    try {
      const response = await registerTourist(userData);
      console.log("Backend Response:", response);

      setUserData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        profile_image_url: "",
        passport_nic_number: "",
        address_line1: "",
        address_line2: "",
        city: "",
        state_province: "",
        postal_code: "",
        country: "",
        date_of_birth: "",
        password: "",
        confirm_password: "",
      });

      toast.success("Registration successful! You can now log in.");
      navigator("/login");
      setProfileImagePreview(null);
      setErrors({});
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div
      className="w-full min-h-[calc(100vh-64px)] flex justify-center items-center bg-contain bg-center py-10"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white shadow-lg rounded-2xl w-[850px] px-10 py-10 m-4 overflow-auto max-h-[85vh]">
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-8">
          Create New Account
        </h2>

        {/* Image Preview */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
            {profileImagePreview ? (
              <img
                src={profileImagePreview}
                className="w-full h-full object-cover"
                alt="Profile"
              />
            ) : (
              <span className="text-xs flex items-center justify-center h-full text-gray-500">
                No image
              </span>
            )}
          </div>

          <label className="mt-3 cursor-pointer bg-gray-900 text-white px-4 py-2 rounded-md text-sm">
            Upload Photo
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="First Name"
            name="first_name"
            value={userData.first_name}
            onChange={handleChange}
            error={errors.first_name}
          />
          <InputField
            label="Last Name"
            name="last_name"
            value={userData.last_name}
            onChange={handleChange}
            error={errors.last_name}
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            value={userData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <InputField
            label="Phone"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            error={errors.phone}
          />
          <InputField
            label="Passport / NIC Number"
            name="passport_nic_number"
            value={userData.passport_nic_number}
            onChange={handleChange}
            error={errors.passport_nic_number}
          />
          <InputField
            label="Date of Birth"
            name="date_of_birth"
            type="date"
            value={userData.date_of_birth}
            onChange={handleChange}
            error={errors.date_of_birth}
          />

          {/* Password Field */}
          <div className="relative">
            <InputField
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={userData.password}
              onChange={handleChange}
              error={errors.password}
            />
            <div
              className="absolute right-3 top-[42px] cursor-pointer text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <InputField
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              name="confirm_password"
              value={userData.confirm_password}
              onChange={handleChange}
              error={errors.confirm_password}
            />
            <div
              className="absolute right-3 top-[42px] cursor-pointer text-gray-600"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>

        {/* Address Section */}
        <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-800">
          Address Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Address Line 1"
            name="address_line1"
            value={userData.address_line1}
            onChange={handleChange}
            error={errors.address_line1}
          />
          <InputField
            label="Address Line 2"
            name="address_line2"
            value={userData.address_line2}
            onChange={handleChange}
          />
          <InputField
            label="City"
            name="city"
            value={userData.city}
            onChange={handleChange}
            error={errors.city}
          />
          <InputField
            label="State / Province"
            name="state_province"
            value={userData.state_province}
            onChange={handleChange}
            error={errors.state_province}
          />
          <InputField
            label="Postal Code"
            name="postal_code"
            value={userData.postal_code}
            onChange={handleChange}
            error={errors.postal_code}
          />
          <InputField
            label="Country"
            name="country"
            value={userData.country}
            onChange={handleChange}
            error={errors.country}
          />
        </div>

        <button
          onClick={handleRegister}
          className="w-full bg-[#113D47] text-white py-3 rounded-md text-lg font-medium mt-8 hover:bg-white hover:text-[#113D47] border-2 border-[#113D47] transition-all duration-300"
        >
          Register
        </button>

        <p className="text-center text-sm text-gray-500 mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-gray-900 font-medium underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
