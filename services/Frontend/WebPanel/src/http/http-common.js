import axios from 'axios';
import history from "../history";

const TIMEOUT = 8000; // 8 seconds

/*
 Basic structure for axios queries.
 Contains the request headers, URL, and
 error handling function.
 */
class HTTP {
    axios = axios.create({
        timeout: TIMEOUT,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
        }
    });

    resetToken = (token="") => {
        this.axios = axios.create({
            timeout: TIMEOUT,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });
    }

    handleError = (error) => {
        if (error.toString() === `Error: timeout of ${TIMEOUT}ms exceeded`) {
            console.log("client timeout");
            history.push(`/error/408`);
        } else if (error.response) {
            let status = error.response.status;
            if (status === 401 || status === 422) {
                history.push('/login');
            } else if (status >= 500) {
                history.push(`/error/${status}`);
            }
        }

        return error;
    };
}

export const http = new HTTP();
