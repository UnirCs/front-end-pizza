import { useEffect } from 'react';
import { useNavigate} from 'react-router-dom';

/**
 * useRedirection
 * Hook personalizado para redireccionar a una ruta específica
 * @param path Ruta a la que se redireccionará
 * @param delay Tiempo de espera antes de redireccionar
 */
const useRedirection = (path, delay) => {

    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate(path);
        }, delay);
    });
};

export default useRedirection;