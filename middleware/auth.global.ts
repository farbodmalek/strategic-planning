import {defineNuxtRouteMiddleware} from "#app";

export default defineNuxtRouteMiddleware(async (to) => {

    const token = localStorage.getItem('user')
    // if (!token && to.path != "/authentication/login") {
    //     return navigateTo("/authentication/login")
    // }
})
