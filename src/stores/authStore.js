import { ref, reactive } from 'vue';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
    const token = ref(null)
    const user = ref(null)
    const isAuthenticated = ref(false)
    const isRegistered = ref(false);
    const loading = ref(false)
    const error = reactive({
        status: false,
        message: '',
        data: []
    });

    function getTokenAndUser() {
        if (localStorage.getItem('token')) {
            token.value = localStorage.getItem('token');
            isAuthenticated.value = true;
        } else {
            token.value = null;
        }
        if (localStorage.getItem('user')) {
            user.value = JSON.parse(localStorage.getItem('user'));
        } else {
            user.value = null;
        }
    }

    async function login(email, password) {
        //console.log(email, password)
        error.status = false;
        loading.value = true;

        try {
            const response = await fetch(`http://localhost:4000/api/user/login`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const resDB = await response.json();

            if (response.status > 300) {
                if (resDB.data.error) {
                    error.status = true;
                    error.message = "Error en login";
                }
                throw new Error(error.message);
            }

            user.value = resDB.user;
            token.value = resDB.data.token;
            isAuthenticated.value = true;
            localStorage.setItem('token', token.value);
            localStorage.setItem('user', JSON.stringify(resDB.user));
        } catch (err) {
            error.status = true;
            error.message = err.message;
        } finally {
            loading.value = false;
        }
    }

    async function register(name, email, password, password_confirmation) {
        error.status = false;
        loading.value = true;

        try {
            const response = await fetch('http://localhost:4000/api/user/register', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                }),
            });

            const data = await response.json();

            console.log("response")
            console.log(data)

            if (response.status > 300) {
                if (data.error) {
                    error.data = data.error;
                }
                throw new Error(data.message);
            }

            user.value = data.user;
            isRegistered.value = true;
        } catch (err) {
            error.status = true;
            error.message = err.message;
        } finally {
            loading.value = false;
        }
    }

    function logout() {
        isAuthenticated.value = false;
        isRegistered.value = false;
        user.value = null;
        token.value = '';

        localStorage.clear();
    }

    async function updateProfile({
        name,
        old_password,
        new_password,
        new_password_confirmation,
    }) {
        error.status = false;
        loading.value = true;

        try {
            const response = await fetch(`localhost/user/profile`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-type': 'application/json',
                    token: token.value,
                },
                body: JSON.stringify({
                    name,
                    old_password,
                    new_password,
                    new_password_confirmation,
                }),
            });

            const data = await response.json();

            if (response.status > 300) {
                if (data.errors) {
                    error.data = data.errors;
                }

                throw new Error(data.message);
            }

            user.value = data.user;
            localStorage.setItem('user', JSON.stringify(data.user));
        } catch (err) {
            error.status = true;
            error.message = err.message;
        } finally {
            loading.value = false;
        }
    }

    return {
        token,
        user,  
        isAuthenticated,
        isRegistered,
        loading,
        error,
        login,
        register,
        logout,
        getTokenAndUser
    };
})





