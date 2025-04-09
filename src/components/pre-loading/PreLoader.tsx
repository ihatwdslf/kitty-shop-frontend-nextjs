import PreLoaderBackground from "@/components/pre-loading/PreLoaderBackground";

const PreLoader = () => {

    return (

        <div className="preloader">
            <PreLoaderBackground
                colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
                blend={0.5}
                amplitude={1.0}
                speed={0.5}
            />
            <div className="preloader__text-container">
                Завантажуємо контент...
            </div>
        </div>
    );
}

export default PreLoader;