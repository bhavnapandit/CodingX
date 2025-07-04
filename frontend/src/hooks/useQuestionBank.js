import { useEffect, useState } from "react";
import axios from 'axios'
import { getBackendUrl } from "../utils/helpers";

export const useQuestionBank = () => {
    const [questionBank, setQuestionBank] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchData = async () => {
        try {
            const url = getBackendUrl();
            const res = await axios.get(`${url}`);
            setQuestionBank(res.data.languages);
            setIsLoaded(true);
            return questionBank;
        } catch (err) {
          throw new Error(err);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return isLoaded ? questionBank : {};
};


