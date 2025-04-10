import { useState } from 'react';

const useFormValidation = () => {
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'username':
        if (!value) {
          error = 'Username is required';
        } else if (value.length < 3) {
          error = 'Username must be at least 3 characters';
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          error = 'Username can only contain letters, numbers and underscores';
        }
        break;

      case 'email':
        if (!value) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;

      case 'password':
        if (!value) {
          error = 'Password is required';
        } else if (value.length < 6) {
          error = 'Password must be at least 6 characters';
        } else if (!/(?=.*[a-z])/.test(value)) {
          error = 'Password must contain at least one lowercase letter';
        } else if (!/(?=.*[A-Z])/.test(value)) {
          error = 'Password must contain at least one uppercase letter';
        } else if (!/(?=.*[0-9])/.test(value)) {
          error = 'Password must contain at least one number';
        }
        break;

      case 'fullName':
        if (!value) {
          error = 'Full name is required';
        } else if (value.length < 3) {
          error = 'Full name must be at least 3 characters';
        } else if (!/^[a-zA-Z\s]*$/.test(value)) {
          error = 'Full name can only contain letters and spaces';
        }
        break;

      case 'dateOfBirth':
        if (!value) {
          error = 'Date of birth is required';
        } else {
          const date = new Date(value);
          const today = new Date();
          const minDate = new Date();
          minDate.setFullYear(today.getFullYear() - 100);
          if (date > today) {
            error = 'Date of birth cannot be in the future';
          } else if (date < minDate) {
            error = 'Please enter a valid date of birth';
          }
        }
        break;

      case 'gender':
        if (!value) {
          error = 'Please select a gender';
        }
        break;

      case 'institution':
        if (!value) {
          error = 'Institution is required';
        } else if (value.length < 2) {
          error = 'Institution name must be at least 2 characters';
        }
        break;

      case 'fieldOfInterest':
        if (!value) {
          error = 'Field of interest is required';
        } else if (value.length < 2) {
          error = 'Field of interest must be at least 2 characters';
        }
        break;

      default:
        break;
    }

    return error;
  };

  const validateForm = (formData) => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearErrors = () => {
    setErrors({});
  };

  return {
    errors,
    validateForm,
    validateField,
    clearErrors
  };
};

export default useFormValidation;