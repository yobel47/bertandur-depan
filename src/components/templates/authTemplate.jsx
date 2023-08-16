import { ImageAuth } from "../organisms";

const AuthTemplate = ({ children, image }) => {
  return (
    <div className="w-full flex-grow flex flex-col md:flex-row">
      <ImageAuth image={image} />
      {children}
    </div>
  );
};

export default AuthTemplate;
