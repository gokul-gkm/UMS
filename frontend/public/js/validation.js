export const validateForm = (name, email, password, confirmPassword) => {
    let errors = {};
  
    if (name.trim().length < 4) {
      errors.name = "Name must be at least 4 characters long";
    }
  
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address";
    }
  
    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
  
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
  
    return errors;
  };