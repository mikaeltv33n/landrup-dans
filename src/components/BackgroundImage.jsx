

export default function BackgroundImage() {

    const BackgroundImage = "/splash-image.jpg"

    return (
            <div
                style={{
                    backgroundImage: `url(${BackgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    height: "100vh",
                    width: "100%",
                }}
                className="flex justify-start items-center">
            </div>
        
    )
}