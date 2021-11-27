import axios from '@/config/axios';

class AuthService {
    async login({ email, password }) {
        const response = await axios.post(`/api/login`, {
            email,
            password,
        });

        return response.data;
    }

    async register({ email, password }) {
        await axios.post(`/api/register`, {
            email,
            password,
        });

        return await this.login({ email, password });
    }

    async updatePassword({ oldPassword, password }) {
        return await axios.put(`/api/password_reset`, {
            oldPassword,
            password,
        });
    }

    async updateEmail({ email, userId }) {
        return await axios.put(`/api/users/${userId}`, {
            email,
        });
    }

    async deleteAccount({ email, password, userId }) {
        await this.login({ email, password });

        return await axios.delete(`/api/users/${userId}`, {
            email,
            password,
        });
    }

    async getProfile(userId) {
        const response = await axios.get(`/api/users/${userId}`);
        return response.data;
    }
}

export default new AuthService();
