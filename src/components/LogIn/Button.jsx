import style from "./Button.module.css";
function Button({ children, variant, image }) {
  let className = style.btn; // Default button class
  if (variant === "facebook") {
    className += ` ${style.facebook}`; // Append facebook variant class
  } else if (variant === "google") {
    className += ` ${style.google}`; // Append google variant class
  }
  return <button className={className}>{children}</button>;
}
export default Button;
