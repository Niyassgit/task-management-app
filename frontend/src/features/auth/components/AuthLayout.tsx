import React from "react";

interface AuthLayoutProps {
    title: string;
    subtitle: string;
    children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, subtitle, children }) => {
    return (
        <div className="flex min-h-screen w-full bg-blue-50">
            <div className="w-full hidden md:inline-block">
                <img
                    className="h-full w-full object-cover"
                    src="https://blog.udemy.com/wp-content/uploads/2014/03/bigstock-Word-Cloud-Time-Management-49941908.jpg"
                    alt="leftSideImage"
                />
            </div>

            <div className="w-full flex flex-col items-center justify-center p-4">
                <div className="md:w-96 w-full max-w-sm flex flex-col items-center justify-center">
                    <h2 className="text-4xl text-gray-900 font-medium text-center">{title}</h2>
                    <p className="text-sm text-gray-500/90 mt-3 text-center">
                        {subtitle}
                    </p>

                    <button
                        type="button"
                        className="w-full mt-8 bg-gray-500/10 flex items-center justify-center h-12 rounded-full hover:bg-gray-500/20 transition-colors"
                    >
                        <img
                            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
                            alt="googleLogo"
                        />
                    </button>

                    <div className="flex items-center gap-4 w-full my-5">
                        <div className="w-full h-px bg-gray-300/90"></div>
                        <p className="text-nowrap text-sm text-gray-500/90">
                            or continue with email
                        </p>
                        <div className="w-full h-px bg-gray-300/90"></div>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
