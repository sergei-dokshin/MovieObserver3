type MainContainerProps = {
  children: React.ReactNode;
};

const MainContainer = ({ children }: MainContainerProps) => {
  return (
    <div className="max-w-6xl mx-auto min-h-screen bg-white/[2%] flex flex-col">
      {children}
    </div>
  );
};

export default MainContainer;
