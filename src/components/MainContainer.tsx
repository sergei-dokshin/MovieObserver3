type MainContainerProps = {
  children: React.ReactNode;
};

const MainContainer = ({ children }: MainContainerProps) => {
  // указываем максимальную ширину, минимальную высоту, авто-выравнивание по центру и осветляем фон
  return (
    <div className="max-w-6xl mx-auto min-h-screen bg-white/[2%] flex flex-col">
      {children}
    </div>
  );
};

export default MainContainer;
