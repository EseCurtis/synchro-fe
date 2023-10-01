import { SolidSpinner } from "../_components/spinner/Spinner";

export const LoadingScreen = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-16 h-16 relative">
        <div className="w-14 h-14 bg-[#0512d2] bg-opacity-20 rounded-full justify-center items-center flex">
          <SolidSpinner />
        </div>
      </div>
    </div>
  );
};
