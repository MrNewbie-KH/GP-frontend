function Button({ children, variant, image }) {
  let className = "login-btn"; // Default button class
  if (variant === "facebook") {
    className += ` facebook`; // Append facebook variant class
  } else if (variant === "google") {
    className += ` google`; // Append google variant class
  }
  return <button className={className}>{children}</button>;
}
export default Button;
