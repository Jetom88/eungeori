import { useEffect } from "react";

const useConfirmPageLeave = (prevent?: boolean) => {
  useEffect(() => {
    if (!prevent) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [prevent]);
};

export default useConfirmPageLeave;
