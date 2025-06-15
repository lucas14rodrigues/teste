import React from "react";

interface MainBannerProps {
    title: string;
    description?: string;
    image: string;
}

const MainBanner: React.FC<MainBannerProps> = ({ title, description, image }) => {
    return (
        <div
            className="w-full h-full bg-cover bg-center text-white p-4 bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
        >
            <div className="container space-y-4">
                <h1 className="text-stone-50 font-bold text-2xl md:text-4xl sm:text-3xl" dangerouslySetInnerHTML={{ __html: title }} />
                {description && description && (
                    <p className="text-stone-50 text-base font-normal" dangerouslySetInnerHTML={{ __html: description }} />
                )}
            </div>
        </div>
    );
};

export { MainBanner };
