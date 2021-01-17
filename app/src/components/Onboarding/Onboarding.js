import React, { useState } from "react";
import Onboarding1 from "./Onboarding1";
import Onboarding2 from "./Onboarding2";
import Onboarding3 from "./Onboarding3";
import Onboarding4 from "./Onboarding4";

function Onboarding() {
  const [pageNo, setPageNo] = useState(0);

  function nextPage() {
    if (pageNo < 3) {
      setPageNo(pageNo + 1);
    }
  }

  return (
    <div>
      {
        {
          0: <Onboarding1 pageNo={pageNo} nextPage={nextPage} />,
          1: <Onboarding2 pageNo={pageNo} nextPage={nextPage} />,
          2: <Onboarding3 pageNo={pageNo} nextPage={nextPage} />,
          3: <Onboarding4 pageNo={pageNo} nextPage={nextPage} />,
        }[pageNo]
      }
    </div>
  );
}

export default Onboarding;
