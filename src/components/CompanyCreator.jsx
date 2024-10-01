import React, { useState, useEffect } from "react";
import { Button, Modal, message, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Header } from "../components";

import { useStateContext } from "../contexts/ContextProvider";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const CompanyCreator = () => {
  const {
    setCreateCompany,
    companyForm,
    setCompanyForm,
    handleSaveCompany,
    companyDetails,
    companySaved,
    setCompanySaved,
    isCompanyEditable,
    setIsCompanyEditable,
  } = useStateContext();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    // Check if company details are stored in localStorage
    const savedCompanyDetails = localStorage.getItem("company");
    if (savedCompanyDetails) {
      setCompanyForm(JSON.parse(savedCompanyDetails)); // Set the form with saved details
      setCompanySaved(true);
      setIsCompanyEditable(false);
    } else if (companyDetails) {
      setCompanyForm(companyDetails);
    }
  }, [companyDetails, setCompanyForm]);

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }

    // Simulate upload completion
    getBase64(info.file.originFileObj, (url) => {
      setLoading(false);
      setImageUrl(url);

      // Update formState with the userAvatar
      setCompanyForm((prevState) => ({
        ...prevState,
        logo: url,
      }));
    });

    // Manually set the status to done
    info.file.status = "done";
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyForm({ ...companyForm, [name]: value });
  };

  return (
    <div>
      <div>
        <Header
          category="Company Settings"
          title="Company Profile"
          btnTitle={!isCompanyEditable ? "Update" : "Save Changes"}
          customFunc={handleSaveCompany}
        />
        <form className="mt-4">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="username"
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Company Name
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        id="company-name"
                        name="businessName"
                        type="text"
                        value={companyForm.businessName || ""}
                        onChange={handleInputChange}
                        placeholder="XYZ Co. Ltd"
                        autoComplete="company-name"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        disabled={!isCompanyEditable}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="photo"
                    className="block text-lg font-medium leading-6 text-gray-900 mb-2"
                  >
                    Logo
                  </label>
                  <Upload
                    name="userAvatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    //action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                    disabled={!isCompanyEditable}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="avatar"
                        style={{
                          width: "100%",
                        }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-lg font-semibold leading-7 text-gray-900">
                Business Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Use a permanent address where you can receive mail.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="business-address"
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Business Address
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="address"
                      name="businessAddress"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      //defaultValue={""}
                      value={companyForm.businessAddress || ""}
                      onChange={handleInputChange}
                      disabled={!isCompanyEditable}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <div>
                    <label
                      htmlFor="regNo"
                      className="block text-lg font-medium leading-6 text-gray-900"
                    >
                      Business Registration No.
                    </label>
                    <div className="mt-2">
                      <input
                        id="regNo"
                        name="busRegNumber"
                        value={companyForm.busRegNumber || ""}
                        onChange={handleInputChange}
                        type="text"
                        autoComplete="regNo"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        disabled={!isCompanyEditable}
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="email"
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Email Address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="emailAddress"
                      value={companyForm.emailAddress || ""}
                      onChange={handleInputChange}
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      disabled={!isCompanyEditable}
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div>
                    <label
                      htmlFor="phone-number"
                      className="block text-lg font-medium leading-6 text-gray-900"
                    >
                      Phone Number
                    </label>
                    <div className="mt-2">
                      <input
                        id="phone-number"
                        name="phoneNumber"
                        value={companyForm.phoneNumber || ""}
                        onChange={handleInputChange}
                        type="number"
                        autoComplete="phone-number"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        disabled={!isCompanyEditable}
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-2 ">
                  <label
                    htmlFor="tinNo"
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    TIN Number
                  </label>
                  <div className="mt-2">
                    <input
                      id="department"
                      name="tinNumber"
                      value={companyForm.tinNumber || ""}
                      onChange={handleInputChange}
                      type="text"
                      autoComplete="tinNo"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      disabled={!isCompanyEditable}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export { CompanyCreator };
