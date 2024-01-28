import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Protected(props) {
    let Component = props.Component;

    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user-info"));
        if (!user) {
          navigate("/Home");
          alert("You are not Authorized to access this page"); 
          setIsLoading(false);
        }
        setIsLoading(false);
    }, [])

    if (isLoading) {
        // You can show a loading spinner or any other placeholder
        return (
          <div>
            <div>Loading...........</div>
          </div>
        );
      }

    return (
      <Component />
  );
}

export default Protected;
