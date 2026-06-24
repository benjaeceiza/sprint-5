import  { useState } from 'react';

const ImageWithLoader = ({ src, alt, className }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className={`image-wrapper ${className}`}>
            {/* Mientras no cargue, mostramos el div animado */}
            {!isLoaded && <div className="skeleton-loader"></div>}

            <img
                src={src}
                alt={alt}
                className={`real-image ${isLoaded ? 'visible' : 'hidden'}`}
                onLoad={() => setIsLoaded(true)}
            />
        </div>
    );
};

export default ImageWithLoader;