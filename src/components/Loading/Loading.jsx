import Logo from "src/assets/images/logo.svg";

const Loading = () => {
  return (
    <div className="flex w-sceen h-screen items-center justify-center p-4">
      <div className="">
        <img className="w-[200px] max-w-full" src={Logo} alt="" />
      </div>
    </div>
  );
};

export default Loading;
