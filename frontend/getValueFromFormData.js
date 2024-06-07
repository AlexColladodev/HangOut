const getValueFromFormData = (formData, key) => {
    
    const entry = formData._parts.find(([partKey]) => partKey === key);
    
    return entry ? entry[1] : null;
  };
  
  export default getValueFromFormData;
  