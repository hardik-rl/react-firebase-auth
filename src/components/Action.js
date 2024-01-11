import { useSearchParams } from "react-router-dom";
import VerificationModal from "./VerificationModal";
import ResetPassword from "./ResetPassword";

const Action = () => {
  let [searchParams] = useSearchParams();

  const action = searchParams.get("mode");

  // eslint-disable-next-line default-case
  switch (action) {
    case "verifyEmail":
      return <VerificationModal />;
      case "resetPassword":
      return <ResetPassword />;
  }

  return <div>Something went wrong</div>;
};

export default Action;
