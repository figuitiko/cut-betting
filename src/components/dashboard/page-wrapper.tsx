import { Suspense } from "react";
type PageWrapperProps = {
  heading: string;
  children: React.ReactNode;
  childrenInferior?: React.ReactNode;
};

const PageWrapper = ({
  heading,
  children,
  childrenInferior,
}: PageWrapperProps) => {
  return (
    <div className="flex flex-col  max-h-screen">
      <div className="flex flex-col  max-h-screen">
        <div className="flex flex-col lg:flex-row w-full justify-between px-0 md:px-24">
          <h1 className="text-4xl font-bold mb-4">{heading}</h1>
          {children}
        </div>
      </div>
      {childrenInferior && (
        <Suspense fallback={<div className="skeleton w-full h-screen" />}>
          {childrenInferior}
        </Suspense>
      )}
    </div>
  );
};

export default PageWrapper;
