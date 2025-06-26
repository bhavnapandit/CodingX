import { useEffect, useState } from "react";
import axios from 'axios'
import { getBackendUrl } from "../utils/helpers";

export const useQuestionBank = () => {
    const [questionBank, setQuestionBank] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchData = async () => {
        try {
            
            const res = await axios.get('http://localhost:8000/');
            setQuestionBank(res.data.languages);
            setIsLoaded(true);
            return questionBank;
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return isLoaded ? questionBank : {};
};


