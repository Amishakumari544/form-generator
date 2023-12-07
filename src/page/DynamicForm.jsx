import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import TextInput from "../components/TextInput";
import { GrFormTrash } from "react-icons/gr";
import Dropdown from "../components/Dropdown";
import Checkbox from "../components/Checkbox";
import Radio from "../components/RadioBtn";
import TextArea from "../components/TextArea";
import ImageUpload from "../components/UploadField";

const DynamicFormGenerator = () => {
  const [submittedData, setSubmittedData] = useState(null);
  const [formFields, setFormFields] = useState([]);

  const submitForm = async (data) => {
    try {
      if (Object.keys(data).length === 0) {
        // console.log("No data to submit.");
        return;
      }
      // console.log("Form data:", data);
      setSubmittedData(data);
    } catch (error) {}
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({});

  useEffect(() => {
    const savedFormConfig = localStorage.getItem("formConfig");
    if (savedFormConfig) {
      setFormFields(JSON.parse(savedFormConfig));
    }
  }, []);

  // Update local storage whenever formFields changes
  useEffect(() => {
    localStorage.setItem("formConfig", JSON.stringify(formFields));
  }, [formFields]);

  const updateDropdownOptions = (index, options) => {
    const updatedFields = [...formFields];
    updatedFields[index].options = options
      .split(",")
      .map((option) => option.trim());
    setFormFields(updatedFields);
  };
  const updateFormFieldLabel = (index, label) => {
    const updatedFields = [...formFields];
    updatedFields[index].label = label;
    setFormFields(updatedFields);
  };
  const addFormField = (fieldType) => {
    if (fieldType === "dropdown") {
      setFormFields([...formFields, { fieldType, label: "", options: [] }]);
    } else {
      setFormFields([...formFields, { fieldType, label: "" }]);
    }
  };
  const removeFormField = (index) => {
    const updatedFields = formFields.filter((_, i) => i !== index);
    setFormFields(updatedFields);
  };
  const updateRadioOptions = (index, options) => {
    const updatedFields = [...formFields];
    updatedFields[index].options = options
      .split(",")
      .map((option) => ({ value: option.trim(), label: option.trim() }));
    setFormFields(updatedFields);
  };

  const saveFormConfig = () => {
    if (formFields.length === 0) {
      alert("No form fields to save.");
      return;
    }

    try {
      const json = JSON.stringify(formFields);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "formConfig.json";
      a.click();
      URL.revokeObjectURL(url);
      alert("Form configuration saved successfully!");
    } catch (error) {
      alert("Error saving form configuration.");
    }
  };
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        setFormFields(data);
        alert("Form configuration loaded successfully!");
      } catch (error) {
        alert(
          "Error loading form configuration. Please upload a valid JSON file."
        );
      }
    };

    if (file) {
      reader.readAsText(file);
    }
  };

  const updateImageField = (index, imageData) => {
    const updatedFields = [...formFields];
    updatedFields[index].imageData = imageData;
    setFormFields(updatedFields);
  };
  const renderFormField = (fieldType, index, error) => {
    const fieldData = formFields[index];
    switch (fieldType) {
      case "text":
        return (
          <Controller
            key={index}
            name={`field_${index}`}
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <TextInput
                label={fieldData.label}
                value={fieldData.value}
                register={field}
                error={errors?.[`field_${index}`]?.message}
              />
            )}
          />
        );
      case "image":
        return (
          <ImageUpload
            key={index}
            label={fieldData.label}
            onImageChange={(imageData) => updateImageField(index, imageData)}
          />
        );
      case "dropdown":
        return (
          <div key={index} className="drop-input">
            Add options in comma separated
            <input
            class="input"
              placeholder="Add options (comma-separated)"
              value={fieldData.options.join(", ")}
              onChange={(e) => updateDropdownOptions(index, e.target.value)}
            />
            <Controller
              name={`field_${index}`}
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Dropdown
                  label={fieldData.label}
                  value={fieldData.value}
                  options={fieldData.options.map((option) => ({
                    value: option,
                    label: option,
                  }))}
                  register={field}
                />
              )}
            />
          </div>
        );
      case "checkbox":
        return (
          <Controller
            key={index}
            name={`field_${index}`}
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <Checkbox
                label={fieldData.label}
                register={field}
                value={fieldData.value}
                error={errors[`field_${index}`]}
                onChange={(val) => field.onChange(val)}
              />
            )}
          />
        );
      case "textarea":
        return (
          <Controller
            key={index}
            name={`field_${index}`}
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <TextArea
                label={fieldData.label}
                value={fieldData.value}
                register={field}
              />
            )}
          />
        );
      case "radio":
        return (
          <div key={index} className="drop-input">
            Add options in comma separated
            <input
            class="input"
              placeholder="Add options"
              value={
                fieldData.options
                  ? fieldData.options.map((option) => option.label).join(", ")
                  : ""
              }
              onChange={(e) => updateRadioOptions(index, e.target.value)}
            />
            <Controller
              name={`field_${index}`}
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Radio
                  label={fieldData.label}
                  value={fieldData.value}
                  options={fieldData.options || []}
                  register={field}
                />
              )}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <div class="box content">
      <h1>Dynamic Form Generator</h1>
      <form onSubmit={handleSubmit(submitForm)}>
        <br />
        <div className="form-container">
          {formFields.map((fieldData, index) => (
            <div className="field-style" key={index}>
              <label>add label name</label>
              <input
              class="input"
                placeholder="Add a label for the field"
                value={fieldData.label}
                required
                className="label-input"
                onChange={(e) => updateFormFieldLabel(index, e.target.value)}
              />
              {renderFormField(
                fieldData.fieldType,
                index,
                errors[`field_${index}`]
              )}
              <GrFormTrash
                size={30}
                className="btn"
                color="white"
                onClick={() => removeFormField(index)}
              ></GrFormTrash>
            </div>
          ))}
          <div className="custom-btn">
            <button
              className="btn"
              type="button"
              onClick={() => addFormField("text")}
            >
              Add Text Input
            </button>
            <button
              className="btn"
              type="button"
              onClick={() => addFormField("textarea")}
            >
              Add Text Area
            </button>
            <button
              className="btn"
              type="button"
              onClick={() => addFormField("dropdown")}
            >
              Add Dropdown
            </button>
            <button
              className="btn"
              type="button"
              onClick={() => addFormField("checkbox")}
            >
              Add Checkbox
            </button>
            <button
              className="btn"
              type="button"
              onClick={() => addFormField("radio")}
            >
              Add Radio Button
            </button>
            <button
              className="btn"
              type="button"
              onClick={() => addFormField("image")}
            >
              Add image
            </button>
            <input
            class="input"
              type="file"
              onChange={handleFileUpload}
              accept=".json"
              className="custom-file-input"
            />
             
          </div>
          <button className="save-btn" type="button" onClick={saveFormConfig}>
              Save Form Configuration
            </button>
        </div>
      </form>
      {submittedData && (
        <div className="submitted-data-container">
          <h2>Submitted Form Data</h2>
          {Object.keys(submittedData).map((key) => (
            <div key={key}>
              <strong>{key}:</strong> {submittedData[key].toString()}
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default DynamicFormGenerator;
